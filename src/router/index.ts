import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { layout: 'blank' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/upload-products',
      name: 'upload-products',
      component: () => import('../views/UploadProductsView.vue'),
      meta: { requiresAdmin: true, layout: 'admin' },
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: {
        requiresAdmin: true,
        layout: 'admin',
        title: 'Dashboard',
        subtitle: 'Have a snapshot information of your assets and performance.',
      },
    },
    {
      path: '/admin/properties',
      name: 'admin-properties',
      component: () => import('../views/AdminPlaceholderView.vue'),
      props: { title: 'Properties', subtitle: 'Manage your properties and listings.' },
      meta: { requiresAdmin: true, layout: 'admin', title: 'Properties', subtitle: 'Manage your properties and listings.' },
    },
    {
      path: '/admin/customers',
      name: 'admin-customers',
      component: () => import('../views/AdminPlaceholderView.vue'),
      props: { title: 'Customers', subtitle: 'View and manage your customers.' },
      meta: { requiresAdmin: true, layout: 'admin', title: 'Customers', subtitle: 'View and manage your customers.' },
    },
    {
      path: '/admin/sales-marketing',
      name: 'admin-sales-marketing',
      component: () => import('../views/AdminPlaceholderView.vue'),
      props: { title: 'Sales & Marketing', subtitle: 'Track campaigns and sales performance.' },
      meta: {
        requiresAdmin: true,
        layout: 'admin',
        title: 'Sales & Marketing',
        subtitle: 'Track campaigns and sales performance.',
      },
    },
    {
      path: '/admin/plans-performance',
      name: 'admin-plans-performance',
      component: () => import('../views/AdminPlaceholderView.vue'),
      props: { title: 'Plans & Performance', subtitle: 'Review plans, KPIs, and performance.' },
      meta: {
        requiresAdmin: true,
        layout: 'admin',
        title: 'Plans & Performance',
        subtitle: 'Review plans, KPIs, and performance.',
      },
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('../views/AdminCategoriesView.vue'),
      meta: { requiresAdmin: true, layout: 'admin', title: 'Categories', subtitle: 'All categories in your store.' },
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('../views/AdminProductsView.vue'),
      meta: { requiresAdmin: true, layout: 'admin', title: 'Products', subtitle: 'All products in your store.' },
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/AdminUsersView.vue'),
      meta: { requiresAdmin: true, layout: 'admin', title: 'Users', subtitle: 'All registered users.' },
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  await auth.bootstrap()
  if (to.meta?.requiresAdmin && !auth.isAdmin) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router
