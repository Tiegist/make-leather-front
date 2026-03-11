import { defineStore } from 'pinia'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type Toast = {
  id: string
  type: ToastType
  message: string
  timeout: number
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    show(input: { message: string; type?: ToastType; timeout?: number }) {
      const message = String(input.message ?? '').trim()
      if (!message) return

      const toast: Toast = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type: input.type ?? 'info',
        message,
        timeout: typeof input.timeout === 'number' ? input.timeout : 4000,
      }

      this.toasts.push(toast)

      if (toast.timeout !== 0 && typeof window !== 'undefined') {
        window.setTimeout(() => this.remove(toast.id), toast.timeout)
      }
    },

    success(message: string, opts?: { timeout?: number }) {
      this.show({ message, type: 'success', timeout: opts?.timeout })
    },

    error(message: string, opts?: { timeout?: number }) {
      this.show({ message, type: 'error', timeout: opts?.timeout ?? 6000 })
    },

    warning(message: string, opts?: { timeout?: number }) {
      this.show({ message, type: 'warning', timeout: opts?.timeout })
    },

    info(message: string, opts?: { timeout?: number }) {
      this.show({ message, type: 'info', timeout: opts?.timeout })
    },

    remove(id: string) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },

    clear() {
      this.toasts = []
    },
  },
})

