<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteNavbar from './components/layout/SiteNavbar.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import AdminSidebar from './components/layout/AdminSidebar.vue'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const auth = useAuthStore()

const layout = computed(() => (route.meta?.layout as string | undefined) ?? 'default')
const isBlankLayout = computed(() => layout.value === 'blank')

// Important: show sidebar for admins across the app, not only on one route.
// We keep login/register (blank layout) without sidebar/nav/footer.
const showAdminShell = computed(() => auth.isAdmin && !isBlankLayout.value)
const showSiteChrome = computed(() => !isBlankLayout.value && !showAdminShell.value)
</script>

<template>
  <div class="min-h-screen bg-[var(--brand-beige)]">
    <template v-if="showAdminShell">
      <div class="md:flex">
        <AdminSidebar />
        <main class="flex-1 min-w-0">
          <RouterView />
        </main>
      </div>
    </template>
    <template v-else>
      <SiteNavbar v-if="showSiteChrome" />
      <RouterView />
      <SiteFooter v-if="showSiteChrome" />
    </template>
  </div>
</template>

