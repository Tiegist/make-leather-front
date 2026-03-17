<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SmartImage from '../components/ui/SmartImage.vue'
import { companyContact, buildTelegramShareUrl, buildWhatsAppOrderUrl } from '../config/contact'
import { useAuthStore } from '../stores/auth'
import { useProductsStore } from '../stores/products'
import { useCatalogStore } from '../stores/catalog'

const selectedCategoryId = ref<number | 'All'>('All')
const selectedProduct = ref<ReturnType<typeof useProductsStore>['items'][number] | null>(null)
const auth = useAuthStore()
const productsStore = useProductsStore()
const catalog = useCatalogStore()

const guestMaxVisible = 9

const visibleProducts = computed(() => productsStore.allProducts)
const hasMore = computed(() => auth.isLoggedIn && productsStore.hasMore)

watch(selectedCategoryId, async () => {
  const categoryId = selectedCategoryId.value === 'All' ? null : selectedCategoryId.value
  await productsStore.fetchFirstPage({ categoryId, perPage: 9 })
})

watch(
  () => auth.isLoggedIn,
  async () => {
    // Re-fetch so guest-only view stays limited in UI usage.
    const categoryId = selectedCategoryId.value === 'All' ? null : selectedCategoryId.value
    await productsStore.fetchFirstPage({ categoryId, perPage: 9 })
  },
)

const money = (amount: number) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'ETB', maximumFractionDigits: 0 }).format(amount)

const productPrice = (p: any) => {
  const n = typeof p.price === 'number' ? p.price : Number(p.price)
  return Number.isFinite(n) ? n : 0
}

const orderMessage = computed(() => {
  if (!selectedProduct.value) return ''
  const p = selectedProduct.value
  const category = p.category?.name ?? 'Leather product'
  return `Hello Make Leather,\n\nI would like to order:\n- ${p.name} (${category})\n- Price: ${money(productPrice(p))}\n\nPlease confirm availability and the ordering process.`
})

const whatsappOrderUrl = computed(() => {
  if (!selectedProduct.value) return '#'
  return buildWhatsAppOrderUrl({ whatsappNumber: companyContact.whatsappNumber, message: orderMessage.value })
})

const telegramOrderUrl = computed(() => {
  if (!selectedProduct.value) return '#'
  return buildTelegramShareUrl({ text: orderMessage.value })
})

void catalog.fetchCategories()
void productsStore.fetchFirstPage({ categoryId: null, perPage: 9 })
</script>

