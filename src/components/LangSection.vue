<template>
  <div class="lang">
    <span
      :class="{
        selected: locale == 'ua'
      }"
      @click="setLocale('ua')"
      >UA</span
    >
    <span
      :class="{
        selected: locale == 'en'
      }"
      @click="setLocale('en')"
    >
      EN</span
    >
  </div>
</template>

<script setup>
import { useLocales } from '@/modulesHelpers/i18n.js'
const { locale, setLocale } = useLocales()
</script>

<style lang="scss" scoped>
.lang {
  display: flex;
  gap: 10px;
  span {
    cursor: pointer;
    padding: 4px 8px;
   

    &.selected {
      border-bottom: 2px solid var(--primary-color);
    }
  }
}
</style>
