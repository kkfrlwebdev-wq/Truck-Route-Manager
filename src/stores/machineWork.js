import getStoreTemplate from "./helpers/storeTemplate";
import { useGeneralStore } from './general'
import { defineStore } from "pinia";



export const useMachineWorkStore = defineStore('machineWork', () => {
  const { generalApiOperation } = useGeneralStore()

  return {
    ...getStoreTemplate('machineWork', generalApiOperation)
  }
})