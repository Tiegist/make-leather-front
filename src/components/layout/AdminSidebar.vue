<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useThemeStore } from '../../stores/theme'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const theme = useThemeStore()
const isOpenMobile = ref(false)
const isAccountOpen = ref(false)

const initials = computed(() => {
  const name = auth.user?.name?.trim()
  const email = auth.userEmail?.trim()
  const source = name || email || 'Admin'
  const parts = source.split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? 'A'
  const second = (parts.length > 1 ? parts[1]?.[0] : parts[0]?.[1]) ?? ''
  return (first + second).toUpperCase()
})

const coreItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'home' },
  { to: '/admin/categories', label: 'Categories', icon: 'grid' },
  { to: '/admin/products', label: 'Products', icon: 'box' },
  { to: '/admin/users', label: 'Users', icon: 'users' },
] as const

const isActive = computed(() => (to: string) => route.path === to)

function closeMobile() {
  isOpenMobile.value = false
}

function toggleAccount() {
  isAccountOpen.value = !isAccountOpen.value
}

async function logout() {
  await auth.logout()
  isAccountOpen.value = false
  closeMobile()
  void router.push('/')
}

function iconPath(name: (typeof coreItems)[number]['icon']) {
  switch (name) {
    case 'home':
      return 'M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 10h1v7a1 1 0 001 1h4a1 1 0 001-1v-4h2v4a1 1 0 001 1h4a1 1 0 001-1v-7h1a1 1 0 00.707-1.707l-7-7z'
    case 'grid':
      return 'M4 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H4zM4 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H4zM12 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM12 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
    case 'box':
      return 'M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 3h10v2H5V6zm0 4h10v2H5v-2z'
    case 'users':
      return 'M10 2a5 5 0 100 10 5 5 0 000-10zM4 17a6 6 0 1112 0v1H4v-1z'
  }
}
</script>

