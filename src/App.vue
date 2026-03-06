<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteNavbar from './components/layout/SiteNavbar.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import AdminSidebar from './components/layout/AdminSidebar.vue'
import AdminTopbar from './components/layout/AdminTopbar.vue'
import { useAuthStore } from './stores/auth'
import { useThemeStore } from './stores/theme'

const route = useRoute()
const auth = useAuthStore()
const theme = useThemeStore()

const layout = computed(() => (route.meta?.layout as string | undefined) ?? 'default')
const isBlankLayout = computed(() => layout.value === 'blank')

// Important: show sidebar for admins across the app, not only on one route.
// We keep login/register (blank layout) without sidebar/nav/footer.
const showAdminShell = computed(() => auth.isAdmin && !isBlankLayout.value)
const showSiteChrome = computed(() => !isBlankLayout.value && !showAdminShell.value)

onMounted(() => {
  theme.bootstrap()
})
</script>

<template>
  <div class="min-h-screen bg-[var(--brand-beige)] dark:bg-slate-950">
    <template v-if="showAdminShell">
      <div class="md:flex">
        <AdminSidebar />
        <main class="flex-1 min-w-0">
          <AdminTopbar />
          <div class="p-6 md:p-8">
            <RouterView />
          </div>
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

