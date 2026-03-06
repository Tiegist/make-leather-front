<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <section class="rounded-3xl bg-white ring-1 ring-black/5 shadow-premium p-8 dark:bg-slate-900/60 dark:ring-white/10">
    <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400">Admin</p>
    <h1 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{{ title }}</h1>
    <p v-if="subtitle" class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ subtitle }}</p>
    <p class="mt-6 text-sm text-slate-600 dark:text-slate-300">Coming soon.</p>
  </section>
</template>

