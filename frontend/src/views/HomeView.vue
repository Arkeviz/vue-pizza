<script setup>
  import doughData from '@/mocks/dough.json'
  import sizesData from '@/mocks/sizes.json'
  import ingredientsData from '@/mocks/ingredients.json'
  import saucesData from '@/mocks/sauces.json'
  import { computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  import { usePizzaStore } from '@/stores/pizza'
  import { useCartStore } from '@/stores/cart'
  import {
    doughMapping,
    sizesMapping,
    ingredientsMapping,
    saucesMapping,
  } from '@/common/helpers/pizzaMapping'
  import DoughSelector from '@/modules/constructor/components/DoughSelector.vue'
  import DiameterSelector from '@/modules/constructor/components/DiameterSelector.vue'
  import SauceSelector from '@/modules/constructor/components/SauceSelector.vue'
  import IngredientsSelector from '@/modules/constructor/components/IngredientsSelector.vue'
  import PizzaConstructor from '@/modules/constructor/components/PizzaConstructor.vue'

  const dataStore = useDataStore()
  const pizzaStore = usePizzaStore()
  const cartStore = useCartStore()

  const router = useRouter()

  const name = computed({
    get() {
      return pizzaStore.name
    },
    set(value) {
      pizzaStore.setName(value)
    },
  })

  const doughId = computed({
    get() {
      return pizzaStore.doughId
    },
    set(value) {
      pizzaStore.setDough(value)
    },
  })

  const sizeId = computed({
    get() {
      return pizzaStore.sizeId
    },
    set(value) {
      pizzaStore.setSize(value)
    },
  })

  const sauceId = computed({
    get() {
      return pizzaStore.sauceId
    },
    set(value) {
      pizzaStore.setSauce(value)
    },
  })

  const addToCart = async () => {
    cartStore.savePizza(pizzaStore.$state)
    await router.push({ name: 'cart' })
    resetPizza()
  }

  const resetPizza = () => {
    pizzaStore.setName('')
    pizzaStore.setDough(dataStore.doughs[0].id)
    pizzaStore.setSize(dataStore.sizes[0].id)
    pizzaStore.setSauce(dataStore.sauces[0].id)
    pizzaStore.setIngredients([])
    pizzaStore.setIndex(null)
  }

  const isSubmitDisabled = computed(() => {
    return name.value.length === 0 || pizzaStore.price === 0
  })

  onMounted(() => {
    if (pizzaStore.index === null) {
      resetPizza()
    }
  })
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughSelector v-model="doughId" :items="dataStore.doughs" />

        <DiameterSelector v-model="sizeId" :items="dataStore.sizes" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <SauceSelector v-model="sauceId" :items="dataStore.sauces" />

              <IngredientsSelector
                :values="pizzaStore.ingredientQuantities"
                :items="dataStore.ingredients"
                @update="pizzaStore.setIngredientQuantity"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <PizzaConstructor
            :dough="pizzaStore.dough.value"
            :sauce="pizzaStore.sauce.value"
            :ingredients="pizzaStore.ingredientsExtended"
            @drop="pizzaStore.incrementIngredientQuantity"
          />

          <div class="content__result">
            <p>Итого: {{ pizzaStore.price }} ₽</p>
            <button
              type="button"
              class="button"
              :disabled="isSubmitDisabled"
              @click="addToCart"
            >
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
