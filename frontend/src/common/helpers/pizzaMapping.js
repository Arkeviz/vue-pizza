import doughSizes from '@/common/data/doughSizes'
import ingredients from '@/common/data/ingredients'
import sauces from '@/common/data/sauces'
import sizes from '@/common/data/sizes'

export const doughMapping = (doughData) => {
  return {
    ...doughData,
    value: doughSizes[doughData.id],
  }
}

export const ingredientsMapping = (ingredientsData) => {
  return {
    ...ingredientsData,
    value: ingredients[ingredientsData.id],
  }
}

export const saucesMapping = (saucesData) => {
  return {
    ...saucesData,
    value: sauces[saucesData.id],
  }
}

export const sizesMapping = (sizesData) => {
  return {
    ...sizesData,
    value: sizes[sizesData.id],
  }
}
