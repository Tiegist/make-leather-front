import { defineStore } from 'pinia'
import { apiFetch, ensureCsrfCookie } from '../lib/api'

export type ApiUser = {
  id: number
  name: string
  email: string
  role?: string | null
}

type AuthState = {
  user: ApiUser | null
  isAdmin: boolean
  isBootstrapped: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAdmin: false,
    isBootstrapped: false,
  }),
  getters: {
    isLoggedIn: (s) => Boolean(s.user),
    userEmail: (s) => s.user?.email ?? null,
  },
  actions: {
    async bootstrap() {
      if (this.isBootstrapped) return
      this.isBootstrapped = true
      try {
        const me = await apiFetch<{ user: ApiUser | null; is_admin: boolean }>('/api/me', { throwOnError: false })
        if (me?.user) {
          this.user = me.user
          this.isAdmin = Boolean(me.is_admin)
        } else {
          this.user = null
          this.isAdmin = false
        }
      } catch {
        this.user = null
        this.isAdmin = false
      }
    },

    async login(opts: { email: string; password: string }) {
      await ensureCsrfCookie()
      const res = await apiFetch<{ user: ApiUser }>('/api/login', {
        method: 'POST',
        json: { email: opts.email, password: opts.password },
      })
      this.user = res.user

      const me = await apiFetch<{ user: ApiUser; is_admin: boolean }>('/api/me')
      this.user = me.user
      this.isAdmin = Boolean(me.is_admin)
    },

    async register(opts: { name: string; email: string; password: string; password_confirmation: string }) {
      await ensureCsrfCookie()
      const res = await apiFetch<{ user: ApiUser }>('/api/register', {
        method: 'POST',
        json: opts,
      })
      this.user = res.user

      const me = await apiFetch<{ user: ApiUser; is_admin: boolean }>('/api/me')
      this.user = me.user
      this.isAdmin = Boolean(me.is_admin)
    },

    async logout() {
      await apiFetch('/api/logout', { method: 'POST', throwOnError: false })
      this.user = null
      this.isAdmin = false
      this.isBootstrapped = true
    },
  },
})

