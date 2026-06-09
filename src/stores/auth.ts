import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const redirectAfterLogin = ref<string | null>(null)

  const isLoggedIn = computed(() => user.value !== null)

  function login(userData: User) {
    user.value = userData
  }

  function logout() {
    user.value = null
  }

  return { user, redirectAfterLogin, isLoggedIn, login, logout }
})