<template>
  <main class="bg-[var(--brand-beige)]">
    <!-- Hero + filter -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-[var(--brand-ink)]"></div>
      <div class="absolute inset-0 bg-center bg-cover opacity-80" style="background-image: url('/images/hero-leather.svg')"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-[var(--brand-ink)]/92 via-[var(--brand-brown)]/38 to-[var(--brand-ink)]/92"></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(60%_55%_at_22%_18%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(55%_55%_at_80%_76%,rgba(255,255,255,0.10),transparent_62%)]"
      ></div>

      <div class="relative">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-18 pb-12">
          <div class="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div class="max-w-2xl text-white animate-fade-up">
              <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/80">Our products</p>
              <h1 class="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
                A premium collection, elegantly organized.
              </h1>
              <p class="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">
                Filter by category and explore structured product cards designed to spotlight leather quality and craft.
              </p>
              <div class="mt-7 grid grid-cols-3 gap-3 max-w-xl">
                <div class="rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm p-5">
                  <p class="text-xs text-white/75">Categories</p>
                  <p class="mt-2 text-sm font-semibold tracking-tight">{{ catalog.categories.length }}</p>
                </div>
                <div class="rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm p-5">
                  <p class="text-xs text-white/75">Products</p>
                  <p class="mt-2 text-sm font-semibold tracking-tight">{{ productsStore.allProducts.length }}</p>
                </div>
                <div class="rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm p-5">
                  <p class="text-xs text-white/75">Style</p>
                  <p class="mt-2 text-sm font-semibold tracking-tight">Premium</p>
                </div>
              </div>
            </div>

            <div class="rounded-3xl bg-white/90 ring-1 ring-black/10 p-6 shadow-premium backdrop-blur-xl">
              <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Filter</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  class="px-3 py-2 rounded-2xl text-sm font-semibold transition ring-1"
                  :class="
                    selectedCategoryId === 'All'
                      ? 'bg-[var(--brand-brown)] text-white ring-black/10'
                      : 'bg-white text-slate-700 ring-black/10 hover:bg-black/5'
                  "
                  @click="selectedCategoryId = 'All'"
                >
                  All
                </button>
                <button
                  v-for="cat in catalog.categories"
                  :key="cat.id"
                  type="button"
                  class="px-3 py-2 rounded-2xl text-sm font-semibold transition ring-1 ring-black/10"
                  :class="
                    selectedCategoryId === cat.id ? 'bg-[var(--brand-brown)] text-white' : 'bg-white text-slate-700 hover:bg-black/5'
                  "
                  @click="selectedCategoryId = cat.id"
                >
                  {{ cat.name }}
                </button>
              </div>
              <p class="mt-4 text-xs text-slate-500">
                Showing <span class="font-semibold text-slate-700">{{ productsStore.allProducts.length }}</span> items
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Grid -->
    <section class="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-16">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(p, idx) in visibleProducts"
          :key="p.id"
          class="group rounded-3xl bg-white ring-1 ring-black/5 shadow-premium overflow-hidden hover-lift animate-fade-up"
          :style="{ animationDelay: `${Math.min(idx * 55, 260)}ms` }"
        >
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden">
            <div class="h-full w-full transition duration-700 ease-out group-hover:scale-[1.04]">
              <SmartImage :src="p.main_image || '/images/products/accessory-01.svg'" :alt="p.name" fallback-label="Product" />
            </div>
          </div>

          <div class="p-6">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm font-semibold tracking-tight text-slate-900 truncate">{{ p.name }}</p>
                <p class="mt-1 text-xs text-slate-500">{{ p.category?.name ?? 'Uncategorized' }}</p>
              </div>
              <p class="shrink-0 text-sm font-semibold tracking-tight text-slate-900">
                {{ money(productPrice(p)) }}
              </p>
            </div>

            <p class="mt-2 text-sm text-slate-600 leading-relaxed">
              {{ (p.description ?? '').slice(0, 120) || 'Premium leather piece with refined finishing and durability.' }}
            </p>

            <button
              type="button"
              class="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition duration-200 ease-out hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
              @click="selectedProduct = p"
            >
              View Details
            </button>
          </div>
        </article>
      </div>

      <div class="mt-10 flex flex-col items-center gap-4">
        <button
          v-if="hasMore"
          type="button"
          class="inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition duration-200 ease-out hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
          @click="productsStore.fetchNextPage()"
        >
          See more
        </button>

        <div v-else-if="!auth.isLoggedIn && productsStore.allProducts.length >= guestMaxVisible" class="text-center">
          <p class="text-sm text-slate-600">
            Log in to see the full catalog and unlock more products.
          </p>
          <RouterLink
            to="/login"
            class="mt-2 inline-flex items-center justify-center rounded-2xl bg-white ring-1 ring-black/5 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-premium hover:bg-black/5 transition"
          >
            Login to view more
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Details modal -->
    <Transition name="modal">
      <div v-if="selectedProduct" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/55" @click="selectedProduct = null"></div>
        <div class="relative h-full w-full grid place-items-center px-5 py-10">
          <div class="modal-panel w-full max-w-3xl rounded-3xl bg-white shadow-premium ring-1 ring-black/10 overflow-hidden">
            <div class="grid lg:grid-cols-2">
              <div class="aspect-[4/3] lg:aspect-auto bg-slate-100">
                <SmartImage
                  :src="selectedProduct.main_image || '/images/products/accessory-01.svg'"
                  :alt="selectedProduct.name"
                  fallback-label="Product image"
                />
              </div>
              <div class="p-8">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">
                      {{ selectedProduct.category?.name ?? 'Uncategorized' }}
                    </p>
                    <h3 class="mt-2 text-xl font-semibold tracking-tight text-slate-900">{{ selectedProduct.name }}</h3>
                    <p class="mt-2 text-sm font-semibold text-slate-900">
                      {{ money(productPrice(selectedProduct)) }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5 hover:bg-black/10 transition"
                    aria-label="Close"
                    @click="selectedProduct = null"
                  >
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>

                <p class="mt-4 text-sm text-slate-600 leading-relaxed">
                  {{ selectedProduct.description || 'Premium leather product with refined finishing and durability.' }}
                </p>

                <div class="mt-6 rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-6">
                  <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Order this product</p>
                  <p class="mt-2 text-sm text-slate-700 leading-relaxed">
                    Contact us to order <span class="font-semibold">{{ selectedProduct.name }}</span>. We’ll confirm availability and delivery.
                  </p>

                  <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                      :href="whatsappOrderUrl"
                      target="_blank"
                      rel="noopener"
                      class="inline-flex items-center justify-center rounded-2xl bg-[#1f2a22] px-4 py-3 text-sm font-semibold text-white shadow-premium hover:brightness-[1.06] transition duration-200 ease-out hover:-translate-y-[1px]"
                    >
                      WhatsApp
                    </a>
                    <a
                      :href="telegramOrderUrl"
                      target="_blank"
                      rel="noopener"
                      class="inline-flex items-center justify-center rounded-2xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white shadow-premium hover:brightness-[1.06] transition duration-200 ease-out hover:-translate-y-[1px]"
                    >
                      Telegram
                    </a>
                    <a
                      :href="`tel:${companyContact.phone}`"
                      class="inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] transition duration-200 ease-out hover:-translate-y-[1px]"
                    >
                      Call
                    </a>
                  </div>

                  <p class="mt-4 text-xs text-slate-500">
                    Phone: <a class="hover:underline underline-offset-4" :href="`tel:${companyContact.phone}`">{{ companyContact.phone }}</a>
                  </p>
                </div>

                <div class="mt-7 grid grid-cols-2 gap-3">
                  <div class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-5">
                    <p class="text-xs text-slate-500">Finish</p>
                    <p class="mt-2 text-sm font-semibold tracking-tight text-slate-900">Refined</p>
                  </div>
                  <div class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-5">
                    <p class="text-xs text-slate-500">Build</p>
                    <p class="mt-2 text-sm font-semibold tracking-tight text-slate-900">Durable</p>
                  </div>
                </div>

                <button
                  type="button"
                  class="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition duration-200 ease-out hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
                  @click="selectedProduct = null"
                >
                  Back to products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

