<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiFetch } from '../lib/api'
import type { ApiUser } from '../stores/auth'

const users = ref<ApiUser[]>([])
const isLoading = ref(false)
const search = ref('')
const error = ref<string | null>(null)

type ExtendedUser = ApiUser & { phone?: string | null; role?: string | null }

const filteredUsers = computed<ExtendedUser[]>(() => {
  const term = search.value.trim().toLowerCase()
  const list = users.value as ExtendedUser[]
  if (!term) return list
  return list.filter((u) => {
    const haystack = `${u.name} ${u.email} ${u.role ?? ''} ${u.phone ?? ''}`.toLowerCase()
    return haystack.includes(term)
  })
})

const totalCount = computed(() => users.value.length)
const adminCount = computed(() => users.value.filter((u) => (u as ExtendedUser).role === 'admin').length)
const guestCount = computed(() => users.value.filter((u) => (u as ExtendedUser).role !== 'admin').length)

const initials = (u: ApiUser) => {
  const source = (u.name || u.email || '').trim()
  if (!source) return 'US'
  const parts = source.split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? 'U'
  const second = (parts.length > 1 ? parts[1]?.[0] : parts[0]?.[1]) ?? ''
  return (first + second).toUpperCase()
}

async function loadUsers() {
  isLoading.value = true
  error.value = null
  try {
    const payload = await apiFetch<ExtendedUser[]>('/api/users', { throwOnError: false })
    if (Array.isArray(payload)) {
      users.value = payload
    } else {
      users.value = []
    }
  } catch (e: any) {
    error.value = e?.message ? String(e.message) : 'Failed to load users.'
    users.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void loadUsers()
})
</script>

<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Team</p>
        <h1 class="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Users
        </h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Manage and review access across your organization.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
        >
          <span class="mr-1" aria-hidden="true">+</span>
          New user
        </button>
      </div>
    </header>

    <div v-if="error" class="rounded-2xl bg-red-50 text-red-700 ring-1 ring-red-200 px-4 py-3 text-sm dark:bg-red-950/30 dark:text-red-200 dark:ring-red-900/40">
      {{ error }}
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="rounded-2xl bg-white ring-1 ring-black/5 shadow-premium p-4 flex items-center justify-between dark:bg-slate-900/60 dark:ring-white/10">
        <div>
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400">Total</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ totalCount }}
          </p>
        </div>
      </div>
      <div class="rounded-2xl bg-white ring-1 ring-black/5 shadow-premium p-4 flex items-center justify-between dark:bg-slate-900/60 dark:ring-white/10">
        <div>
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400">Admins</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ adminCount }}
          </p>
        </div>
      </div>
      <div class="rounded-2xl bg-white ring-1 ring-black/5 shadow-premium p-4 flex items-center justify-between dark:bg-slate-900/60 dark:ring-white/10">
        <div>
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400">Guests</p>
          <p class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ guestCount }}
          </p>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-3xl bg-white ring-1 ring-black/5 shadow-premium overflow-hidden dark:bg-slate-900/60 dark:ring-white/10">
      <div
        class="flex flex-col gap-3 border-b border-black/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
      >
        <div class="flex-1 max-w-md">
          <label class="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Search
          </label>
          <input
            v-model="search"
            type="search"
            placeholder="Filter by name, email, or role"
            class="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition focus:border-[var(--brand-brown)] focus:ring-2 focus:ring-[rgba(90,58,43,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-[var(--brand-brown)]"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th class="px-4 py-3 text-left font-medium">User</th>
              <th class="px-4 py-3 text-left font-medium hidden sm:table-cell">Role</th>
              <th class="px-4 py-3 text-left font-medium hidden sm:table-cell">Phone</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="u in filteredUsers" :key="u.id" class="text-slate-800 dark:text-slate-100">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div
                    class="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
                  >
                    <span class="text-xs font-semibold tracking-[0.12em]">
                      {{ initials(u) }}
                    </span>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold tracking-tight text-slate-900 dark:text-white truncate">
                      {{ u.name }}
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {{ u.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-slate-600 dark:text-slate-300 hidden sm:table-cell">
                {{ (u as any).role ?? '—' }}
              </td>
              <td class="px-4 py-3 text-slate-600 dark:text-slate-300 hidden sm:table-cell">
                {{ (u as any).phone ?? '—' }}
              </td>
            </tr>
            <tr v-if="!isLoading && !filteredUsers.length">
              <td class="px-4 py-6 text-sm text-slate-500 dark:text-slate-400" colspan="3">
                No users found.
              </td>
            </tr>
            <tr v-if="isLoading">
              <td class="px-4 py-6 text-sm text-slate-500 dark:text-slate-400" colspan="3">
                Loading users…
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

