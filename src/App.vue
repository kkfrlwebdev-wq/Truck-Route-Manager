<script setup>
import { RouterView } from 'vue-router'
import { useLocales } from './modulesHelpers/i18n'
import { useAuthStore } from "./stores/auth";
import { onMounted } from "vue";

const auth = useAuthStore()

onMounted(() => {
  auth.checkSession()
})

const { checkLocale } = useLocales()
checkLocale()
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
