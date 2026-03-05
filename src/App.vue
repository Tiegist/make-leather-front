<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import SiteNavbar from './components/layout/SiteNavbar.vue'
import SiteFooter from './components/layout/SiteFooter.vue'

const route = useRoute()
const showChrome = computed(() => route.meta?.layout !== 'blank')
</script>

<template>
  <div class="min-h-screen bg-[var(--brand-beige)]">
    <SiteNavbar v-if="showChrome" />
    <RouterView />
    <SiteFooter v-if="showChrome" />
  </div>
</template>

