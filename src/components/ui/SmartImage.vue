<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  fallbackLabel?: string
}>()

const hasError = ref(false)
</script>

<template>
  <img
    v-if="!hasError"
    :src="props.src"
    :alt="props.alt"
    class="h-full w-full object-cover"
    loading="lazy"
    decoding="async"
    @error="hasError = true"
  />
  <div
    v-else
    class="h-full w-full grid place-items-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 text-slate-500"
    role="img"
    :aria-label="props.alt"
  >
    <span class="text-xs font-medium tracking-[0.18em] uppercase">
      {{ props.fallbackLabel ?? 'Image' }}
    </span>
  </div>
</template>
