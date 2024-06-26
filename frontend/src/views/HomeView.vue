<script setup>
  import doughData from '@/mocks/dough.json'
  import sizesData from '@/mocks/sizes.json'
  import ingredientsData from '@/mocks/ingredients.json'
  import saucesData from '@/mocks/sauces.json'
  import { computed, reactive } from 'vue'
  import {
    doughMapping,
    sizesMapping,
    ingredientsMapping,
    saucesMapping,
  } from '@/common/helpers/pizzaMapping'
  import DoughSelector from '@/modules/constructor/components/DoughSelector.vue'
  import DiameterSelector from '@/modules/constructor/components/DiameterSelector.vue'
  import SauceSelector from '@/modules/constructor/components/SauсeSelector.vue'
  import IngredientsSelector from '@/modules/constructor/components/IngredientsSelector.vue'
  import PizzaConstructor from '@/modules/constructor/components/PizzaConstructor.vue'

  const doughTypes = doughData.map(doughMapping)
  const sizes = sizesData.map(sizesMapping)
  const sauces = saucesData.map(saucesMapping)
  const ingredients = ingredientsData.map(ingredientsMapping)

  const defaultIngredients = ingredients.reduce((result, item) => {
    result[item.value] = 0
    return result
  }, {})

  const pizza = reactive({
    name: '',
    dough: doughTypes[0].value,
    size: sizes[0].value,
    sauce: sauces[0].value,
    ingredients: defaultIngredients,
  })

  const pizzaPrice = computed(() => {
    const {
      dough: selectedDough,
      size: selectedSize,
      sauce: selectedSauce,
      ingredients: selectedIngredients,
    } = pizza

    const doughPrice =
      doughTypes.find((item) => item.value === selectedDough)?.price ?? 0

    const saucePrice =
      sauces.find((item) => item.value === selectedSauce)?.price ?? 0

    const sizeMultiplier =
      sizes.find((item) => item.value === selectedSize)?.multiplier ?? 1

    const ingredientsPrice = ingredients
      .map((item) => selectedIngredients[item.value] * item.price)
      .reduce((acc, item) => acc + item, 0)

    return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier
  })

  const updateIngredientAmount = (ingredient, count) => {
    pizza.ingredients[ingredient] = count
  }

  const addIngredient = (ingredient) => {
    pizza.ingredients[ingredient]++
  }

  const isSubmitDisabled = computed(() => {
    return pizza.name.length === 0 || pizzaPrice.value === 0
  })
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughSelector v-model="pizza.dough" :items="doughTypes" />

        <DiameterSelector v-model="pizza.size" :items="sizes" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <SauceSelector v-model="pizza.sauce" :items="sauces" />

              <IngredientsSelector
                :values="pizza.ingredients"
                :items="ingredients"
                @update="updateIngredientAmount"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizza.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <PizzaConstructor
            :dough="pizza.dough"
            :sauce="pizza.sauce"
            :ingredients="pizza.ingredients"
            @drop="addIngredient"
          />

          <div class="content__result">
            <p>Итого: {{ pizzaPrice }}</p>
            <button type="button" class="button" :disabled="isSubmitDisabled">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<style lang="scss">
  @import '@/assets/scss/ds-system/ds.scss';
  @import '@/assets/scss/mixins/mixins.scss';

  .content__ingredients {
    width: 580px;
    margin-top: 15px;
    margin-right: auto;
    margin-bottom: 15px;
  }

  .content__pizza {
    width: 375px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .content__result {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 25px;

    p {
      @include b-s24-h28;

      margin: 0;
    }

    button {
      margin-left: 12px;
      padding: 16px 45px;
    }
  }
</style>
