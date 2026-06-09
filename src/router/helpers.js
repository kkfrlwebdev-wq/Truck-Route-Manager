import { useAuthStore } from '@/stores/auth'

export async function isAuthenticated() {
  useAuthStore().checkSession()
  return useAuthStore().getUser
}

export function isRouteAvailable(routeItem){ 
  return !routeItem.meta?.requireAuth || routeItem.meta?.requireAuth
}


