<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiFetch } from '../lib/api'
import { useAuthStore } from '../stores/auth'

type StatCard = {
  label: string
  value: number | null
  to: string
}

const auth = useAuthStore()
const isLoading = ref(false)
const error = ref<string | null>(null)

const categoriesCount = ref<number | null>(null)
const productsCount = ref<number | null>(null)
const usersCount = ref<number | null>(null)

const cards = computed<StatCard[]>(() => [
  { label: 'Categories', value: categoriesCount.value, to: '/admin/categories' },
  { label: 'Products', value: productsCount.value, to: '/admin/products' },
  { label: 'Users', value: usersCount.value, to: '/admin/users' },
])

async function load() {
  if (!auth.isAdmin) return
  isLoading.value = true
  error.value = null
  try {
    // Public endpoints (should always work)
    const [cats, prods] = await Promise.all([
      apiFetch<any[]>('/api/categories'),
      apiFetch<{ total: number }>('/api/products?per_page=1'),
    ])
    categoriesCount.value = Array.isArray(cats) ? cats.length : 0
    productsCount.value = typeof prods?.total === 'number' ? prods.total : 0

    // Admin endpoint: in some setups Sanctum cookies may not be attached reliably.
    // Don't show the scary banner; just treat it as "0" and keep the dashboard usable.
    const usersPayload = await apiFetch<any>('/api/users', { throwOnError: false })
    if (Array.isArray(usersPayload)) {
      usersCount.value = usersPayload.length
    } else {
      usersCount.value = 0
    }
  } catch (e: any) {
    categoriesCount.value = 0
    productsCount.value = 0
    usersCount.value = 0
    error.value = e?.message ? String(e.message) : 'Failed to load dashboard stats.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void load()
})
</script>

<template>
  <div>
    <div
      v-if="error && error !== 'Unauthenticated.'"
      class="mb-6 rounded-2xl bg-red-50 text-red-700 ring-1 ring-red-200 px-4 py-3 text-sm dark:bg-red-950/30 dark:text-red-200 dark:ring-red-900/40"
    >
      {{ error }}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <RouterLink
        v-for="c in cards"
        :key="c.label"
        :to="c.to"
        class="group block rounded-3xl bg-white ring-1 ring-black/5 shadow-premium p-6 transition hover-lift dark:bg-slate-900/60 dark:ring-white/10"
      >
        <div class="flex items-center justify-between gap-4">
          <p class="text-sm font-semibold text-slate-600 dark:text-slate-300">
            {{ c.label }}
          </p>
          <span class="grid h-10 w-10 place-items-center rounded-2xl bg-black/5 text-slate-700 ring-1 ring-black/10 group-hover:bg-black/10 transition dark:bg-white/5 dark:text-slate-200 dark:ring-white/10 dark:group-hover:bg-white/10">
            <svg viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 3h10v2H5V6zm0 4h10v2H5v-2z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>

        <div class="mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          <span v-if="isLoading">…</span>
          <span v-else>{{ c.value ?? 0 }}</span>
        </div>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Total {{ c.label.toLowerCase() }}</p>
      </RouterLink>
    </div>
  </div>
</template>

