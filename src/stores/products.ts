import { defineStore } from 'pinia'
import { apiFetch } from '../lib/api'
import { useToastStore } from './toast'

export type ApiProductCategory = {
  id: number
  name: string
  slug: string
}

export type ApiProduct = {
  id: number
  category_id: number | null
  name: string
  slug: string
  description: string | null
  price: string | number
  stock: number
  main_image: string | null
  is_featured: boolean
  is_active: boolean
  category?: ApiProductCategory | null
}

type Paginated<T> = {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  next_page_url: string | null
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [] as ApiProduct[],
    page: 1,
    perPage: 9,
    lastPage: 1,
    isLoading: false,
    categoryId: null as number | null,
  }),
  getters: {
    allProducts: (s) => s.items,
    hasMore: (s) => s.page < s.lastPage,
  },
  actions: {
    async fetchFirstPage(opts?: { categoryId?: number | null; perPage?: number }) {
      this.items = []
      this.page = 1
      this.lastPage = 1
      this.categoryId = opts?.categoryId ?? null
      if (typeof opts?.perPage === 'number') this.perPage = opts.perPage
      await this.fetchNextPage()
    },

    async fetchNextPage() {
      if (this.isLoading) return
      if (this.page > this.lastPage) return
      this.isLoading = true
      try {
        const params = new URLSearchParams()
        params.set('page', String(this.page))
        params.set('per_page', String(this.perPage))
        if (this.categoryId) params.set('category_id', String(this.categoryId))

        const res = await apiFetch<Paginated<ApiProduct>>(`/api/products?${params.toString()}`)
        this.items.push(...res.data)
        this.lastPage = res.last_page
        this.page = this.page + 1
      } finally {
        this.isLoading = false
      }
    },

    async createProduct(input: {
      category_id: number | null
      name: string
      slug?: string
      description: string
      price: number
      main_image?: string | null
      is_featured?: boolean
      is_active?: boolean
      stock?: number
    }) {
      const toast = useToastStore()
      try {
        const res = await apiFetch<ApiProduct>('/api/products', {
          method: 'POST',
          json: {
            ...input,
            is_featured: Boolean(input.is_featured),
            is_active: input.is_active ?? true,
            stock: input.stock ?? 0,
          },
        })
        // Optimistically add to top
        this.items.unshift(res)
        toast.success('Product created.')
      } catch (e: any) {
        toast.error(e?.message && typeof e.message === 'string' ? e.message : 'Failed to create product.')
        throw e
      }
    },
  },
})

