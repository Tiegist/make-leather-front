<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const address = ref('')
const phone = ref('')
const image = ref<File | null>(null)
const imagePreview = ref<string | null>(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)
const auth = useAuthStore()
const router = useRouter()

const passwordsMatch = computed(() => password.value.length > 0 && password.value === confirmPassword.value)
const canSubmit = computed(() =>
  name.value.trim().length > 0 &&
  email.value.trim().length > 0 &&
  password.value.length >= 8 &&
  passwordsMatch.value
)

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

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    image.value = target.files[0]
    imagePreview.value = URL.createObjectURL(target.files[0])
  }
}

async function onSubmit() {
  if (!canSubmit.value || isSubmitting.value) return
  isSubmitting.value = true
  errorMessage.value = null
  try {
    await auth.register({
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
      password_confirmation: confirmPassword.value,
      address: address.value.trim(),
      phone: phone.value.trim(),
      image: image.value,
      role: 'Guest'
    })
    void router.push('/login')
  } catch (err: any) {
    console.error('Registration error:', err)
    if (err && err.details && err.details.errors) {
      // Handle Laravel structured validation errors
      const firstError = Object.values(err.details.errors)[0]
      errorMessage.value = Array.isArray(firstError) ? firstError[0] : String(firstError)
    } else if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
      errorMessage.value = err.message
    } else {
      errorMessage.value = 'Registration failed. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Optional: Re-trigger on scroll back
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>

<template>
  <main class="min-h-screen bg-[var(--brand-beige)] relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
    <!-- Top-left organic shape (swapped blue for brown) -->
    <div class="absolute top-0 left-0 w-[40%] h-[40%] pointer-events-none z-0 reveal reveal-fade-up">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-full fill-[var(--brand-brown)] opacity-40">
        <path d="M0,0 L200,0 C300,0 400,100 400,200 C400,300 300,400 150,400 C80,400 0,320 0,250 L0,0 Z" />
      </svg>
    </div>

    <!-- Background Blobs -->
    <div class="absolute -top-20 -left-20 w-80 h-80 bg-[var(--brand-brown)] rounded-full blur-[80px] opacity-10 animate-hero-shimmer"></div>
    <div class="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[rgba(184,155,94,0.15)] rounded-full blur-[100px] animate-hero-shimmer"></div>
    <div class="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[rgba(90,58,43,0.12)] rounded-full blur-[100px] animate-hero-shimmer" style="animation-delay: -5s"></div>
    <div class="absolute top-[20%] right-[10%] w-[25%] h-[25%] bg-[rgba(11,10,8,0.05)] rounded-full blur-[80px]"></div>

    <section class="relative w-full max-w-5xl bg-white/45 backdrop-blur-2xl ring-1 ring-black/5 shadow-[0_40px_100px_-40px_rgba(15,23,42,0.2)] rounded-[2.5rem] overflow-hidden grid lg:grid-cols-2 min-h-[600px] z-10">

      <!-- Left Side: Branding & Info -->
      <div class="hidden lg:flex flex-col justify-center items-end p-8 lg:pr-16 relative overflow-hidden bg-gradient-to-br from-[var(--brand-brown)] to-[var(--brand-ink)]">
        <!-- Decorative elements -->
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-hero-shimmer"></div>
        <div class="absolute bottom-1/4 right-0 w-32 h-32 bg-[var(--brand-gold)]/15 rounded-full blur-2xl"></div>

        <div class="relative z-10 text-center reveal reveal-fade-left">
          <RouterLink to="/" class="inline-flex items-center gap-2 group justify-end">
            <div class="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-[10px] font-bold tracking-widest shadow-lg group-hover:scale-105 transition-transform duration-500">ML</div>
            <span class="text-base font-bold tracking-tight text-white/90">Make Leather</span>
          </RouterLink>

          <div class="mt-16 space-y-4">
            <h2 class="text-3xl font-bold tracking-tight text-white leading-tight">
              Fast, Efficient and <br/> <span class="text-[var(--brand-gold)]">Productive</span>
            </h2>
            <p class="text-sm leading-relaxed max-w-[300px] border-r-3 border-[var(--brand-gold)]/50 pr-5 py-1 ml-auto text-white/70">
              Create a premium portfolio that captures the essence of your craftsmanship in minutes.
            </p>
          </div>
        </div>
      </div>

      <!-- Right Side: Form -->
      <div class="p-6 sm:p-8 lg:pl-16 flex flex-col justify-center bg-white/60 relative z-10 transition-all duration-700">
        <div class="w-full max-w-[480px] reveal reveal-fade-right">
          <header class="text-left mb-6">
            <h1 class="text-2xl font-bold tracking-tight text-[var(--brand-ink)]">Sign Up</h1>
            <p class="text-slate-500 text-xs mt-1">Your Social Campaigns</p>
          </header>

          <form class="space-y-4" @submit.prevent="onSubmit">
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-sm font-semibold text-slate-700 ml-1">Name</label>
                  <input
                    id="name"
                    v-model="name"
                    type="text"
                    required
                    placeholder="Full name"
                    class="mt-1.5 block w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:bg-white focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.1)] outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label for="phone" class="block text-sm font-semibold text-slate-700 ml-1">Phone</label>
                  <input
                    id="phone"
                    v-model="phone"
                    type="tel"
                    placeholder="+1 234..."
                    class="mt-1.5 block w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:bg-white focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.1)] outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-semibold text-slate-700 ml-1">Email</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  class="mt-1.5 block w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:bg-white focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.1)] outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label for="address" class="block text-sm font-semibold text-slate-700 ml-1">Address</label>
                <input
                  id="address"
                  v-model="address"
                  type="text"
                  placeholder="Street, City, Country"
                  class="mt-1.5 block w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:bg-white focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.1)] outline-none transition-all duration-300"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="password" class="block text-sm font-semibold text-slate-700 ml-1">Password</label>
                  <div class="relative mt-1.5">
                    <input
                      id="password"
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      placeholder="Min 8 chars"
                      class="block w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-3 pr-11 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:bg-white focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.1)] outline-none transition-all duration-300"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-slate-600 transition-colors"
                      @click="showPassword = !showPassword"
                    >
                      <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      <svg v-else viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M3 3l18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label for="confirmPassword" class="block text-sm font-semibold text-slate-700 ml-1">Confirm</label>
                  <div class="relative mt-1.5">
                    <input
                      id="confirmPassword"
                      v-model="confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      required
                      placeholder="Confirm"
                      class="block w-full rounded-2xl border border-slate-200 bg-white/50 px-5 py-3 pr-11 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:bg-white focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.1)] outline-none transition-all duration-300"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-slate-600 transition-colors"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <svg v-if="!showConfirmPassword" viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      <svg v-else viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M3 3l18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Profile Image Upload at bottom -->
              <div class="flex items-center gap-6 p-4 rounded-2xl bg-white/40 ring-1 ring-black/5 mt-2">
                <label class="relative group cursor-pointer flex-shrink-0">
                  <div class="w-16 h-16 rounded-xl bg-white/50 border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center group-hover:border-[var(--brand-brown)] transition-colors">
                    <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
                    <svg v-else viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-slate-400 group-hover:text-[var(--brand-brown)]"><path d="M12 16v-8m0 0l-3 3m3-3l3 3m-9 5h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <input type="file" class="hidden" @change="onFileChange" accept="image/*" />
                </label>
                <div class="flex-1">
                  <p class="text-xs font-bold text-[var(--brand-ink)] uppercase tracking-widest">Image</p>
                  <p class="text-[10px] text-slate-500 mt-1">Click the icon to upload a picture.</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 pt-2">
              <button type="button" class="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-slate-200 bg-white/50 text-xs font-semibold text-slate-700 hover:bg-white hover:border-[var(--brand-brown)]/30 transition-all">
                <svg class="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Sign Up with Google
              </button>
            </div>

            <div v-if="errorMessage" class="p-4 rounded-2xl bg-red-50 ring-1 ring-red-200 text-red-700 text-[13px] font-semibold animate-fade-in flex items-start gap-3 shadow-sm my-2">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <span>{{ errorMessage }}</span>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting || !canSubmit"
              class="w-full relative overflow-hidden group py-4 rounded-2xl bg-[var(--brand-ink)] text-white font-bold text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-[var(--brand-brown)] to-[var(--brand-ink)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span v-if="!isSubmitting" class="relative z-10">Sign Up</span>
              <span v-else class="relative z-10 flex items-center justify-center gap-2">
                <span class="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing...
              </span>
            </button>

            <footer class="text-center pt-2">
              <p class="text-xs text-slate-500 font-medium tracking-tight">
                Already have an account?
                <RouterLink to="/login" class="text-[var(--brand-brown)] font-bold hover:underline underline-offset-4">Sign in</RouterLink>
              </p>
            </footer>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal-fade-up { transform: translateY(20px); }
.reveal-fade-left { transform: translateX(-20px); }
.reveal-fade-right { transform: translateX(20px); }

.reveal.active {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
