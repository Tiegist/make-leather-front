<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useCatalogStore, type ApiCategory } from '../stores/catalog'
import { apiFetch } from '../lib/api'
import { useToastStore } from '../stores/toast'

const catalog = useCatalogStore()
const toast = useToastStore()

const search = ref('')
const isCreating = ref(false)
const createName = ref('')
const createSlug = ref('')
const createSlugTouched = ref(false)
const createDescription = ref('')
const createError = ref<string | null>(null)
const isSaving = ref(false)

const filteredCategories = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return catalog.categories
  return catalog.categories.filter((c) => {
    const haystack = `${c.name} ${c.slug} ${c.description ?? ''}`.toLowerCase()
    return haystack.includes(term)
  })
})

const totalCount = computed(() => catalog.categories.length)

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'category'
}

async function submitCreate() {
  if (!createName.value.trim() || isSaving.value) return
  isSaving.value = true
  createError.value = null
  try {
    const name = createName.value.trim()
    const slug = (createSlug.value || slugify(name)).trim()
    await apiFetch('/api/categories', {
      method: 'POST',
      json: {
        name,
        slug,
        description: createDescription.value.trim() || null,
        is_active: true,
      },
    })
    createName.value = ''
    createSlug.value = ''
    createSlugTouched.value = false
    createDescription.value = ''
    isCreating.value = false
    await catalog.fetchCategories()
    toast.success('Category created.')
  } catch (e: any) {
    createError.value =
      e?.message && typeof e.message === 'string' ? e.message : 'Failed to create category. Please try again.'
    toast.error(createError.value ?? 'Failed to create category.')
  } finally {
    isSaving.value = false
  }
}

async function toggleActive(cat: ApiCategory) {
  const previous = cat.is_active
  const next = !previous
  cat.is_active = next
  try {
    await apiFetch(`/api/categories/${cat.id}`, {
      method: 'PATCH',
      json: { is_active: next },
    })
    toast.info(`Category ${next ? 'activated' : 'deactivated'}.`)
  } catch {
    cat.is_active = previous
    toast.error('Failed to update category status.')
  }
}

onMounted(() => {
  if (!catalog.categories.length) {
    void catalog.fetchCategories()
  }
})

watch(
  createName,
  (value) => {
    if (!createSlugTouched.value) {
      createSlug.value = slugify(value ?? '')
    }
  },
)
</script>

<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Catalog</p>
        <h1 class="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Categories</h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Browse and organize the categories that structure your collection.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
          @click="isCreating = true"
        >
          <span class="mr-1" aria-hidden="true">+</span>
          New category
        </button>
      </div>
    </header>

    <!-- Summary -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        class="rounded-2xl bg-white ring-1 ring-black/5 shadow-premium p-4 flex items-center justify-between dark:bg-slate-900/60 dark:ring-white/10"
      >
        <div>
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400">
            Total categories
          </p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ totalCount }}
          </p>
        </div>
        <span
          class="grid h-10 w-10 place-items-center rounded-2xl bg-black/5 text-slate-700 ring-1 ring-black/10 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10"
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor">
            <path
              d="M4 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H4zM4 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H4zM12 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM12 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </span>
      </div>
    </div>

    <!-- List / table -->
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
            placeholder="Filter by name, slug, or description"
            class="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-[var(--brand-brown)]"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th class="px-4 py-3 text-left font-medium">Name</th>
              <th class="px-4 py-3 text-left font-medium hidden sm:table-cell">Slug</th>
              <th class="px-4 py-3 text-left font-medium">Description</th>
              <th class="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="cat in filteredCategories" :key="cat.id" class="text-slate-800 dark:text-slate-100">
              <td class="px-4 py-3 font-medium">
                {{ cat.name }}
              </td>
              <td class="px-4 py-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                {{ cat.slug }}
              </td>
              <td class="px-4 py-3 text-slate-600 dark:text-slate-300">
                <span v-if="cat.description && cat.description.length <= 120">
                  {{ cat.description }}
                </span>
                <span v-else-if="cat.description">
                  {{ cat.description.slice(0, 117) }}…
                </span>
                <span v-else class="text-slate-400 dark:text-slate-500">No description</span>
              </td>
              <td class="px-4 py-3">
                <div class="inline-flex items-center gap-3">
                  <span
                    class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
                    :class="
                      cat.is_active
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-100 dark:bg-green-900/30 dark:text-green-200 dark:ring-green-900/60'
                        : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
                    "
                  >
                    {{ cat.is_active ? 'Active' : 'Inactive' }}
                  </span>
                  <button
                    type="button"
                    class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                    :class="cat.is_active ? 'bg-slate-900 dark:bg-white/20' : 'bg-slate-200 dark:bg-slate-700'"
                    @click="toggleActive(cat)"
                  >
                    <span
                      class="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform"
                      :class="cat.is_active ? 'translate-x-4' : 'translate-x-1'"
                    ></span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!catalog.isLoadingCategories && !filteredCategories.length">
              <td class="px-4 py-6 text-sm text-slate-500 dark:text-slate-400" colspan="4">
                No categories found.
              </td>
            </tr>
            <tr v-if="catalog.isLoadingCategories">
              <td class="px-4 py-6 text-sm text-slate-500 dark:text-slate-400" colspan="4">
                Loading categories…
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
        <button class="flex-1 h-full" aria-label="Close create category" @click="isCreating = false" />
        <div
          class="w-full max-w-md bg-white h-full shadow-xl ring-1 ring-black/10 flex flex-col dark:bg-slate-950 dark:ring-white/10"
        >
          <div class="px-5 py-4 border-b border-black/5 flex items-center justify-between dark:border-white/10">
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-white">New category</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Add a category to organize products.
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
            <div>
              <label for="create-name" class="block text-[13px] font-medium text-slate-700 dark:text-slate-200">
                Name
              </label>
              <input
                id="create-name"
                v-model="createName"
                type="text"
                required
                placeholder="Category name"
                class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500"
              />
            </div>

            <div>
              <label for="create-slug" class="block text-[13px] font-medium text-slate-700 dark:text-slate-200">
                Slug
              </label>
              <input
                id="create-slug"
                v-model="createSlug"
                type="text"
                placeholder="category-name"
                class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500"
                @input="createSlugTouched = true"
              />
              <p class="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Used in URLs. Auto-fills from the name but can be edited.
              </p>
            </div>

            <div>
              <label
                for="create-description"
                class="block text-[13px] font-medium text-slate-700 dark:text-slate-200"
              >
                Description
              </label>
              <textarea
                id="create-description"
                v-model="createDescription"
                rows="4"
                placeholder="Optional description for internal context."
                class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500"
              />
            </div>

            <p v-if="createError" class="text-xs text-red-600 dark:text-red-400">
              {{ createError }}
            </p>
          </form>

          <div class="px-5 py-4 border-t border-black/5 flex items-center justify-end gap-3 dark:border-white/10">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-black/5 transition dark:text-slate-300 dark:hover:bg-white/10"
              @click="isCreating = false"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="!createName.trim() || isSaving"
              class="inline-flex items-center justify-center rounded-xl bg-[var(--brand-brown)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
              @click="submitCreate"
            >
              <span v-if="!isSaving">Create category</span>
              <span v-else>Saving…</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

