<template>
  <main-master-page>
    <div class="about">
      <h1>{{ $t('pages.about.messages.text') }}</h1>
    </div>
  </main-master-page>
</template>

<script setup>
import MainMasterPage from '@/layout/MainMasterPage.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
