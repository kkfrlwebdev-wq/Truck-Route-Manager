<template>
  <nav>
    <router-link
      v-for="routeItem in visibleMenuItems"
      :key="routeItem.name"
      :to="{ name: routeItem.name }"
      class="menu-link"
      active-class="active"
    >
      {{ $t(`pages.${routeItem.name}.title.menu`) }}
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

import { routes } from '@/router'
import { isRouteAvailable } from '@/router/helpers.js'

function checkRoutesList(routeItems, menuItemsRoutes) {
  for (const routeItem of routeItems) {
    if (routeItem.children) checkRoutesList(routeItem.children, menuItemsRoutes)
    else if (routeItem.meta?.useInMenu && isRouteAvailable(routeItem)) {
      menuItemsRoutes.push({
        name: routeItem.name
      })
    }
  }
}

const visibleMenuItems = computed(() => {
  const menuItemsRoutes = []
  checkRoutesList(routes, menuItemsRoutes)
  return menuItemsRoutes
})
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;

  .menu-link {
    text-decoration: none;
    color: var(--secondary-text-color);
    font-weight: 500;
    font-size: 1rem;
    padding: 8px 16px;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      color:var(--primary-color);
    }

    &.active {
      color: var(--primary-hover);
      scale: 1.1;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px; /* Вирівнюємо підкреслення з нижньою межею */
        left: 16px;
        right: 16px;
        height: 2px;
        background-color: var(--primary-hover);
      }
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;

    .menu-link {
      padding: 8px 12px;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;

    .menu-link {
      padding: 8px;
      font-size: 1rem;
    }
  }
}
</style>
