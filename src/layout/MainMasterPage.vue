<template>
  <div class="container">
    <div class="header">
      <slot name="header">
        <div>
          <main-menu-component />
        </div>
        <div class="right-section">
          <lang-section />
          <user-section />
        </div>
      </slot>
    </div>
    <h1 class="page-title">{{ $t(`pages.${currentRoute.name}.title.page`) }}</h1>
    <div>
      <slot name="title"></slot>
    </div>
    <div class="main">
      <loading-page v-if="isLoading" />
      <error-page v-else-if="hasError" />
      <template v-if="!isLoading && !hasError">
        <slot></slot>
      </template>
    </div>
    <div class="footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script setup>
import MainMenuComponent from '@/components/MainMenuComponent.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import ErrorPage from '@/components/ErrorPage.vue'
import LangSection from '@/components/LangSection.vue'
import UserSection from '@/components/UserSection.vue'

import { computed } from 'vue'

import { useGeneralStore } from '@/stores/general'
import { storeToRefs } from 'pinia'
const generalStore = useGeneralStore()

const { isLoading, hasError } = storeToRefs(generalStore)

import { useRoute } from 'vue-router'
const currentRoute = computed(() => useRoute())
</script>

<style lang="scss" scoped>
.container {

  padding: 16px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid #ddd;

    .menu-link {
      margin: 0 16px;
      text-decoration: none;
      color: #2c3e50;
      font-weight: 500;

      &:hover {
        color: #3498db;
      }
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  .page-title {
    padding-bottom: 12px;
    border-bottom: 1px solid #e0e0e0;
   
  }

  .main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;

  }

}
</style>
