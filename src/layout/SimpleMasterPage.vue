<template>
  <div class="container">
    <div class="header">
      <slot name="header"> </slot>
    </div>
    <div class="main">
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <div class="footer">
      <slot name="footer">
        <router-link :to="{
          name: 'home'
        }" class="home-link">
          {{ $t('pages.login.buttons.toHome') }}
        </router-link>
      </slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .header {
    height: 80px;
  }

  .main {
    flex-grow: 1;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer {
    height: 80px;
  }

  .home-link {
    display: inline-block;
    padding: 10px 20px;
    background-color:var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color:var(--primary-hover);
    }
  }
}
</style>