<template>
  <!-- Mobile top bar -->
  <div
    class="md:hidden sticky top-0 z-40 bg-[rgba(251,250,249,0.78)] backdrop-blur-xl border-b border-black/5 dark:bg-[rgba(2,6,23,0.78)] dark:border-white/10"
  >
    <div class="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
      <RouterLink to="/admin/dashboard" class="inline-flex items-center gap-3" @click="closeMobile">
        <span
          class="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--brand-brown)] text-white shadow-sm ring-1 ring-black/10"
          aria-hidden="true"
        >
          <span class="text-[11px] font-semibold tracking-[0.18em]">ML</span>
        </span>
        <div class="leading-tight">
          <p class="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
            Make Leather
          </p>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
            Premium leather products
          </p>
        </div>
      </RouterLink>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-black/5 transition"
        aria-label="Toggle sidebar"
        @click="isOpenMobile = !isOpenMobile"
      >
        <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile overlay -->
  <div v-if="isOpenMobile" class="md:hidden fixed inset-0 z-40">
    <button class="absolute inset-0 bg-black/40" aria-label="Close sidebar" @click="closeMobile" />
    <div
      class="absolute left-0 top-0 h-full w-80 bg-white shadow-xl ring-1 ring-black/10 dark:bg-slate-950 dark:ring-white/10"
    >
      <div class="h-16 flex items-center px-5 border-b border-black/5">
        <p class="text-sm font-semibold text-slate-900 dark:text-white">Admin Menu</p>
      </div>
      <div class="p-4">
        <p
          class="px-3 text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400"
        >
          Core
        </p>
      </div>
      <nav class="px-3 space-y-1">
        <RouterLink
          v-for="item in coreItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition"
          :class="
            isActive(item.to)
              ? 'text-slate-900 bg-black/5 dark:text-white dark:bg-white/10'
              : 'text-slate-700 hover:text-slate-900 hover:bg-black/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
          "
          @click="closeMobile"
        >
          <span
            class="grid h-8 w-8 place-items-center rounded-xl bg-black/5 ring-1 ring-black/10 transition dark:bg-white/5 dark:ring-white/10"
            :class="
              isActive(item.to)
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-300'
            "
            aria-hidden="true"
          >
            <svg viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor">
              <path
                :d="iconPath(item.icon)"
                :fill-rule="item.icon === 'box' ? 'evenodd' : undefined"
                :clip-rule="item.icon === 'box' ? 'evenodd' : undefined"
              />
            </svg>
          </span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="mt-auto p-4 border-t border-black/5 dark:border-white/10">
        <div
          class="rounded-2xl ring-1 ring-black/10 bg-white p-3 dark:bg-slate-950 dark:ring-white/10"
        >
          <button
            type="button"
            class="w-full flex items-center justify-between gap-3 px-2 py-2 rounded-xl hover:bg-black/5 transition dark:hover:bg-white/10"
            @click="toggleAccount"
          >
            <span class="flex items-center gap-3 min-w-0">
              <span
                class="grid h-10 w-10 place-items-center rounded-2xl bg-black/5 text-slate-800 ring-1 ring-black/10 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10"
              >
                <span class="text-xs font-semibold tracking-[0.12em]">{{ initials }}</span>
              </span>
              <span class="min-w-0 text-left leading-tight">
                <span
                  class="block truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-white"
                >
                  {{ auth.user?.name ?? 'Admin User' }}
                </span>
                <span class="block truncate text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
                  {{ auth.userEmail ?? '—' }}
                </span>
              </span>
            </span>
            <svg
              viewBox="0 0 20 20"
              class="h-5 w-5 text-slate-400 transition-transform"
              :class="isAccountOpen ? 'rotate-180' : ''"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div v-if="isAccountOpen" class="pt-2">
            <button
              type="button"
              class="mt-2 w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-black/5 transition dark:text-slate-300 dark:hover:bg-white/10"
              @click="theme.toggle()"
            >
              <span class="inline-flex items-center gap-3">
                <span
                  class="grid h-8 w-8 place-items-center rounded-xl bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10"
                >
                  <svg viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path
                      d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zm6.364 3.636a.75.75 0 010 1.061l-.884.884a.75.75 0 11-1.06-1.06l.883-.885a.75.75 0 011.061 0zM18 10a.75.75 0 01-.75.75H16a.75.75 0 010-1.5h1.25A.75.75 0 0118 10zM5.276 6.52a.75.75 0 11-1.06 1.06l-.885-.883a.75.75 0 111.06-1.061l.885.884zM4 10a.75.75 0 01-.75.75H2a.75.75 0 010-1.5h1.25A.75.75 0 014 10zm1.216 6.48a.75.75 0 010-1.06l.884-.885a.75.75 0 111.06 1.06l-.883.885a.75.75 0 01-1.061 0zM10 16a.75.75 0 01.75.75V18a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 16zm6.48 1.216a.75.75 0 01-1.06 0l-.885-.884a.75.75 0 111.06-1.06l.885.883a.75.75 0 010 1.061z"
                    />
                    <path d="M10 6a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </span>
                Dark mode
              </span>
              <span
                class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                :class="
                  theme.dark ? 'bg-slate-900 dark:bg-white/20' : 'bg-slate-200 dark:bg-white/10'
                "
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  :class="theme.dark ? 'translate-x-4' : 'translate-x-1'"
                ></span>
              </span>
            </button>

            <button
              type="button"
              class="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-black/5 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-black/10 hover:bg-black/10 transition dark:bg-white/5 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/10"
              @click="logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop sidebar -->
  <aside
    class="hidden md:flex md:flex-col md:w-80 md:shrink-0 bg-white border-r border-black/5 md:sticky md:top-0 md:h-screen dark:bg-slate-950 dark:border-white/10"
  >
    <div class="h-16 flex items-center px-5 border-b border-black/5">
      <RouterLink to="/admin/dashboard" class="inline-flex items-center gap-3">
        <span
          class="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--brand-brown)] text-white shadow-sm ring-1 ring-black/10"
          aria-hidden="true"
        >
          <span class="text-[11px] font-semibold tracking-[0.18em]">ML</span>
        </span>
        <div class="leading-tight">
          <p class="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
            Make Leather
          </p>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
            Premium leather products
          </p>
        </div>
      </RouterLink>
    </div>

    <div class="flex-1 overflow-y-auto px-4 py-5">
      <p
        class="px-3 text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400"
      >
        Core
      </p>
      <nav class="mt-2 space-y-1">
        <RouterLink
          v-for="item in coreItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition"
          :class="
            isActive(item.to)
              ? 'text-slate-900 bg-black/5 dark:text-white dark:bg-white/10'
              : 'text-slate-700 hover:text-slate-900 hover:bg-black/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
          "
        >
          <span
            class="grid h-8 w-8 place-items-center rounded-xl bg-black/5 ring-1 ring-black/10 transition dark:bg-white/5 dark:ring-white/10"
            :class="
              isActive(item.to)
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-300'
            "
            aria-hidden="true"
          >
            <svg viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor">
              <path
                :d="iconPath(item.icon)"
                :fill-rule="item.icon === 'box' ? 'evenodd' : undefined"
                :clip-rule="item.icon === 'box' ? 'evenodd' : undefined"
              />
            </svg>
          </span>
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>

    <div class="p-3 border-t border-black/5">
      <div
        class="rounded-2xl ring-1 ring-black/10 bg-white p-3 dark:bg-slate-950 dark:ring-white/10"
      >
        <button
          type="button"
          class="w-full flex items-center justify-between gap-3 px-2 py-2 rounded-xl hover:bg-black/5 transition dark:hover:bg-white/10"
          @click="toggleAccount"
        >
          <span class="flex items-center gap-3 min-w-0">
            <span
              class="grid h-10 w-10 place-items-center rounded-2xl bg-black/5 text-slate-800 ring-1 ring-black/10 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10"
            >
              <span class="text-xs font-semibold tracking-[0.12em]">{{ initials }}</span>
            </span>
            <span class="min-w-0 text-left leading-tight">
              <span
                class="block truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-white"
              >
                {{ auth.user?.name ?? 'Admin User' }}
              </span>
              <span class="block truncate text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
                {{ auth.userEmail ?? '—' }}
              </span>
            </span>
          </span>
          <svg
            viewBox="0 0 20 20"
            class="h-5 w-5 text-slate-400 transition-transform"
            :class="isAccountOpen ? 'rotate-180' : ''"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div v-if="isAccountOpen" class="pt-2">
          <button
            type="button"
            class="mt-2 w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-black/5 transition dark:text-slate-300 dark:hover:bg-white/10"
            @click="theme.toggle()"
          >
            <span class="inline-flex items-center gap-3">
              <span
                class="grid h-8 w-8 place-items-center rounded-xl bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10"
              >
                <svg viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path
                    d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zm6.364 3.636a.75.75 0 010 1.061l-.884.884a.75.75 0 11-1.06-1.06l.883-.885a.75.75 0 011.061 0zM18 10a.75.75 0 01-.75.75H16a.75.75 0 010-1.5h1.25A.75.75 0 0118 10zM5.276 6.52a.75.75 0 11-1.06 1.06l-.885-.883a.75.75 0 111.06-1.061l.885.884zM4 10a.75.75 0 01-.75.75H2a.75.75 0 010-1.5h1.25A.75.75 0 014 10zm1.216 6.48a.75.75 0 010-1.06l.884-.885a.75.75 0 111.06 1.06l-.883.885a.75.75 0 01-1.061 0zM10 16a.75.75 0 01.75.75V18a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 16zm6.48 1.216a.75.75 0 01-1.06 0l-.885-.884a.75.75 0 111.06-1.06l.885.883a.75.75 0 010 1.061z"
                  />
                  <path d="M10 6a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </span>
              Dark mode
            </span>
            <span
              class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
              :class="
                theme.dark ? 'bg-slate-900 dark:bg-white/20' : 'bg-slate-200 dark:bg-white/10'
              "
            >
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                :class="theme.dark ? 'translate-x-4' : 'translate-x-1'"
              ></span>
            </span>
          </button>

          <button
            type="button"
            class="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-black/5 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-black/10 hover:bg-black/10 transition dark:bg-white/5 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-white/10"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>
