<template>
  <main-master-page>
    <div class="home-container">
      <h1>{{ $t('pages.home.messages.welcome') }}</h1>
      <p class="subtitle">Your health is our priority. Book an appointment today!</p>
    </div>
  </main-master-page>
</template>

<script setup>
import MainMasterPage from '@/layout/MainMasterPage.vue'
</script>

<style lang="scss" scoped>
.home-container {
  text-align: center;
  padding: 32px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;

  h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 16px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
  }

  @media (max-width: 768px) {
    padding: 16px;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }
}
</style>
