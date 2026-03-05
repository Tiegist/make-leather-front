<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useProductsStore } from '../stores/products'
import { useCatalogStore } from '../stores/catalog'

const auth = useAuthStore()
const productsStore = useProductsStore()
const catalog = useCatalogStore()
const router = useRouter()

const name = ref('')
const categoryId = ref<number | null>(null)
const price = ref<number | null>(null)
const shortDescription = ref('')
const details = ref('')
const tags = ref('')
const imageDataUrl = ref<string>('/images/products/accessory-01.svg')

const canSubmit = computed(() => {
  return (
    auth.isAdmin &&
    name.value.trim().length > 0 &&
    shortDescription.value.trim().length > 0 &&
    details.value.trim().length > 0 &&
    typeof price.value === 'number' &&
    price.value > 0
  )
})

async function onPickFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) return
  if (file.size > 2_500_000) return // keep storage reasonable

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('read_failed'))
    reader.readAsDataURL(file)
  })

  imageDataUrl.value = dataUrl
}

async function onSubmit() {
  if (!canSubmit.value) return
  const tagList = tags.value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  const composedDescription = [
    shortDescription.value.trim(),
    details.value.trim(),
    tagList.length ? `Tags: ${tagList.join(', ')}` : '',
  ]
    .filter(Boolean)
    .join('\n\n')

  await productsStore.createProduct({
    category_id: categoryId.value,
    name: name.value.trim(),
    description: composedDescription,
    price: Number(price.value),
    main_image: imageDataUrl.value,
    is_active: true,
    is_featured: false,
    stock: 0,
  })

  void router.push('/products')
}

void catalog.fetchCategories().then(() => {
  if (categoryId.value === null && catalog.categories.length) {
    categoryId.value = catalog.categories[0]!.id
  }
})
</script>

<template>
  <main class="bg-[var(--brand-beige)]">
    <section class="mx-auto max-w-7xl px-5 sm:px-8 pt-12 sm:pt-14 pb-16">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Admin</p>
          <h1 class="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Upload products</h1>
          <p class="mt-3 text-sm text-slate-600 max-w-2xl leading-relaxed">
            Add new products to the catalog. Uploaded items are saved in this browser and will appear immediately in the
            gallery.
          </p>
        </div>

        <RouterLink
          to="/products"
          class="hidden sm:inline-flex items-center justify-center rounded-2xl bg-white ring-1 ring-black/5 px-5 py-3 text-sm font-semibold text-slate-900 shadow-premium hover:bg-black/5 transition"
        >
          View products
        </RouterLink>
      </div>

      <div v-if="!auth.isAdmin" class="mt-10 rounded-3xl bg-white ring-1 ring-black/5 p-8 shadow-premium">
        <p class="text-sm font-semibold text-slate-900">Admin access required</p>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed">
          Only admin users can upload products.
        </p>
        <RouterLink
          to="/login"
          class="mt-6 inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] transition"
        >
          Login
        </RouterLink>
      </div>

      <div v-else class="mt-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <div class="rounded-3xl bg-white ring-1 ring-black/5 p-8 shadow-premium">
          <form class="space-y-5" @submit.prevent="onSubmit">
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="block text-[13px] font-medium text-slate-700" for="name">Product name</label>
                <input
                  id="name"
                  v-model="name"
                  required
                  placeholder="e.g., Heritage Leather Belt"
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                />
              </div>

              <div>
                <label class="block text-[13px] font-medium text-slate-700" for="category">Category</label>
                <select
                  id="category"
                  v-model.number="categoryId"
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 outline-none transition duration-200 ease-out focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                >
                  <option v-for="c in catalog.categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
              <div class="md:col-span-2">
                <label class="block text-[13px] font-medium text-slate-700" for="short">Short description</label>
                <input
                  id="short"
                  v-model="shortDescription"
                  required
                  placeholder="A premium one-line summary for the card."
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                />
              </div>

              <div>
                <label class="block text-[13px] font-medium text-slate-700" for="price">Price</label>
                <div class="mt-2">
                  <input
                    id="price"
                    v-model.number="price"
                    type="number"
                    min="1"
                    step="1"
                    required
                    placeholder="150"
                    class="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-[13px] font-medium text-slate-700" for="details">Details</label>
              <textarea
                id="details"
                v-model="details"
                rows="5"
                required
                placeholder="Write a refined, premium description customers will see in the details modal."
                class="mt-2 block w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
              ></textarea>
            </div>

            <div>
              <label class="block text-[13px] font-medium text-slate-700" for="tags">Tags (comma separated)</label>
              <input
                id="tags"
                v-model="tags"
                placeholder="e.g., Premium grain, Hand-finished"
                class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
              />
            </div>

            <div class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-6">
              <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Product image</p>
              <p class="mt-2 text-sm text-slate-600">Upload an image (max 2.5MB). It will be used in the gallery.</p>
              <input
                type="file"
                accept="image/*"
                class="mt-4 block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-900 file:ring-1 file:ring-black/10 hover:file:bg-black/5"
                @change="onPickFile"
              />
            </div>

            <button
              type="submit"
              :disabled="!canSubmit"
              class="w-full inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition duration-200 ease-out hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Upload product
            </button>
          </form>
        </div>

        <aside class="rounded-3xl bg-white ring-1 ring-black/5 p-7 shadow-premium">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Preview</p>
          <div class="mt-5 rounded-3xl overflow-hidden ring-1 ring-black/5 bg-slate-100">
            <img :src="imageDataUrl" alt="Preview" class="h-56 w-full object-cover" />
          </div>

          <div class="mt-5">
            <p class="text-sm font-semibold tracking-tight text-slate-900">{{ name || 'Product name' }}</p>
            <p class="mt-1 text-xs text-slate-500">
              {{
                (catalog.categories.find((c) => c.id === categoryId)?.name ?? 'Category')
              }}
            </p>
            <p class="mt-3 text-sm text-slate-600 leading-relaxed">
              {{ shortDescription || 'Short description will appear here.' }}
            </p>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

