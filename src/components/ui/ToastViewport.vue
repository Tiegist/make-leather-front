<script setup lang="ts">
import { useToastStore } from '../../stores/toast'

const toast = useToastStore()
</script>

<template>
  <div
    class="fixed top-4 right-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2 pointer-events-none"
    role="region"
    aria-label="Notifications"
  >
    <TransitionGroup
      tag="div"
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-for="t in toast.toasts"
        :key="t.id"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-premium ring-1 ring-black/5"
        :class="{
          'border-emerald-200': t.type === 'success',
          'border-rose-200': t.type === 'error',
          'border-amber-200': t.type === 'warning',
          'border-sky-200': t.type === 'info',
        }"
        role="status"
        aria-live="polite"
      >
        <div
          class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
          :class="{
            'bg-emerald-500': t.type === 'success',
            'bg-rose-500': t.type === 'error',
            'bg-amber-500': t.type === 'warning',
            'bg-sky-500': t.type === 'info',
          }"
          aria-hidden="true"
        ></div>

        <p class="min-w-0 flex-1 text-sm font-medium text-slate-900">
          {{ t.message }}
        </p>

        <button
          type="button"
          class="inline-flex h-7 w-7 items-center justify-center rounded-xl text-slate-500 hover:bg-black/5 hover:text-slate-700 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.20)]"
          aria-label="Close notification"
          @click="toast.remove(t.id)"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4" aria-hidden="true">
            <path
              d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
            />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

