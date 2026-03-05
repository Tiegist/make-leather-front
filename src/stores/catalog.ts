import { defineStore } from 'pinia'
import { apiFetch } from '../lib/api'

export type ApiCategory = {
  id: number
  name: string
  slug: string
  description?: string | null
}

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    categories: [] as ApiCategory[],
    isLoadingCategories: false,
  }),
  actions: {
    async fetchCategories() {
      if (this.isLoadingCategories) return
      this.isLoadingCategories = true
      try {
        this.categories = await apiFetch<ApiCategory[]>('/api/categories')
      } finally {
        this.isLoadingCategories = false
      }
    },
  },
})

