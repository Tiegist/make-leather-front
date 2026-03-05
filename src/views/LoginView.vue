<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const password = ref('')

const canSubmit = computed(() => email.value.trim().length > 0 && password.value.length > 0)

function onSubmit() {
  // Hook up to your auth API here.
  // Kept intentionally minimal for a portfolio login screen.
  void canSubmit.value
}
</script>

<template>
  <div class="min-h-screen bg-[#0b0a08]">
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <!-- Visual side -->
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-[#0b0a08]"></div>
        <div
          class="absolute inset-0 bg-center bg-cover"
          style="background-image: url('/images/leather-hero.jpg')"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-br from-[#0b0a08]/85 via-[#5a3a2b]/70 to-[#0b0a08]/90"></div>
        <div
          class="absolute inset-0 bg-[radial-gradient(65%_55%_at_22%_18%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(55%_55%_at_76%_72%,rgba(255,255,255,0.12),transparent_62%)]"
        ></div>
        <div
          class="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:48px_48px]"
        ></div>

        <div
          class="relative h-64 lg:h-full px-6 py-10 sm:px-10 lg:px-12 lg:py-14 text-white flex flex-col justify-between"
        >
          <div class="flex items-center justify-between gap-4">
            <RouterLink
              to="/"
              class="inline-flex items-center gap-3 rounded-2xl bg-white/10 ring-1 ring-white/20 px-3 py-2 backdrop-blur-sm hover:bg-white/15 transition"
            >
              <span
                class="grid h-8 w-8 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 text-[11px] font-semibold tracking-[0.18em]"
              >
                ML
              </span>
              <span class="text-sm font-semibold tracking-tight">Make Leather</span>
            </RouterLink>

            <span class="hidden sm:inline-flex items-center gap-2 text-xs text-white/75">
              <span class="h-1.5 w-1.5 rounded-full bg-white/70"></span>
              Secure sign-in
            </span>
          </div>

          <div class="max-w-xl">
            <p class="text-xs font-medium tracking-[0.18em] text-white/80 uppercase">Premium portfolio access</p>
            <h1 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Showcase products with elegance.
            </h1>
            <p class="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
              Curate your collection, refine your brand story, and keep every detail aligned with a polished, modern
              aesthetic.
            </p>

            <div class="mt-7 hidden lg:flex items-center gap-3 text-xs text-white/75">
              <span class="inline-flex h-7 items-center rounded-full bg-white/10 ring-1 ring-white/15 px-3">
                Crafted UI
              </span>
              <span class="inline-flex h-7 items-center rounded-full bg-white/10 ring-1 ring-white/15 px-3">
                Product-first
              </span>
              <span class="inline-flex h-7 items-center rounded-full bg-white/10 ring-1 ring-white/15 px-3">
                Brand-consistent
              </span>
            </div>
          </div>

          <div class="hidden lg:block">
            <div class="max-w-md rounded-3xl bg-white/10 ring-1 ring-white/15 p-5 backdrop-blur-sm">
              <div class="flex items-center justify-between">
                <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/80">Featured</p>
                <p class="text-xs text-white/70">New collection</p>
              </div>
              <div class="mt-4 rounded-2xl bg-white/10 ring-1 ring-white/10 p-4">
                <p class="text-sm font-semibold tracking-tight">Leather Essentials</p>
                <p class="mt-1 text-xs text-white/75 leading-relaxed">
                  A refined set of product highlights designed to feel premium without distraction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Form side -->
      <section class="bg-[#fbfaf9] flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
        <div class="w-full max-w-md">
          <div
            class="rounded-3xl bg-white shadow-[0_20px_70px_-40px_rgba(15,23,42,0.45)] ring-1 ring-black/5 px-7 py-9 sm:px-9 sm:py-10"
          >
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
            </form>
          </div>

          <p class="mt-6 text-center text-xs text-slate-500">© {{ new Date().getFullYear() }} Make Leather</p>
        </div>
      </section>
    </div>
  </div>
</template>
