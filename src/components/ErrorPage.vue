<template>
  <div class="container">
    <h2>
      {{ $t('pages.error.messages.smth_wrong') }}
    </h2>
    <font-awesome-icon :icon="['fas', 'triangle-exclamation']" size="6x" class="icon" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  text-align: center;
  padding: 32px;

  h2 {
    margin-bottom: 16px;
  }

  .icon {
    color: #e74c3c;
  }
}
</style>
