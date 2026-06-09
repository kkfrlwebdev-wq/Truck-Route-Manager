<template>
  <simple-master-page>
    <div class="not-found">
      <h2>Page Not Found</h2>
      <font-awesome-icon :icon="['fas', 'exclamation-circle']" size="4x" class="icon" />
      <p>The page you are looking for doesn't exist.</p>
    </div>
  </simple-master-page>
</template>

<script setup>
import SimpleMasterPage from '@/layout/SimpleMasterPage.vue'
</script>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  padding: 32px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: #e74c3c;
    font-size: 2rem;
    margin-bottom: 16px;
  }

  .icon {
    color: #e74c3c;
    margin-bottom: 16px;
  }

  p {
    color: #7f8c8d;
    font-size: 1.1rem;
    margin-bottom: 24px;
  }

  .home-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
}
</style>
