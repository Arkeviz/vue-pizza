import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useDataStore } from '@/stores/data'
import pizzaPrice from '@/common/helpers/pizzaPrice'

export const useCartStore = defineStore('cart', () => {
  const dataStore = useDataStore()

  const phone = ref('')
  const pizzas = ref([])
  const misc = ref([])
  const address = ref({
    street: '',
    building: '',
    flat: '',
    comment: '',
  })

  const pizzasExtended = computed(
    () =>
      pizzas.value?.map?.((pizza) => {
        const pizzaIngredientsIds = pizza.ingredients.map((i) => i.ingredientId)

        return {
          name: pizza.name,
          quantity: pizza.quantity,
          dough: dataStore.doughs.find((i) => i.id === pizza.doughId),
          size: dataStore.sizes.find((i) => i.id === pizza.sizeId),
          sauce: dataStore.sauces.find((i) => i.id === pizza.sauceId),
          ingredients: dataStore.ingredients.filter((i) =>
            pizzaIngredientsIds.includes(i.id),
          ),
          price: pizzaPrice(pizza),
        }
      }) ?? [],
  )

  const miscExtended = computed(() =>
    dataStore.misc?.map?.((misc) => {
      return {
        ...misc,
        quantity: misc.value.find((i) => i.miscId === misc.id)?.quantity ?? 0,
      }
    }),
  )

  const total = computed(() => {
    const pizzaPrices = pizzasExtended.value
      .map((item) => item.quantity * item.price)
      .reduce((acc, val) => acc + val, 0)

    const miscPrices = miscExtended.value
      .map((item) => item.quantity * item.price)
      .reduce((acc, val) => acc + val, 0)

    return pizzaPrices + miscPrices
  })

  const savePizza = (newPizza) => {
    const { index, ...pizzaData } = newPizza

    if (index !== null) {
      pizzas.value[index] = {
        quantity: pizzas.value[index].quantity,
        ...pizzaData,
      }
    } else {
      pizzas.value.push({
        quantity: 1,
        ...pizzaData,
      })
    }
  }

  const setPizzaQuantity = (index, count) => {
    if (pizzas.value[index]) {
      pizzas.value[index].quantity = count
    }
  }
  const setMiscQuantity = (miscId, count) => {
    const miscIdx = misc.value.findIndex((item) => item.miscId === miscId)

    if (miscIdx === -1 && count > 0) {
      misc.value.push({
        miscId,
        quantity: 1,
      })
      return
    } else if (miscIdx === -1) {
      return
    }

    if (count === 0) {
      misc.value.splice(miscIdx, 1)
      return
    }

    misc.value[miscIdx].quantity = count
  }
  const setPhone = (newPhone) => {
    phone.value = newPhone
  }
  const setAddress = (newAddress) => {
    const { street, building, flat, comment } = newAddress
    address.value = { street, building, flat, comment }
  }
  const setStreet = (newStreet) => {
    address.value.street = newStreet
  }
  const setBuilding = (newBuilding) => {
    address.value.building = newBuilding
  }
  const setFlat = (newFlat) => {
    address.value.flat = newFlat
  }
  const setComment = (newComment) => {
    address.value.comment = newComment
  }

  const $reset = () => {
    phone.value = ''
    pizzas.value = []
    misc.value = []
    address.value = {
      street: '',
      building: '',
      flat: '',
      comment: '',
    }
  }

  return {
    phone,
    pizzas,
    misc,
    address,

    pizzasExtended,
    miscExtended,
    total,

    savePizza,
    setPizzaQuantity,
    setMiscQuantity,
    setPhone,
    setAddress,
    setStreet,
    setBuilding,
    setFlat,
    setComment,

    $reset,
  }
})
