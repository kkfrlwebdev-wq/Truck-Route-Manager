import getStoreTemplate from './helpers/storeTemplate'
import { useGeneralStore } from './general'
import { defineStore } from 'pinia'
import { useAuthStore } from '../stores/auth'

export const useMachineWorkStore = defineStore('machineWork', () => {
  const { generalApiOperation } = useGeneralStore()
  const auth = useAuthStore()

  function getCollectionTitle() {
    const userId = auth.getUser?.uid

    if (!userId) return null

    return `machineWork_${userId}`
  }

  return {
    ...getStoreTemplate(
      getCollectionTitle,
      generalApiOperation
    )
  }
})
