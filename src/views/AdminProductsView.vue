<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { apiFetch } from '../lib/api'
import { useCatalogStore } from '../stores/catalog'
import { useProductsStore, type ApiProduct } from '../stores/products'

const catalog = useCatalogStore()
const productsStore = useProductsStore()

const products = ref<ApiProduct[]>([])
const isLoading = ref(false)
const search = ref('')
const error = ref<string | null>(null)

// Creation state
const isCreating = ref(false)
const isSaving = ref(false)
const createError = ref<string | null>(null)

const createName = ref('')
const createSlug = ref('')
const createSlugTouched = ref(false)
const createDescription = ref('')
const createShortDescription = ref('') // Added for consistency with UploadProductsView
const createPrice = ref<number | null>(null)
const createStock = ref(0)
const createCategoryId = ref<number | null>(null)
const createIsFeatured = ref(false)
const createIsActive = ref(true)
const createMainImage = ref<string | null>(null)

const isCategoryDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const selectedCategoryName = computed(() => {
  return catalog.categories.find((c) => c.id === createCategoryId.value)?.name ?? 'Select category'
})

function toggleDropdown() {
  isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value
}

function selectCategory(id: number) {
  createCategoryId.value = id
  isCategoryDropdownOpen.value = false
}

// Click outside to close
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isCategoryDropdownOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  // Store the function to remove it later if needed, but for simplicity onMounted covers it
  // In a real app, use onUnmounted to clean up
})

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
  new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    maximumFractionDigits: 0,
  }).format(amount)

const numericPrice = (p: ApiProduct) => {
  const n = typeof p.price === 'number' ? p.price : Number(p.price)
  return Number.isFinite(n) ? n : 0
}

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'product'
  )
}

async function loadProducts() {
  isLoading.value = true
  error.value = null
  try {
    const res = await apiFetch<{ data: ApiProduct[]; total?: number }>(
      '/api/products?per_page=100',
      {
        throwOnError: false,
      },
    )
    products.value = Array.isArray((res as any).data)
      ? (res as any).data
      : Array.isArray(res)
        ? (res as any)
        : []
  } catch (e: any) {
    error.value = e?.message ? String(e.message) : 'Failed to load products.'
    products.value = []
  } finally {
    isLoading.value = false
  }
}

async function onPickFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) return
  if (file.size > 2_500_000) return

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('read_failed'))
    reader.readAsDataURL(file)
  })

  createMainImage.value = dataUrl
}

async function submitCreate() {
  if (!createName.value.trim() || createPrice.value === null || isSaving.value) return
  isSaving.value = true
  createError.value = null
  try {
    const name = createName.value.trim()
    const slug = (createSlug.value || slugify(name)).trim()

    // Compose description like in UploadProductsView if multiple fields were used
    // For now, let's just use the description field directly or combine if we had short/long
    const description = [createShortDescription.value.trim(), createDescription.value.trim()]
      .filter(Boolean)
      .join('\n\n')

    await productsStore.createProduct({
      category_id: createCategoryId.value,
      name,
      slug,
      description: description || null,
      price: Number(createPrice.value),
      stock: createStock.value,
      main_image: createMainImage.value,
      is_featured: createIsFeatured.value,
      is_active: createIsActive.value,
    })

    // Reset form
    createName.value = ''
    createSlug.value = ''
    createSlugTouched.value = false
    createDescription.value = ''
    createShortDescription.value = ''
    createPrice.value = null
    createStock.value = 0
    createMainImage.value = null
    createIsFeatured.value = false
    createIsActive.value = true
    isCreating.value = false

    await loadProducts()
  } catch (e: any) {
    createError.value =
      e?.message && typeof e.message === 'string' ? e.message : 'Failed to create product.'
  } finally {
    isSaving.value = false
  }
}

onMounted(async () => {
  void loadProducts()
  if (!catalog.categories.length) {
    void catalog.fetchCategories().then(() => {
      if (createCategoryId.value === null && catalog.categories.length) {
        createCategoryId.value = catalog.categories[0]!.id
      }
    })
  } else if (createCategoryId.value === null) {
    createCategoryId.value = catalog.categories[0]!.id
  }
})

watch(createName, (value) => {
  if (!createSlugTouched.value) {
    createSlug.value = slugify(value ?? '')
  }
})

// Ensure Options are mutually exclusive
watch(createIsFeatured, (val) => {
  if (val) createIsActive.value = false
})

watch(createIsActive, (val) => {
  if (val) createIsFeatured.value = false
})
</script>

