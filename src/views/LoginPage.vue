<script setup>
import SimpleMasterPage from '@/layout/SimpleMasterPage.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

import { useRouter } from 'vue-router'
const router = useRouter()


const btnDisabled = ref(false)

function isDisabled() {
  btnDisabled.value = true
}

const { loginWithGoogleAccount } =
  authStore
function loginWithGoogle() {
  isDisabled()
  loginWithGoogleAccount().then(() => {
    router.push({
      name: 'home'
    })
  })
}
</script>

<template>

  <simple-master-page>
    <img class="logo" src="../assets/logo.png" alt="Image">
    <template #header>
      <h1>{{ $t('pages.login.title.page') }}</h1>
    </template>
    <div>


      <button class="google-button" type="button" :disabled="btnDisabled" @click="loginWithGoogle">
        <span class="google-icon">
          <svg viewBox="0 0 48 48" width="18" height="18">
            <path fill="#EA4335"
              d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.7 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.3 13.6 17.7 9.5 24 9.5z" />
            <path fill="#4285F4"
              d="M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v8.2h12.7c-.3 2.1-1.6 5.3-4.7 7.4l7.3 5.7c4.3-4 6.8-9.8 6.8-17.2z" />
            <path fill="#FBBC05"
              d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.7l7.9-6.1z" />
            <path fill="#34A853"
              d="M24 48c6.3 0 11.6-2.1 15.4-5.7L32 36.6c-2 1.4-4.7 2.4-8 2.4-6.3 0-11.7-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
          </svg>
        </span>

        <span>Continue with Google</span>
      </button>
    </div>
  </simple-master-page>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  aspect-ratio: 1536/1024;
}

.google-button {
  width: 358px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  background: #fff;
  border: 1px solid #222;
  border-radius: 7px;

  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #000;

  cursor: pointer;
}

.google-button:hover {
  background: #f8f8f8;
}

.google-button:disabled {
  background: #f8f8f8;
  opacity: .5;
}

.google-button:active {
  background: #eee;
}

.google-icon {
  display: flex;
  align-items: center;
}
</style>
