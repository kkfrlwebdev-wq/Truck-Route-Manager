import firebaseDB from '@/firebase-config'
import {
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  updateDoc,
  setDoc,
  query,
  where,
  documentId,
  limit,
  orderBy,
  startAfter
} from 'firebase/firestore/lite'


class DbOperations {
  constructor(collectionTitle) {
    this.dbCollection = collection(firebaseDB,`/${collectionTitle}` )
  }
  getFiltersQuery(filters = []) {
    return filters.map(({ fieldTitle, compareOperator, valueToCompare }) =>
      where(fieldTitle, compareOperator, valueToCompare)
    )
  }
  getListFromSnapshot(snapshot) {
    const list = []
    snapshot.docs.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data()
      })
    })
    return list
  }
  loadItemsList(filters = []) {
    const q = filters.length
      ? query(this.dbCollection, ...this.getFiltersQuery(filters))
      : this.dbCollection

    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((querySnapshot) => {
          resolve(this.getListFromSnapshot(querySnapshot))
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  addItem(item) {
    return new Promise((resolve, reject) => {
      addDoc(this.dbCollection, item)
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
      
    })
  }
  addItemWithCustomId(id, item) {
    return new Promise((resolve, reject) => {
      setDoc(doc(this.dbCollection, id), item)
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  addItemToArray(id, arrayProperty, value, extraData = {}) {
    return new Promise((resolve, reject) => {
      this.getItemById(id).then((item) => {
        if (item.appointments) {
          updateDoc(doc(this.dbCollection, id), {
            [arrayProperty]: arrayUnion(value)
          })
            .then(() => {
              resolve(true)
            })
            .catch((error) => {
              reject(error)
            })
        } else {
          this.addItemWithCustomId(id, {
            ...extraData,
            [arrayProperty]: [value]
          })
            .then(() => {
              resolve(true)
            })
            .catch((error) => {
              reject(error)
            })
        }
      })
    })
  }
  removeItemFromArray(id, arrayProperty, value) {
    return new Promise((resolve, reject) => {
      updateDoc(doc(this.dbCollection, id), {
        [arrayProperty]: arrayRemove(value)
      })
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  deleteItem(id) {
    return new Promise((resolve, reject) => {
      deleteDoc(doc(this.dbCollection, id))
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  updateItem(itemId, data) {
    return new Promise((resolve, reject) => {
      const oldDocRef = doc(this.dbCollection, itemId)
      updateDoc(oldDocRef, data)
        .then(() => {
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  getItemById(itemId) {
    return new Promise((resolve, reject) => {
      const docRef = doc(this.dbCollection, itemId)
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) resolve(docSnap.data())
          else resolve({})
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  loadFilteredData(fieldTitle, compareOperator, valueToCompare) {
    const q = query(this.dbCollection, where(fieldTitle, compareOperator, valueToCompare))
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((querySnapshot) => {
          resolve(this.getListFromSnapshot(querySnapshot))
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  loadDocumentsFromIdsList(idsList) {
    const q = query(this.dbCollection, where(documentId(), 'in', idsList))
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((querySnapshot) => {
          resolve(this.getListFromSnapshot(querySnapshot))
        })
        .catch((error) => {
          reject(error)
        })
    })
  }


  loadItemsPortion(pageSize, lastVisibleDoc, filters = []) {
    return new Promise((resolve, reject) => {
      const filtersQuery = this.getFiltersQuery(filters)
      let q

      if (lastVisibleDoc) {
        q = query(
          this.dbCollection,
          ...filtersQuery,
          orderBy(documentId()),
          startAfter(lastVisibleDoc),
          limit(pageSize)
        )
      } else {
        q = query(
          this.dbCollection,
          ...filtersQuery,
          orderBy(documentId()),
          limit(pageSize)
        )
      }

      getDocs(q)
        .then((querySnapshot) => {
          resolve({
            items: this.getListFromSnapshot(querySnapshot),
            lastVisibleDoc:
              querySnapshot.docs[querySnapshot.docs.length - 1] || null,
            hasMore: querySnapshot.docs.length === pageSize
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }



}

export default DbOperations
