<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiFetch } from '../lib/api'
import type { ApiProduct } from '../stores/products'

const products = ref<ApiProduct[]>([])
const isLoading = ref(false)
const search = ref('')
const error = ref<string | null>(null)

const filteredProducts = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return products.value
  return products.value.filter((p) => {
    const haystack = `${p.name} ${p.slug} ${p.category?.name ?? ''}`.toLowerCase()
    return haystack.includes(term)
  })
})

const totalCount = computed(() => products.value.length)
const activeCount = computed(() => products.value.filter((p) => p.is_active).length)
const featuredCount = computed(() => products.value.filter((p) => p.is_featured).length)

const money = (amount: number) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

const numericPrice = (p: ApiProduct) => {
  const n = typeof p.price === 'number' ? p.price : Number(p.price)
  return Number.isFinite(n) ? n : 0
}

async function loadProducts() {
  isLoading.value = true
  error.value = null
  try {
    const res = await apiFetch<{ data: ApiProduct[]; total?: number }>('/api/products?per_page=100', {
      throwOnError: false,
    })
    products.value = Array.isArray((res as any).data) ? (res as any).data : (Array.isArray(res) ? (res as any) : [])
  } catch (e: any) {
    error.value = e?.message ? String(e.message) : 'Failed to load products.'
    products.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void loadProducts()
})
</script>

<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Catalog</p>
        <h1 class="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Products
        </h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Review products in your store with a compact tabular view.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
        >
          <span class="mr-1" aria-hidden="true">+</span>
          New product
        </button>
      </div>
    </header>

    <div v-if="error" class="rounded-2xl bg-red-50 text-red-700 ring-1 ring-red-200 px-4 py-3 text-sm dark:bg-red-950/30 dark:text-red-200 dark:ring-red-900/40">
      {{ error }}
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="rounded-2xl bg-white ring-1 ring-black/5 shadow-premium p-4 flex items-center justify-between dark:bg-slate-900/60 dark:ring-white/10">
        <div>
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400">Total</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ totalCount }}
          </p>
        </div>
      </div>
      <div class="rounded-2xl bg-white ring-1 ring-black/5 shadow-premium p-4 flex items-center justify-between dark:bg-slate-900/60 dark:ring-white/10">
        <div>
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400">Active</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ activeCount }}
          </p>
        </div>
      </div>
      <div class="rounded-2xl bg-white ring-1 ring-black/5 shadow-premium p-4 flex items-center justify-between dark:bg-slate-900/60 dark:ring-white/10">
        <div>
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400">Featured</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ featuredCount }}
          </p>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-3xl bg-white ring-1 ring-black/5 shadow-premium overflow-hidden dark:bg-slate-900/60 dark:ring-white/10">
      <div
        class="flex flex-col gap-3 border-b border-black/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
      >
        <div class="flex-1 max-w-md">
          <label class="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Search
          </label>
          <input
            v-model="search"
            type="search"
            placeholder="Filter by name, slug, or category"
            class="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-[var(--brand-brown)]"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th class="px-4 py-3 text-left font-medium">Name</th>
              <th class="px-4 py-3 text-left font-medium hidden sm:table-cell">Category</th>
              <th class="px-4 py-3 text-left font-medium">Price</th>
              <th class="px-4 py-3 text-left font-medium hidden md:table-cell">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="p in filteredProducts" :key="p.id" class="text-slate-800 dark:text-slate-100">
              <td class="px-4 py-3 font-medium">
                {{ p.name }}
              </td>
              <td class="px-4 py-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                {{ p.category?.name ?? '—' }}
              </td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-200">
                {{ money(numericPrice(p)) }}
              </td>
              <td class="px-4 py-3 hidden md:table-cell">
                <span
                  class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
                  :class="
                    p.is_active
                      ? 'bg-green-50 text-green-700 ring-1 ring-green-100 dark:bg-green-900/30 dark:text-green-200 dark:ring-green-900/60'
                      : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
                  "
                >
                  {{ p.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </tr>
            <tr v-if="!isLoading && !filteredProducts.length">
              <td class="px-4 py-6 text-sm text-slate-500 dark:text-slate-400" colspan="4">
                No products found.
              </td>
            </tr>
            <tr v-if="isLoading">
              <td class="px-4 py-6 text-sm text-slate-500 dark:text-slate-400" colspan="4">
                Loading products…
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

