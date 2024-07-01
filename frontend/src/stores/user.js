import { ref } from 'vue'
import { defineStore } from 'pinia'
import addressesData from '@/mocks/addresses.json'

export const useUserStore = defineStore('user', () => {
  const addresses = ref(addressesData)

  return { addresses }
})
