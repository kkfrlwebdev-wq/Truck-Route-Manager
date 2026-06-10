import DbOperations from './DbOperations'

import { ref, computed } from 'vue'

export default function getStoreTemplate(IDCollection, generalApiOperation) {

  const itemsList = ref(null)
  const currentItem = ref(null)

  const portion = ref(2)
  const lastVisibleDoc = ref(null)

  const isLoadingPortion = ref(false)
  const hasMoreItems = ref(true)

  function getCollectionTitle() {
    const collectionTitle =
      typeof IDCollection === 'function' ? IDCollection() : IDCollection

    if (!collectionTitle) {
      throw new Error('Collection title is not available')
    }

    return collectionTitle
  }

  function getCollectionDB() {
    return new DbOperations(getCollectionTitle())
  }

  async function loadItemsList() {
    itemsList.value = await generalApiOperation({
      operation: () => getCollectionDB().loadItemsList()
    })
  }

  async function loadItemById(itemId) {
    currentItem.value = await generalApiOperation({
      operation: () => getCollectionDB().getItemById(itemId)
    })

    return currentItem.value
  }

  async function loadFilteredData(fieldTitle, compareOperator, valueToCompare) {
    itemsList.value = await generalApiOperation({
      operation: () =>
        getCollectionDB().loadFilteredData(fieldTitle, compareOperator, valueToCompare)
    })

    return itemsList.value
  }

  async function loadDocumentsFromIdsList(idsList) {
    itemsList.value = await generalApiOperation({
      operation: () => getCollectionDB().loadDocumentsFromIdsList(idsList)
    })

    return itemsList.value
  }

  async function addItem(itemData) {
    currentItem.value = await generalApiOperation({
      operation: () => getCollectionDB().addItem(itemData)
    })
  }

  async function addItemToArray(id, arrayProperty, itemData) {
    currentItem.value = await generalApiOperation({
      operation: () =>
        getCollectionDB().addItemToArray(id, arrayProperty, itemData)
    })
  }

  async function removeItemFromArray(id, arrayProperty, itemData) {
    currentItem.value = await generalApiOperation({
      operation: () =>
        getCollectionDB().removeItemFromArray(id, arrayProperty, itemData)
    })
  }

  async function addItemWithCustomId({ id, data }) {
    currentItem.value = await generalApiOperation({
      operation: () => getCollectionDB().addItemWithCustomId(id, data)
    })
  }

  async function updateItem(id, data) {
    currentItem.value = await generalApiOperation({
      operation: () => getCollectionDB().updateItem(id, data)
    })
  }

  async function deleteItem(itemId) {
    await generalApiOperation({
      operation: () => getCollectionDB().deleteItem(itemId)
    })

    itemsList.value = itemsList.value.filter((item) => item.id !== itemId)
  }

  async function loadItemsPortion() {
    if (isLoadingPortion.value || !hasMoreItems.value) return

    isLoadingPortion.value = true

    try {
      const result = await generalApiOperation({
        operation: () =>
          getCollectionDB().loadItemsPortion(
            portion.value,
            lastVisibleDoc.value
          )
      })

      if (!itemsList.value) {
        itemsList.value = []
      }

      if (!result || !result.items || result.items.length === 0) {
        hasMoreItems.value = false
        return result
      }

      itemsList.value = [
        ...itemsList.value,
        ...result.items
      ]

      lastVisibleDoc.value = result.lastVisibleDoc || null

      if (result.items.length < portion.value || !result.lastVisibleDoc) {
        hasMoreItems.value = false
      }

      return result
    } finally {
      isLoadingPortion.value = false
    }
  }

  function resetPagination() {
    itemsList.value = []
    lastVisibleDoc.value = null
    hasMoreItems.value = true
    isLoadingPortion.value = false
  }

  function resetStore() {
    itemsList.value = null
    currentItem.value = null
    portion.value = 2
    lastVisibleDoc.value = null
    hasMoreItems.value = true
    isLoadingPortion.value = false
  }

  const getItemsList = computed(() => itemsList.value ?? [])
  const getCurrentItem = computed(() => currentItem.value)
  const getPortion = computed(() => portion.value)
  const getHasMoreItems = computed(() => hasMoreItems.value)
  const getIsLoadingPortion = computed(() => isLoadingPortion.value)

  return {
    loadItemsList,
    addItem,
    addItemWithCustomId,
    addItemToArray,
    removeItemFromArray,
    updateItem,
    deleteItem,
    getItemsList,
    loadItemById,
    loadFilteredData,
    getCurrentItem,
    loadDocumentsFromIdsList,

    loadItemsPortion,
    resetPagination,
    resetStore,

    getPortion,
    getHasMoreItems,
    getIsLoadingPortion,

    portion,
    lastVisibleDoc,
    hasMoreItems,
    isLoadingPortion
  }
}
