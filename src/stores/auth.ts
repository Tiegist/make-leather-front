import { defineStore } from 'pinia'
import { apiFetch } from '../lib/api'
import { useToastStore } from './toast'

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
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAdmin: false,
    isBootstrapped: false,
    token: null,
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
        // First, hydrate from localStorage so a page refresh keeps UI state
        try {
          const storedUser = localStorage.getItem('auth_user')
          const storedAdmin = localStorage.getItem('auth_is_admin')
          const storedToken = localStorage.getItem('auth_token')
          if (storedUser) {
            this.user = JSON.parse(storedUser) as ApiUser
            this.isAdmin = storedAdmin === '1'
          }
          this.token = storedToken || null
        } catch {
          // ignore localStorage errors
        }

        // Then, validate against the backend (Bearer token preferred).
        const me = await apiFetch<{ user: ApiUser | null; is_admin: boolean } | { message?: string } | null>(
          '/api/me',
          { throwOnError: false },
        )

        if (me && typeof me === 'object' && 'user' in me && (me as any).user) {
          const payload = me as { user: ApiUser; is_admin: boolean }
          this.user = payload.user
          this.isAdmin = Boolean(payload.is_admin)
          try {
            localStorage.setItem('auth_user', JSON.stringify(this.user))
            localStorage.setItem('auth_is_admin', this.isAdmin ? '1' : '0')
          } catch {
            // ignore
          }
        } else {
          // If backend says unauthenticated, clear local auth so UI matches reality.
          this.user = null
          this.isAdmin = false
          this.token = null
          try {
            localStorage.removeItem('auth_user')
            localStorage.removeItem('auth_is_admin')
            localStorage.removeItem('auth_token')
          } catch {
            // ignore
          }
        }
      } catch {
        // On bootstrap errors, keep whatever local state we have so a refresh
        // doesn't force a logout purely due to a transient network / backend issue.
      }
    },

    async login(opts: { email: string; password: string }) {
      const toast = useToastStore()
      try {
        const res = await apiFetch<{ user: ApiUser; token?: string | null }>('/api/login', {
          method: 'POST',
          json: { email: opts.email, password: opts.password },
        })
        this.user = res.user
        this.token = res.token ?? null
        try {
          if (this.token) localStorage.setItem('auth_token', this.token)
          else localStorage.removeItem('auth_token')
        } catch {
          // ignore
        }

        const me = await apiFetch<{ user: ApiUser; is_admin: boolean }>('/api/me')
        this.user = me.user
        this.isAdmin = Boolean(me.is_admin)
        try {
          localStorage.setItem('auth_user', JSON.stringify(this.user))
          localStorage.setItem('auth_is_admin', this.isAdmin ? '1' : '0')
        } catch {
          // ignore
        }

        toast.success(`Welcome${this.user?.name ? `, ${this.user.name}` : ''}.`)
      } catch (e: any) {
        toast.error(e?.message && typeof e.message === 'string' ? e.message : 'Login failed.')
        throw e
      }
    },

    async register(opts: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
      address?: string;
      phone?: string;
      image?: File | null;
      role?: string;
    }) {
      const formData = new FormData()
      formData.append('name', opts.name)
      formData.append('email', opts.email)
      formData.append('password', opts.password)
      formData.append('password_confirmation', opts.password_confirmation)
      formData.append('role', opts.role || 'Guest')
      if (opts.address) formData.append('address', opts.address)
      if (opts.phone) formData.append('phone', opts.phone)
      if (opts.image) formData.append('image', opts.image)

      const toast = useToastStore()
      try {
        const res = await apiFetch<{ user: ApiUser; token?: string | null }>('/api/register', {
          method: 'POST',
          body: formData,
        })
        this.user = res.user
        this.token = res.token ?? null
        try {
          if (this.token) localStorage.setItem('auth_token', this.token)
          else localStorage.removeItem('auth_token')
        } catch {
          // ignore
        }

        const me = await apiFetch<{ user: ApiUser; is_admin: boolean }>('/api/me')
        this.user = me.user
        this.isAdmin = Boolean(me.is_admin)
        try {
          localStorage.setItem('auth_user', JSON.stringify(this.user))
          localStorage.setItem('auth_is_admin', this.isAdmin ? '1' : '0')
        } catch {
          // ignore
        }

        toast.success('Account created.')
      } catch (e: any) {
        toast.error(e?.message && typeof e.message === 'string' ? e.message : 'Registration failed.')
        throw e
      }
    },

    async logout() {
      const toast = useToastStore()
      await apiFetch('/api/logout', { method: 'POST', throwOnError: false })
      this.user = null
      this.isAdmin = false
      this.isBootstrapped = true
      this.token = null
      try {
        localStorage.removeItem('auth_user')
        localStorage.removeItem('auth_is_admin')
        localStorage.removeItem('auth_token')
      } catch {
        // ignore
      }
      toast.info('Logged out.')
    },
  },
})

