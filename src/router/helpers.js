import { useAuthStore } from '@/stores/auth'

export async function isAuthenticated() {
  const authStore = useAuthStore()
  await authStore.checkSession()

  return !!authStore.getUser
}

export function isRouteAvailable(routeItem){ 
  return !routeItem.meta?.requireAuth || routeItem.meta?.requireAuth
}

