import { useDataStore } from '@/stores/data'

export default (pizza) => {
  const data = useDataStore()
  return data.ingredients.reduce((acc, val) => {
    acc[val.id] =
      pizza.ingredients.find((item) => item.ingredientId === val.id)
        ?.quantity ?? 0
    return acc
  }, {})
}
