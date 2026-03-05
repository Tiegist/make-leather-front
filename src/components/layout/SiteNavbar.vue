<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const isMenuOpen = ref(false)
const auth = useAuthStore()

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Our Products' },
  { to: '/contact', label: 'Contact Us' },
] as const

const isActive = computed(() => (to: string) => route.path === to)

function logoutAndCloseMenu() {
  void auth.logout()
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50">
    <div
      class="bg-[rgba(251,250,249,0.78)] backdrop-blur-xl border-b border-black/5 shadow-[0_10px_35px_-28px_rgba(15,23,42,0.45)]"
    >
      <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="h-16 flex items-center justify-between gap-4">
          <RouterLink to="/" class="inline-flex items-center gap-3 group">
            <span
              class="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--brand-brown)] text-white shadow-sm ring-1 ring-black/10 transition group-hover:brightness-[1.06]"
              aria-hidden="true"
            >
              <span class="text-[11px] font-semibold tracking-[0.18em]">ML</span>
            </span>
            <div class="leading-tight">
              <p class="text-sm font-semibold tracking-tight text-slate-900">Make Leather</p>
              <p class="text-[11px] text-slate-500 -mt-0.5">Premium leather goods</p>
            </div>
          </RouterLink>

          <nav class="hidden md:flex items-center gap-1.5">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="px-3 py-2 rounded-xl text-sm font-medium transition"
              :class="
                isActive(item.to)
                  ? 'text-slate-900 bg-black/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-black/5'
              "
            >
              {{ item.label }}
            </RouterLink>

            <RouterLink
              v-if="auth.isAdmin"
              to="/upload-products"
              class="px-3 py-2 rounded-xl text-sm font-semibold transition"
              :class="
                isActive('/upload-products')
                  ? 'text-slate-900 bg-black/5'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'
              "
            >
              Upload Products
            </RouterLink>
          </nav>

          <div class="hidden md:flex items-center gap-3">
            <RouterLink
              v-if="!auth.isLoggedIn"
              to="/login"
              class="inline-flex items-center justify-center rounded-xl bg-[var(--brand-brown)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
            >
              Login
            </RouterLink>
            <button
              v-else
              type="button"
              class="inline-flex items-center justify-center rounded-xl bg-black/5 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-black/10 hover:bg-black/10 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.20)]"
              @click="logoutAndCloseMenu"
            >
              Logout
            </button>
          </div>

          <button
            type="button"
            class="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-black/5 transition"
            aria-label="Toggle menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div v-if="isMenuOpen" class="md:hidden pb-4">
          <div class="grid gap-2 rounded-2xl bg-white/70 ring-1 ring-black/5 p-3">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="px-3 py-2 rounded-xl text-sm font-medium transition"
              :class="
                isActive(item.to)
                  ? 'text-slate-900 bg-black/5'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'
              "
              @click="isMenuOpen = false"
            >
              {{ item.label }}
            </RouterLink>

            <RouterLink
              v-if="auth.isAdmin"
              to="/upload-products"
              class="px-3 py-2 rounded-xl text-sm font-semibold transition text-slate-700 hover:text-slate-900 hover:bg-black/5"
              @click="isMenuOpen = false"
            >
              Upload Products
            </RouterLink>

            <RouterLink
              v-if="!auth.isLoggedIn"
              to="/login"
              class="mt-1 inline-flex items-center justify-center rounded-xl bg-[var(--brand-brown)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
              @click="isMenuOpen = false"
            >
              Login
            </RouterLink>
            <button
              v-else
              type="button"
              class="mt-1 inline-flex items-center justify-center rounded-xl bg-black/5 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-black/10 hover:bg-black/10 transition"
              @click="logoutAndCloseMenu"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
