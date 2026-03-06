<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const title = computed(() => (typeof route.meta?.title === 'string' ? route.meta.title : 'Dashboard'))
const subtitle = computed(() =>
  typeof route.meta?.subtitle === 'string'
    ? route.meta.subtitle
    : 'Have a snapshot information of your assets and performance.',
)
</script>

<template>
  <header class="hidden md:block h-16 bg-white border-b border-black/5 dark:bg-slate-950 dark:border-white/10">
    <div class="h-full px-6 flex items-center justify-between gap-4">
      <div class="min-w-0">
        <p class="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          {{ title }}
        </p>
        <p class="text-sm text-slate-500 dark:text-slate-400 -mt-0.5">
          {{ subtitle }}
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-black/5 hover:text-slate-900 transition dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label="Search"
        >
          <svg viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M9 3a6 6 0 104.472 10.03l2.249 2.25a1 1 0 001.414-1.415l-2.25-2.249A6 6 0 009 3zm-4 6a4 4 0 118 0 4 4 0 01-8 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-black/5 hover:text-slate-900 transition dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label="Notifications"
        >
          <svg viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path
              d="M10 2a6 6 0 00-6 6v2.586l-.707.707A1 1 0 004 13h12a1 1 0 00.707-1.707L16 10.586V8a6 6 0 00-6-6z"
            />
            <path d="M10 18a2 2 0 002-2H8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

