<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)
const auth = useAuthStore()
const router = useRouter()

const passwordsMatch = computed(() => password.value.length > 0 && password.value === confirmPassword.value)

const passwordScore = computed(() => {
  const p = password.value
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return score
})

const passwordLabel = computed(() => {
  if (password.value.length === 0) return '—'
  if (passwordScore.value <= 1) return 'Weak'
  if (passwordScore.value === 2) return 'Fair'
  if (passwordScore.value === 3) return 'Good'
  return 'Strong'
})

const canSubmit = computed(() => {
  return (
    name.value.trim().length > 0 &&
    email.value.trim().length > 0 &&
    password.value.length > 0 &&
    confirmPassword.value.length > 0 &&
    passwordsMatch.value
  )
})

async function onSubmit() {
  if (!canSubmit.value || isSubmitting.value) return
  isSubmitting.value = true
  try {
    await auth.register({
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
      password_confirmation: confirmPassword.value,
    })
    void router.push('/products')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="bg-[var(--brand-beige)]">
    <section class="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-12 pb-14">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 rounded-2xl bg-white ring-1 ring-black/5 px-4 py-2 text-sm font-semibold text-slate-800 shadow-premium hover:bg-black/5 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.20)]"
      >
        <span aria-hidden="true">←</span>
        Back to Home
      </RouterLink>

      <div class="mt-8 relative rounded-[2rem] overflow-hidden bg-white ring-1 ring-black/5 shadow-premium">
        <!-- Soft background (contained) -->
        <div class="absolute inset-0 bg-[#0b0a08]"></div>
        <div class="absolute inset-0 bg-center bg-cover opacity-70" style="background-image: url('/images/hero-leather.svg')"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-[#0b0a08]/85 via-[#5a3a2b]/38 to-[#0b0a08]/90"></div>
        <div
          class="absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(55%_55%_at_80%_76%,rgba(255,255,255,0.10),transparent_62%)]"
        ></div>

        <div class="relative px-6 py-10 sm:px-10 sm:py-12">
          <div
            class="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(540px,640px)_minmax(0,1fr)] gap-8 lg:gap-10 items-center"
          >
          <!-- Left features -->
          <aside class="hidden lg:block text-white">
            <div class="max-w-sm space-y-4">
              <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/80">Why join</p>
              <h2 class="text-2xl font-semibold tracking-tight">A premium home for leather products.</h2>
              <p class="text-sm text-white/75 leading-relaxed">
                Build a portfolio that feels crafted—clean presentation, consistent brand tone, and product-focused
                storytelling.
              </p>

              <div class="rounded-3xl bg-white/10 ring-1 ring-white/15 p-5 backdrop-blur-sm">
                <div class="space-y-3 text-sm">
                  <div class="flex items-start gap-3">
                    <span class="mt-0.5 h-5 w-5 rounded-full bg-white/10 ring-1 ring-white/15"></span>
                    <div>
                      <p class="font-semibold tracking-tight">Curated collections</p>
                      <p class="mt-0.5 text-xs text-white/75 leading-relaxed">Highlight best-sellers with quiet polish.</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="mt-0.5 h-5 w-5 rounded-full bg-white/10 ring-1 ring-white/15"></span>
                    <div>
                      <p class="font-semibold tracking-tight">Brand consistency</p>
                      <p class="mt-0.5 text-xs text-white/75 leading-relaxed">Typography and spacing tuned for premium.</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="mt-0.5 h-5 w-5 rounded-full bg-white/10 ring-1 ring-white/15"></span>
                    <div>
                      <p class="font-semibold tracking-tight">Product-first layouts</p>
                      <p class="mt-0.5 text-xs text-white/75 leading-relaxed">Let leather texture and detail shine.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <!-- Center content -->
          <div class="w-full">

          <div
            class="rounded-3xl bg-white/90 shadow-[0_30px_90px_-55px_rgba(15,23,42,0.65)] ring-1 ring-black/10 backdrop-blur-xl px-8 py-9 sm:px-10 sm:py-10"
          >
            <div class="flex items-center justify-center">
              <RouterLink
                to="/"
                class="inline-flex items-center gap-3 rounded-2xl bg-slate-900/5 ring-1 ring-black/10 px-3 py-2 text-slate-900 hover:bg-slate-900/10 transition"
              >
                <span
                  class="grid h-8 w-8 place-items-center rounded-xl bg-[#5a3a2b] text-[11px] font-semibold tracking-[0.18em] text-white shadow-sm"
                >
                  ML
                </span>
                <span class="text-sm font-semibold tracking-tight">Make Leather</span>
              </RouterLink>
            </div>

            <div class="text-center">
              <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Join Us</p>
              <h1 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                Create your account
              </h1>
              <p class="mt-2 text-sm text-slate-600">
                Start building a premium portfolio and showcase leather products with confidence.
              </p>
            </div>

            <form class="mt-7 space-y-4" @submit.prevent="onSubmit">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-[13px] font-medium text-slate-700">Name</label>
                  <input
                    id="name"
                    v-model="name"
                    type="text"
                    autocomplete="name"
                    required
                    placeholder="Your name"
                    class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[#5a3a2b] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                  />
                </div>

                <div>
                  <label for="email" class="block text-[13px] font-medium text-slate-700">Email</label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    autocomplete="email"
                    required
                    placeholder="you@company.com"
                    class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[#5a3a2b] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="password" class="block text-[13px] font-medium text-slate-700">Password</label>
                  <div class="relative mt-2">
                    <input
                      id="password"
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      required
                      placeholder="Create a password"
                      class="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[#5a3a2b] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-500 hover:text-slate-700 transition"
                      :aria-label="showPassword ? 'Hide password' : 'Show password'"
                      @click="showPassword = !showPassword"
                    >
                      <svg v-if="!showPassword" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.75"
                          d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.75"
                          d="M12 15.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
                        />
                      </svg>
                      <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.75"
                          d="M3.53 4.53 19.47 20.47M10.75 10.75a3.25 3.25 0 0 0 4.5 4.5M8.12 8.12C6.16 9.34 4.77 11.2 4.25 12c.52.8 1.91 2.66 3.87 3.88C9.43 16.72 10.65 17.25 12 17.25c1.35 0 2.57-.53 3.88-1.37 1.96-1.22 3.35-3.08 3.87-3.88-.33-.52-1.07-1.57-2.16-2.6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label for="confirmPassword" class="block text-[13px] font-medium text-slate-700">
                    Confirm
                  </label>
                  <div class="relative mt-2">
                    <input
                      id="confirmPassword"
                      v-model="confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      required
                      placeholder="Repeat password"
                      class="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[#5a3a2b] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-500 hover:text-slate-700 transition"
                      :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <svg v-if="!showConfirmPassword" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.75"
                          d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.75"
                          d="M12 15.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
                        />
                      </svg>
                      <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.75"
                          d="M3.53 4.53 19.47 20.47M10.75 10.75a3.25 3.25 0 0 0 4.5 4.5M8.12 8.12C6.16 9.34 4.77 11.2 4.25 12c.52.8 1.91 2.66 3.87 3.88C9.43 16.72 10.65 17.25 12 17.25c1.35 0 2.57-.53 3.88-1.37 1.96-1.22 3.35-3.08 3.87-3.88-.33-.52-1.07-1.57-2.16-2.6"
                        />
                      </svg>
                    </button>
                  </div>

                  <p v-if="confirmPassword.length > 0 && !passwordsMatch" class="mt-2 text-xs text-rose-700">
                    Passwords don’t match.
                  </p>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <p class="text-xs text-slate-600">Strength: <span class="font-semibold">{{ passwordLabel }}</span></p>
                <div class="flex items-center gap-1.5">
                  <span
                    v-for="i in 4"
                    :key="i"
                    class="h-1.5 w-7 rounded-full"
                    :class="i <= passwordScore ? 'bg-[#5a3a2b]' : 'bg-slate-200'"
                  ></span>
                </div>
              </div>

              <button
                type="submit"
                :disabled="!canSubmit"
                class="w-full inline-flex items-center justify-center rounded-xl bg-[#5a3a2b] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(90,58,43,0.85)] transition duration-200 ease-out hover:brightness-[1.06] active:brightness-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span v-if="!isSubmitting">Create Account</span>
                <span v-else class="inline-flex items-center gap-2">
                  <span class="h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin"></span>
                  Creating
                </span>
              </button>

              <p class="pt-1 text-center text-xs text-slate-600">
                Already have an account?
                <RouterLink
                  to="/login"
                  class="font-semibold text-[#5a3a2b] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(90,58,43,0.35)] rounded"
                >
                  Log in
                </RouterLink>
              </p>
            </form>
          </div>

          </div>

          <!-- Right features -->
          <aside class="hidden lg:block text-white">
            <div class="max-w-sm ms-auto">
              <div class="rounded-3xl bg-white/10 ring-1 ring-white/15 p-6 backdrop-blur-sm space-y-4">
                <div>
                  <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/80">What you get</p>
                  <p class="mt-3 text-sm font-semibold tracking-tight">A portfolio that feels handcrafted.</p>
                  <p class="mt-2 text-xs text-white/75 leading-relaxed">
                    Clean presentation that keeps the focus on leather quality and product detail.
                  </p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="rounded-3xl bg-white/10 ring-1 ring-white/15 p-5">
                    <p class="text-2xl font-semibold tracking-tight">24/7</p>
                    <p class="mt-1 text-xs text-white/75">Always-on presence</p>
                  </div>
                  <div class="rounded-3xl bg-white/10 ring-1 ring-white/15 p-5">
                    <p class="text-2xl font-semibold tracking-tight">+3</p>
                    <p class="mt-1 text-xs text-white/75">Product lines</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        </div>
      </div>
    </section>
  </main>
</template>
