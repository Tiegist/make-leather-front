import { defineStore } from 'pinia'

type ThemeState = {
  dark: boolean
  isBootstrapped: boolean
}

function applyTheme(dark: boolean) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', dark)
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    dark: false,
    isBootstrapped: false,
  }),
  actions: {
    bootstrap() {
      if (this.isBootstrapped) return
      this.isBootstrapped = true
      try {
        const stored = localStorage.getItem('theme')
        this.dark = stored === 'dark'
      } catch {
        this.dark = false
      }
      applyTheme(this.dark)
    },
    toggle() {
      this.dark = !this.dark
      applyTheme(this.dark)
      try {
        localStorage.setItem('theme', this.dark ? 'dark' : 'light')
      } catch {
        // ignore
      }
    },
    setDark(value: boolean) {
      this.dark = Boolean(value)
      applyTheme(this.dark)
      try {
        localStorage.setItem('theme', this.dark ? 'dark' : 'light')
      } catch {
        // ignore
      }
    },
  },
})

