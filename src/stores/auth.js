import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGeneralStore } from './general'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase-config.js'

import authOperations from './helpers/GoogleAuthOperations.js'


export const useAuthStore = defineStore('auth', () => {
  const generalStore = useGeneralStore()
  const { generalApiOperation } = generalStore

  const user = ref(null)
  const authReady = ref(false)

  const getUser = computed(() => user.value)

 
 

  function checkSession() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser
        authReady.value = true

        unsubscribe()
        resolve(firebaseUser)
      })
    })
  }

  function loginWithGoogleAccount() {
    return new Promise((resolve, reject) => {
      generalApiOperation({
        operation: () => authOperations.loginWithGoogleAccountPopup()
      })
        .then((res) => {
          user.value = res
          resolve(res)
          console.log(res)
        })
        .catch((error) => reject(error))
    })
  }

  function logOut() {
    generalApiOperation({
      operation: () => authOperations.logout()
    })
    user.value = null
  }

  function isAuthorized() {
    return !!user.value
  }

  async function getAuthData() {
    return user.value
  }

  return {
    isAuthorized,
    checkSession,
    loginWithGoogleAccount,
    logOut,
    getUser,
    getAuthData
  }
})
