import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  doughMapping,
  sizesMapping,
  ingredientsMapping,
  saucesMapping,
} from '@/common/helpers/pizzaMapping'
import doughData from '@/mocks/dough.json'
import sizesData from '@/mocks/sizes.json'
import ingredientsData from '@/mocks/ingredients.json'
import saucesData from '@/mocks/sauces.json'
import miscData from '@/mocks/misc.json'

export const useDataStore = defineStore('data', () => {
  const doughs = ref(doughData.map(doughMapping))
  const sizes = ref(sizesData.map(sizesMapping))
  const sauces = ref(saucesData.map(saucesMapping))
  const ingredients = ref(ingredientsData.map(ingredientsMapping))
  const misc = ref(miscData)

  return { doughs, sizes, sauces, ingredients, misc }
})
