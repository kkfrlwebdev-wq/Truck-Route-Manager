<template>
  <div>
    <div v-if="user" class="user-section">
      <img v-if="user.photoURL" :src="user.photoURL" class="user_foto" />
      <font-awesome-icon v-else :icon="['fas', 'user']" size="2x" class="ml-16" />
      <span class="ml-16">{{ user.displayName ?? user.email }}</span>

      <button class="ml-16" @click="onLogout">{{ $t('buttons.logout') }}</button>
    </div>
    <button v-else @click="onLogin">{{ $t('buttons.login') }}</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const user = computed(() => authStore.getUser)

import { useRouter } from 'vue-router'
const router = useRouter()

function onLogin() {
  router.push({
    name: 'login'
  })
}

async function onLogout() {
  await authStore.logOut()
  router.push({
    name: 'login'
  })
}
</script>

<style lang="scss" scoped>
.user_foto{
  border: 2px solid var(--primary-color);
  aspect-ratio: 1;
}
.user-section {
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    height: 40px;
    border-radius: 50%;
  }
}
</style>
