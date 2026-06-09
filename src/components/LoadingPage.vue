<template>
  <div class="loading-container">
    <font-awesome-icon :icon="['fas', 'spinner']" size="6x" spin class="icon" />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.mt-16 {
  margin-top: 16px;
}

.ml-16 {
  margin-left: 16px;
}

label {
  display: block;
  font-weight: 500;
}

button {
  margin-right: 8px; /* Додаємо відстань між кнопками */
}

button:nth-child(3) {
  /* Стилі для кнопки Google */
  background-color: #fff;
  color: #2c3e50;
  border: 1px solid #bdc3c7;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f5f6fa;
  }
}
</style>
