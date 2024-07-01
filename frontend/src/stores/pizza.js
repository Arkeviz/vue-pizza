import { defineStore } from 'pinia'
import { useDataStore } from '@/stores/data'
import pizzaPrice from '@/common/helpers/pizzaPrice'
import ingredientsQuantity from '@/common/helpers/ingredientsQuantity'
import { computed, ref } from 'vue'

export const usePizzaStore = defineStore('pizza', () => {
  const dataStore = useDataStore()

  // TODO или лучше одним реактивным массивом, хммм
  const index = ref(null)
  const name = ref('')
  const sauceId = ref(0)
  const doughId = ref(0)
  const sizeId = ref(0)
  const ingredients = ref([])

  const sauce = computed(
    () =>
      dataStore.sauces.find((i) => i.id === sauceId.value) ??
      dataStore.sauces[0],
  )

  const dough = computed(
    () =>
      dataStore.doughs.find((i) => i.id === doughId.value) ??
      dataStore.doughs[0],
  )

  const size = computed(
    () =>
      dataStore.sizes.find((i) => i.id === sizeId.value) ?? dataStore.sizes[0],
  )

  const ingredientsExtended = computed(() => {
    const pizzaIngredientsIds = ingredients.value.map((i) => i.ingredientId)
    return dataStore.ingredients
      .filter((i) => pizzaIngredientsIds.includes(i.id))
      .map((i) => {
        return {
          ...i,
          quantity:
            ingredients.value.find((item) => item.ingredientId === i.id)
              ?.quantity ?? 0,
        }
      })
  })

  const price = computed(() => {
    return pizzaPrice({
      index: index.value,
      name: name.value,
      sauceId: sauceId.value,
      doughId: doughId.value,
      sizeId: sizeId.value,
      ingredients: ingredients.value,
    })
  })

  const ingredientQuantities = computed(() => {
    return ingredientsQuantity({
      index: index.value,
      name: name.value,
      sauceId: sauceId.value,
      doughId: doughId.value,
      sizeId: sizeId.value,
      ingredients: ingredients.value,
    })
  })

  const setIndex = (newIndex) => {
    index.value = newIndex
  }
  const setName = (newName) => {
    name.value = newName
  }
  const setSauce = (newSauceId) => {
    sauceId.value = newSauceId
  }
  const setDough = (newDoughId) => {
    doughId.value = newDoughId
  }
  const setSize = (newSizeId) => {
    sizeId.value = newSizeId
  }
  const setIngredients = (newIngredients) => {
    ingredients.value = newIngredients
  }
  const addIngredient = (ingredientId) => {
    ingredients.value.push({
      ingredientId,
      quantity: 1,
    })
  }

  const incrementIngredientQuantity = (ingredientId) => {
    const ingredientIdx = ingredients.value.findIndex(
      (item) => item.ingredientId === ingredientId,
    )

    if (ingredientIdx === -1) {
      addIngredient(ingredientId)
      return
    }

    ingredients.value[ingredientIdx].quantity++
  }

  const setIngredientQuantity = (ingredientId, count) => {
    const ingredientIdx = ingredients.value.findIndex(
      (item) => item.ingredientId === ingredientId,
    )

    if (ingredientIdx === -1 && count > 0) {
      addIngredient(ingredientId)
      return
    } else if (ingredientIdx === -1) {
      return
    }

    /* Удаляем ингредиент, если количество 0 */
    if (count === 0) {
      ingredients.value.splice(ingredientIdx, 1)
      return
    }

    ingredients.value[ingredientIdx].quantity = count
  }

  const loadPizza = (pizza) => {
    index.value = pizza.index
    name.value = pizza.name
    sauceId.value = pizza.sauceId
    doughId.value = pizza.doughId
    sizeId.value = pizza.sizeId
    ingredients.value = pizza.ingredients
  }

  const $reset = () => {
    index.value = null
    name.value = ''
    sauceId.value = 0
    doughId.value = 0
    sizeId.value = 0
    ingredients.value = []
  }

  return {
    index,
    name,
    sauceId,
    doughId,
    sizeId,
    ingredients,

    sauce,
    dough,
    size,
    ingredientsExtended,
    price,
    ingredientQuantities,

    setIndex,
    setName,
    setSauce,
    setDough,
    setSize,
    setIngredients,
    addIngredient,
    incrementIngredientQuantity,
    setIngredientQuantity,
    loadPizza,

    $reset,
  }
})
