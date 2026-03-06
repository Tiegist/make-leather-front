<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const auth = useAuthStore()
const isOpenMobile = ref(false)

const initials = computed(() => {
  const name = auth.user?.name?.trim()
  const email = auth.userEmail?.trim()
  const source = name || email || 'Admin'
  const parts = source.split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? 'A'
  const second = (parts.length > 1 ? parts[1]?.[0] : parts[0]?.[1]) ?? ''
  return (first + second).toUpperCase()
})

const items = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/upload-products', label: 'Upload Products' },
] as const

const isActive = computed(() => (to: string) => route.path === to)

function closeMobile() {
  isOpenMobile.value = false
}

async function logout() {
  await auth.logout()
  closeMobile()
}
</script>

<template>
  <!-- Mobile top bar -->
  <div class="md:hidden sticky top-0 z-40 bg-[rgba(251,250,249,0.78)] backdrop-blur-xl border-b border-black/5">
    <div class="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
      <RouterLink to="/" class="inline-flex items-center gap-3" @click="closeMobile">
        <span
          class="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--brand-brown)] text-white shadow-sm ring-1 ring-black/10"
          aria-hidden="true"
        >
          <span class="text-[11px] font-semibold tracking-[0.18em]">ML</span>
        </span>
        <div class="leading-tight">
          <p class="text-sm font-semibold tracking-tight text-slate-900">Admin</p>
          <p class="text-[11px] text-slate-500 -mt-0.5">{{ auth.userEmail ?? '—' }}</p>
        </div>
      </RouterLink>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-black/5 transition"
        aria-label="Toggle sidebar"
        @click="isOpenMobile = !isOpenMobile"
      >
        <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile overlay -->
  <div v-if="isOpenMobile" class="md:hidden fixed inset-0 z-40">
    <button class="absolute inset-0 bg-black/40" aria-label="Close sidebar" @click="closeMobile" />
    <div class="absolute left-0 top-0 h-full w-72 bg-white shadow-xl ring-1 ring-black/10">
      <div class="h-16 flex items-center px-5 border-b border-black/5">
        <p class="text-sm font-semibold text-slate-900">Admin Menu</p>
      </div>
      <nav class="p-3 space-y-1">
        <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition"
          :class="isActive(item.to) ? 'text-slate-900 bg-black/5' : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'"
          @click="closeMobile"
        >
          <span class="h-2 w-2 rounded-full" :class="isActive(item.to) ? 'bg-slate-900' : 'bg-slate-300'" />
          {{ item.label }}
        </RouterLink>

        <RouterLink
          to="/"
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-black/5 transition"
          @click="closeMobile"
        >
          <span class="h-2 w-2 rounded-full bg-slate-300" />
          Back to site
        </RouterLink>
      </nav>

      <div class="mt-auto p-3 border-t border-black/5">
        <button
          type="button"
          class="w-full inline-flex items-center justify-center rounded-xl bg-black/5 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-black/10 hover:bg-black/10 transition"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </div>

  <!-- Desktop sidebar -->
  <aside
    class="hidden md:flex md:flex-col md:w-64 md:shrink-0 bg-white border-r border-black/5 md:sticky md:top-0 md:h-screen"
  >
    <div class="h-16 flex items-center px-5 border-b border-black/5">
      <RouterLink to="/" class="inline-flex items-center gap-3">
        <span
          class="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--brand-brown)] text-white shadow-sm ring-1 ring-black/10"
          aria-hidden="true"
        >
          <span class="text-[11px] font-semibold tracking-[0.18em]">ML</span>
        </span>
        <div class="leading-tight">
          <p class="text-sm font-semibold tracking-tight text-slate-900">Admin Panel</p>
          <p class="text-[11px] text-slate-500 -mt-0.5">Manage your store</p>
        </div>
      </RouterLink>
    </div>

    <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
      <RouterLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition"
        :class="isActive(item.to) ? 'text-slate-900 bg-black/5' : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'"
      >
        <span class="h-2 w-2 rounded-full" :class="isActive(item.to) ? 'bg-slate-900' : 'bg-slate-300'" />
        {{ item.label }}
      </RouterLink>
    </nav>

    <div class="p-3 border-t border-black/5">
      <div class="mb-3 flex items-center gap-3 px-2">
        <span
          class="grid h-10 w-10 place-items-center rounded-2xl bg-black/5 text-slate-800 ring-1 ring-black/10"
          aria-hidden="true"
        >
          <span class="text-xs font-semibold tracking-[0.12em]">{{ initials }}</span>
        </span>
        <div class="min-w-0 leading-tight">
          <p class="truncate text-sm font-semibold tracking-tight text-slate-900">Admin</p>
          <p class="truncate text-[11px] text-slate-500 -mt-0.5">{{ auth.userEmail ?? '—' }}</p>
        </div>
      </div>

      <button
        type="button"
        class="w-full inline-flex items-center justify-center rounded-xl bg-black/5 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-black/10 hover:bg-black/10 transition"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </aside>
</template>

