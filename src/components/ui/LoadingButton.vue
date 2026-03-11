<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
    disabled?: boolean
    loadingText?: string
  }>(),
  {
    type: 'button',
    loading: false,
    disabled: false,
    loadingText: 'Loading',
  },
)

const attrs = useAttrs()

const isDisabled = computed(() => Boolean(props.disabled || props.loading))
</script>

<template>
  <button :type="props.type" :disabled="isDisabled" v-bind="attrs" :aria-busy="props.loading ? 'true' : 'false'">
    <span v-if="props.loading" class="inline-flex items-center gap-2">
      <span class="h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin"></span>
      <span>{{ props.loadingText }}</span>
    </span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>

