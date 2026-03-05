<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const canSubmit = computed(() => email.value.trim().length > 0 && password.value.length > 0)

async function onSubmit() {
  if (!canSubmit.value) return
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/products'
  await auth.login({ email: email.value.trim(), password: password.value })
  void router.push(redirect)
}
</script>

<template>
  <main class="bg-[var(--brand-beige)]">
    <section class="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-12 pb-14">
      <div class="flex items-center justify-between gap-4">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 rounded-2xl bg-white ring-1 ring-black/5 px-4 py-2 text-sm font-semibold text-slate-800 shadow-premium hover:bg-black/5 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.20)]"
        >
          <span aria-hidden="true">←</span>
          Back to Home
        </RouterLink>

        <RouterLink
          to="/products"
          class="hidden sm:inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
        >
          Explore Products
        </RouterLink>
      </div>

      <div class="mt-8 rounded-[2rem] overflow-hidden bg-white ring-1 ring-black/5 shadow-premium">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Visual side (contained) -->
          <section class="relative overflow-hidden min-h-[260px] lg:min-h-[560px]">
            <div class="absolute inset-0 bg-[#0b0a08]"></div>
            <div class="absolute inset-0 bg-center bg-cover opacity-95" style="background-image: url('/images/hero-leather.svg')"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-[#0b0a08]/85 via-[#5a3a2b]/55 to-[#0b0a08]/92"></div>
            <div
              class="absolute inset-0 bg-[radial-gradient(65%_55%_at_22%_18%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(55%_55%_at_76%_72%,rgba(255,255,255,0.12),transparent_62%)]"
            ></div>

            <div class="relative h-full p-8 sm:p-10 text-white flex flex-col justify-between">
              <div class="inline-flex items-center gap-3">
                <span class="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 text-[11px] font-semibold tracking-[0.18em]">
                  ML
                </span>
                <div class="leading-tight">
                  <p class="text-sm font-semibold tracking-tight">Make Leather</p>
                  <p class="text-xs text-white/75 -mt-0.5">Premium leather goods</p>
                </div>
              </div>

              <div class="max-w-xl">
                <p class="text-xs font-medium tracking-[0.18em] text-white/80 uppercase">Premium portfolio access</p>
                <h1 class="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Crafted for Elegance</h1>
                <p class="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                  Sign in to manage your portfolio and product showcase with a polished, brand-consistent experience.
                </p>
              </div>

              <div class="hidden lg:flex items-center gap-3 text-xs text-white/75">
                <span class="inline-flex h-7 items-center rounded-full bg-white/10 ring-1 ring-white/15 px-3">Refined UI</span>
                <span class="inline-flex h-7 items-center rounded-full bg-white/10 ring-1 ring-white/15 px-3">Secure</span>
                <span class="inline-flex h-7 items-center rounded-full bg-white/10 ring-1 ring-white/15 px-3">Fast</span>
              </div>
            </div>
          </section>

          <!-- Form side -->
          <section class="bg-[#fbfaf9] flex items-center justify-center p-8 sm:p-10">
            <div class="w-full max-w-md">
              <div class="text-center">
                <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Login</p>
                <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h2>
                <p class="mt-2 text-sm text-slate-600">Sign in to manage your portfolio and products.</p>
              </div>

              <form class="mt-7 space-y-5" @submit.prevent="onSubmit">
                <div>
                  <label for="email" class="block text-[13px] font-medium text-slate-700">Email</label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    autocomplete="username"
                    required
                    placeholder="you@company.com"
                    class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[#5a3a2b] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                  />
                </div>

                <div>
                  <label for="password" class="block text-[13px] font-medium text-slate-700">Password</label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    placeholder="••••••••••••"
                    class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[#5a3a2b] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                  />
                </div>

                <button
                  type="submit"
                  :disabled="!canSubmit"
                  class="w-full inline-flex items-center justify-center rounded-xl bg-[#5a3a2b] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(90,58,43,0.85)] transition duration-200 ease-out hover:brightness-[1.06] active:brightness-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Log in
                </button>

                <p class="pt-1 text-center text-xs text-slate-500">
                  By continuing, you agree to a polished, brand-consistent experience.
                </p>

                <p class="pt-2 text-center text-xs text-slate-600">
                  Don’t have an account?
                  <RouterLink
                    to="/register"
                    class="font-semibold text-[#5a3a2b] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(90,58,43,0.35)] rounded"
                  >
                    Create one
                  </RouterLink>
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>