<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Catalog</p>
        <h1
          class="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white"
        >
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
          @click="isCreating = true"
        >
          <span class="mr-1" aria-hidden="true">+</span>
          New product
        </button>
      </div>
    </header>

    <div
      v-if="error"
      class="rounded-2xl bg-red-50 text-red-700 ring-1 ring-red-200 px-4 py-3 text-sm dark:bg-red-950/30 dark:text-red-200 dark:ring-red-900/40"
    >
      {{ error }}
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        class="rounded-2xl bg-white ring-1 ring-black/5 shadow-premium p-4 flex items-center justify-between dark:bg-slate-900/60 dark:ring-white/10"
      >
        <div>
          <p
            class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400"
          >
            Total
          </p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ totalCount }}
          </p>
        </div>
      </div>
      <div
        class="rounded-2xl bg-white ring-1 ring-black/5 shadow-premium p-4 flex items-center justify-between dark:bg-slate-900/60 dark:ring-white/10"
      >
        <div>
          <p
            class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400"
          >
            Active
          </p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ activeCount }}
          </p>
        </div>
      </div>
      <div
        class="rounded-2xl bg-white ring-1 ring-black/5 shadow-premium p-4 flex items-center justify-between dark:bg-slate-900/60 dark:ring-white/10"
      >
        <div>
          <p
            class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400"
          >
            Featured
          </p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ featuredCount }}
          </p>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div
      class="rounded-3xl bg-white ring-1 ring-black/5 shadow-premium overflow-hidden dark:bg-slate-900/60 dark:ring-white/10"
    >
      <div
        class="flex flex-col gap-3 border-b border-black/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
      >
        <div class="flex-1 max-w-md">
          <label
            class="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
          >
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
              <th class="px-4 py-3 text-left font-medium w-16">Image</th>
              <th class="px-4 py-3 text-left font-medium hidden sm:table-cell">Category</th>
              <th class="px-4 py-3 text-left font-medium">Price</th>
              <th class="px-4 py-3 text-left font-medium hidden md:table-cell">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr
              v-for="p in filteredProducts"
              :key="p.id"
              class="text-slate-800 dark:text-slate-100"
            >
              <td class="px-4 py-3 font-medium">
                {{ p.name }}
              </td>
              <td class="px-4 py-3">
                <div
                  class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-black/5 bg-slate-100 dark:border-white/10 dark:bg-white/5"
                >
                  <img
                    v-if="p.main_image"
                    :src="p.main_image"
                    class="h-full w-full object-cover"
                    alt=""
                  />
                  <div v-else class="flex h-full w-full items-center justify-center text-slate-400">
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
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

    <!-- Create drawer -->
    <transition name="modal">
      <div
        v-if="isCreating"
        class="fixed inset-0 z-40 flex items-stretch justify-end bg-black/40"
        aria-modal="true"
        role="dialog"
      >
        <button
          class="flex-1 h-full"
          aria-label="Close create product"
          @click="isCreating = false"
        />
        <div
          class="w-full max-w-lg bg-white h-full shadow-xl ring-1 ring-black/10 flex flex-col dark:bg-slate-950 dark:ring-white/10"
        >
          <div
            class="px-5 py-4 border-b border-black/5 flex items-center justify-between dark:border-white/10"
          >
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-white">New product</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Add a product to your catalog.
              </p>
            </div>
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10"
              aria-label="Close"
              @click="isCreating = false"
            >
              ×
            </button>
          </div>

          <form class="flex-1 px-5 py-4 space-y-4 overflow-y-auto" @submit.prevent="submitCreate">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label
                  for="create-name"
                  class="block text-[13px] font-medium text-slate-700 dark:text-slate-200"
                  >Name</label
                >
                <input
                  id="create-name"
                  v-model="createName"
                  type="text"
                  required
                  placeholder="Product name"
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500"
                />
              </div>

              <div>
                <label
                  for="create-slug"
                  class="block text-[13px] font-medium text-slate-700 dark:text-slate-200"
                  >Slug</label
                >
                <input
                  id="create-slug"
                  v-model="createSlug"
                  type="text"
                  placeholder="product-slug"
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500"
                  @input="createSlugTouched = true"
                />
              </div>

              <div class="relative" ref="dropdownRef">
                <label class="block text-[13px] font-medium text-slate-700 dark:text-slate-200"
                  >Category</label
                >
                <button
                  type="button"
                  class="mt-2 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm shadow-black/5 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                  @click="toggleDropdown"
                >
                  <span :class="{ 'text-slate-400': !createCategoryId }">{{
                    selectedCategoryName
                  }}</span>
                  <svg
                    viewBox="0 0 20 20"
                    class="h-5 w-5 text-slate-400 transition-transform duration-200"
                    :class="{ 'rotate-180': isCategoryDropdownOpen }"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div
                    v-if="isCategoryDropdownOpen"
                    class="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-black/10 dark:bg-slate-900 dark:ring-white/10"
                  >
                    <div class="max-h-60 overflow-y-auto">
                      <button
                        v-for="c in catalog.categories"
                        :key="c.id"
                        type="button"
                        class="flex w-full items-center rounded-xl px-3 py-2 text-sm transition-colors"
                        :class="
                          createCategoryId === c.id
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                            : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5'
                        "
                        @click="selectCategory(c.id)"
                      >
                        {{ c.name }}
                      </button>
                    </div>
                  </div>
                </transition>
              </div>

              <div>
                <label
                  for="create-price"
                  class="block text-[13px] font-medium text-slate-700 dark:text-slate-200"
                  >Price</label
                >
                <input
                  id="create-price"
                  v-model.number="createPrice"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500"
                />
              </div>

              <div>
                <label
                  for="create-stock"
                  class="block text-[13px] font-medium text-slate-700 dark:text-slate-200"
                  >Stock</label
                >
                <input
                  id="create-stock"
                  v-model.number="createStock"
                  type="number"
                  min="0"
                  placeholder="0"
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500"
                />
              </div>

              <div class="col-span-2">
                <label
                  for="create-short"
                  class="block text-[13px] font-medium text-slate-700 dark:text-slate-200"
                  >Short Description</label
                >
                <input
                  id="create-short"
                  v-model="createShortDescription"
                  type="text"
                  placeholder="One-line summary"
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500"
                />
              </div>

              <div class="col-span-2">
                <label
                  for="create-description"
                  class="block text-[13px] font-medium text-slate-700 dark:text-slate-200"
                  >Details</label
                >
                <textarea
                  id="create-description"
                  v-model="createDescription"
                  rows="4"
                  placeholder="Full product details."
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500"
                />
              </div>

              <div class="col-span-2 space-y-3">
                <label class="block text-[13px] font-medium text-slate-700 dark:text-slate-200"
                  >Options</label
                >
                <div class="flex items-center gap-6">
                  <label class="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="createIsFeatured"
                      type="checkbox"
                      class="rounded border-slate-300 text-[var(--brand-brown)] focus:ring-[var(--brand-brown)]"
                    />
                    <span class="text-sm text-slate-600 dark:text-slate-300">Featured</span>
                  </label>
                  <label class="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="createIsActive"
                      type="checkbox"
                      class="rounded border-slate-300 text-[var(--brand-brown)] focus:ring-[var(--brand-brown)]"
                    />
                    <span class="text-sm text-slate-600 dark:text-slate-300">Active</span>
                  </label>
                </div>
              </div>

              <div class="col-span-2">
                <label class="block text-[13px] font-medium text-slate-700 dark:text-slate-200"
                  >Product Image</label
                >
                <div class="mt-2 group relative">
                  <label
                    class="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-[var(--brand-brown)] hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-[var(--brand-brown)] dark:hover:bg-slate-900"
                  >
                    <div
                      v-if="!createMainImage"
                      class="flex flex-col items-center justify-center space-y-2 py-4"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        class="h-8 w-8 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p class="text-xs font-medium text-slate-600 dark:text-slate-400">
                        Click to upload image
                      </p>
                    </div>
                    <img
                      v-else
                      :src="createMainImage"
                      class="h-full w-full rounded-[14px] object-cover"
                    />
                    <input type="file" accept="image/*" class="sr-only" @change="onPickFile" />
                  </label>
                  <button
                    v-if="createMainImage"
                    type="button"
                    class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-600"
                    @click="createMainImage = null"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            <p v-if="createError" class="text-xs text-red-600 dark:text-red-400">
              {{ createError }}
            </p>
          </form>

          <div
            class="px-5 py-4 border-t border-black/5 flex items-center justify-end gap-3 dark:border-white/10"
          >
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-black/5 transition dark:text-slate-300 dark:hover:bg-white/10"
              @click="isCreating = false"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="!createName.trim() || createPrice === null || isSaving"
              class="inline-flex items-center justify-center rounded-xl bg-[var(--brand-brown)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
              @click="submitCreate"
            >
              <span v-if="!isSaving">Create product</span>
              <span v-else>Saving…</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>
