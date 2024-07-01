import { useDataStore } from '@/stores/data'
import ingredientsQuantity from '@/common/helpers/ingredientsQuantity'

export default (pizza) => {
  const dataStore = useDataStore()
  const ingredients = ingredientsQuantity(pizza)

  const sizeMultiplier =
    dataStore.sizes.find((item) => item.id === pizza.sizeId)?.multiplier ?? 1

  const doughPrice =
    dataStore.doughs.find((item) => item.id === pizza.doughId)?.price ?? 0

  const saucePrice =
    dataStore.sauces.find((item) => item.id === pizza.sauceId)?.price ?? 0

  /*
   * Здесь мы при помощи метода map превращаем массив ингредиентов
   * в массив значений, соответствующих итоговой стоимости каждого ингредиента — просто умножаем известную цену на количество.
   * После чего методом reduce вычисляем сумму всех элементов массива, что даст нам общую стоимость всех ингредиентов.
   */
  const ingredientsPrice = dataStore.ingredients
    .map((item) => ingredients[item.id] * item.price)
    .reduce((acc, item) => acc + item, 0)

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier
}
