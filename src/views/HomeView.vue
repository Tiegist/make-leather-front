<script setup lang="ts">
import { onMounted } from 'vue'
import SmartImage from '../components/ui/SmartImage.vue'

onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      } else {
        // Optional: remove to re-trigger
        entry.target.classList.remove('active')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <main class="bg-[var(--brand-beige)]">
    <!-- Hero Section -->
    <section class="relative min-h-[35vh] flex items-center overflow-hidden bg-[var(--brand-ink)]">
      <!-- Background Image (60% width on large screens, acts as half-background) -->
      <div class="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 overflow-hidden">
        <div class="absolute inset-0 bg-center bg-cover scale-105 animate-hero-shimmer transition-transform duration-[3000ms]"
          style="background-image: url('/home-hero.png')"></div>
        <!-- Overlays for legibility and texture -->
        <div class="absolute inset-0 bg-gradient-to-r from-[var(--brand-ink)] via-[var(--brand-ink)]/40 to-transparent lg:from-[var(--brand-ink)] lg:via-[var(--brand-ink)]/20 lg:to-transparent"></div>
        <div class="absolute inset-0 opacity-20 mix-blend-overlay bg-repeat" style="background-image: url('/images/hero-leather.svg'); background-size: 400px;"></div>
      </div>
 
      <div class="relative w-full max-w-7xl mx-auto px-5 sm:px-8 py-6 lg:py-10">
        <div class="max-w-xl lg:max-w-2xl">
          <!-- Main Content Card with Glassmorphism -->
          <div class="relative z-10 p-5 sm:p-7 rounded-[1.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in-left overflow-hidden">
            <!-- Subtle glow effect inside card -->
            <div class="absolute -top-24 -left-24 w-48 h-48 bg-[var(--brand-gold)]/10 blur-[80px] rounded-full"></div>
            
            <div class="relative">
              <p class="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--brand-gold)] mb-6">
                Est. Quality Leather
              </p>
              <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                Mastery in <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[var(--brand-gold)]/80">Every Detail</span>
              </h1>
              <p class="mt-8 text-base sm:text-lg text-white/70 leading-relaxed max-w-lg">
                A refined collection of leather goods, meticulously handcrafted to embody timeless elegance and enduring strength.
              </p>

              <div class="mt-10 flex flex-wrap gap-4">
                <RouterLink to="/products"
                  class="group relative inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-bold text-[var(--brand-ink)] shadow-xl hover:bg-[var(--brand-gold)] hover:text-white transition-all duration-500 hover:scale-[1.05] active:scale-95">
                  Explore Collection
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 010-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </RouterLink>
                <RouterLink to="/about"
                  class="inline-flex items-center justify-center rounded-2xl bg-white/5 border border-white/20 px-8 py-4 text-sm font-bold text-white backdrop-blur-md hover:bg-white/10 transition-all duration-500 hover:scale-[1.05] active:scale-95">
                  Our Story
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Floating Stat Badges for extra creativity -->
          <div class="mt-12 flex flex-wrap gap-6 animate-fade-up stagger-2">
            <div class="flex items-center space-x-3 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/5">
              <div class="p-2 bg-[var(--brand-gold)]/20 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--brand-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-widest text-white/40 font-bold">Material</p>
                <p class="text-sm font-semibold text-white">Full Grain</p>
              </div>
            </div>
            <div class="flex items-center space-x-3 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/5">
              <div class="p-2 bg-[var(--brand-gold)]/20 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--brand-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.143-5.714L5 13l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-widest text-white/40 font-bold">Process</p>
                <p class="text-sm font-semibold text-white">Handcrafted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative side accent -->
      <div class="absolute left-0 bottom-0 top-0 w-1 bg-gradient-to-b from-transparent via-[var(--brand-gold)]/40 to-transparent"></div>
    </section>

    <!-- Restored Feature Boxes Section -->
    <section class="relative z-20 -mt-10 sm:-mt-14 pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          <div
            class="group rounded-3xl bg-white/70 backdrop-blur-md ring-1 ring-black/5 p-8 shadow-premium transition-all duration-500 hover:scale-[1.02] hover:bg-white reveal reveal-fade-up">
            <div class="flex items-center space-x-4 mb-4">
              <span class="text-xs font-bold tracking-[0.2em] uppercase text-[var(--brand-gold)]">01</span>
              <div class="h-px flex-1 bg-[var(--brand-gold)]/20"></div>
            </div>
            <p class="text-lg font-semibold text-slate-900">Quality</p>
            <p class="mt-3 text-sm text-slate-600 leading-relaxed">
              Materials selected for texture, strength, and graceful aging.
            </p>
          </div>
          <div
            class="group rounded-3xl bg-white/70 backdrop-blur-md ring-1 ring-black/5 p-8 shadow-premium transition-all duration-500 hover:scale-[1.02] hover:bg-white reveal reveal-fade-up stagger-1">
            <div class="flex items-center space-x-4 mb-4">
              <span class="text-xs font-bold tracking-[0.2em] uppercase text-[var(--brand-gold)]">02</span>
              <div class="h-px flex-1 bg-[var(--brand-gold)]/20"></div>
            </div>
            <p class="text-lg font-semibold text-slate-900">Craftsmanship</p>
            <p class="mt-3 text-sm text-slate-600 leading-relaxed">
              Clean stitching, refined finishing, and detail-first construction.
            </p>
          </div>
          <div
            class="group rounded-3xl bg-white/70 backdrop-blur-md ring-1 ring-black/5 p-8 shadow-premium transition-all duration-500 hover:scale-[1.02] hover:bg-white reveal reveal-fade-up stagger-2">
            <div class="flex items-center space-x-4 mb-4">
              <span class="text-xs font-bold tracking-[0.2em] uppercase text-[var(--brand-gold)]">03</span>
              <div class="h-px flex-1 bg-[var(--brand-gold)]/20"></div>
            </div>
            <p class="text-lg font-semibold text-slate-900">Durability</p>
            <p class="mt-3 text-sm text-slate-600 leading-relaxed">
              Designed for long-term wear—built to keep its form and feel.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured products -->
    <section class="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
      <div class="flex items-end justify-between gap-6">
        <div class="max-w-2xl">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Featured products</p>
          <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            The pieces customers return for
          </h2>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            A curated selection that highlights leather quality, refined silhouettes, and finishing.
          </p>
        </div>
        <RouterLink to="/products"
          class="hidden sm:inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]">
          View all
        </RouterLink>
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          class="group rounded-3xl bg-white ring-1 ring-black/5 shadow-premium overflow-hidden hover-lift transition-all duration-500 reveal reveal-fade-left">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden">
            <div class="h-full w-full transition duration-700 ease-out group-hover:scale-[1.08]">
              <img src="/leather-travel-bags.jpg" alt="Leather bag" fallback-label="Leather bag" />
            </div>
          </div>
          <div class="p-6">
            <p
              class="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-[var(--brand-brown)] transition-colors duration-300">
              Weekender Travel Bag</p>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">
              Structured, spacious, and designed for confident travel.
            </p>
            <RouterLink to="/products"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-brown)] hover:gap-3 transition-all duration-300 underline-offset-4">
              Explore
              <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </RouterLink>
          </div>
        </article>

        <article
          class="group rounded-3xl bg-white ring-1 ring-black/5 shadow-premium overflow-hidden hover-lift transition-all duration-500 reveal reveal-fade-up">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden">
            <div class="h-full w-full transition duration-700 ease-out group-hover:scale-[1.08]">
              <img src="/leather-shoe.jpg" alt="Leather shoes" fallback-label="Leather shoes" />
            </div>
          </div>
          <div class="p-6">
            <p
              class="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-[var(--brand-brown)] transition-colors duration-300">
              Classic Shoes</p>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">
              Hand-finished leather with a clean, timeless silhouette.
            </p>
            <RouterLink to="/products"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-brown)] hover:gap-3 transition-all duration-300 underline-offset-4">
              Explore
              <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </RouterLink>
          </div>
        </article>

        <article
          class="group rounded-3xl bg-white ring-1 ring-black/5 shadow-premium overflow-hidden hover-lift transition-all duration-500 reveal reveal-fade-right">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden">
            <div class="h-full w-full transition duration-700 ease-out group-hover:scale-[1.08]">
              <img src="/leather-wallet.jpg" alt="Leather wallet" fallback-label="Leather wallet" />
            </div>
          </div>
          <div class="p-6">
            <p
              class="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-[var(--brand-brown)] transition-colors duration-300">
              Slim Bifold Wallet</p>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">
              Refined pockets for essentials—thin, strong, and polished.
            </p>
            <RouterLink to="/products"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-brown)] hover:gap-3 transition-all duration-300 underline-offset-4">
              Explore
              <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </RouterLink>
          </div>
        </article>
      </div>

      <div class="mt-10 sm:hidden">
        <RouterLink to="/products"
          class="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]">
          View all products
        </RouterLink>
      </div>
    </section>

    <!-- Brand values -->
    <section class="mx-auto max-w-7xl px-5 sm:px-8 pb-16 sm:pb-20">
      <div class="rounded-[2rem] bg-white ring-1 ring-black/5 shadow-premium overflow-hidden">
        <div class="grid gap-0 lg:grid-cols-2">
          <div class="p-10 sm:p-12">
            <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Brand values</p>
            <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Quality you can see. Craft you can feel.
            </h2>
            <p class="mt-3 text-sm text-slate-600 leading-relaxed max-w-xl">
              Our design language is calm—generous spacing, refined typography, and consistent details that
              build trust.
            </p>

            <div class="mt-8 grid gap-4">
              <div class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 reveal reveal-fade-right">
                <p class="text-sm font-semibold tracking-tight text-slate-900">Quality</p>
                <p class="mt-2 text-sm text-slate-600 leading-relaxed">
                  Selected materials with rich texture, strength, and a graceful patina over time.
                </p>
              </div>
              <div
                class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 reveal reveal-fade-right stagger-1">
                <p class="text-sm font-semibold tracking-tight text-slate-900">Craftsmanship</p>
                <p class="mt-2 text-sm text-slate-600 leading-relaxed">
                  Precision stitching, clean edges, and finishing that feels quiet and confident.
                </p>
              </div>
              <div
                class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 reveal reveal-fade-right stagger-2">
                <p class="text-sm font-semibold tracking-tight text-slate-900">Durability</p>
                <p class="mt-2 text-sm text-slate-600 leading-relaxed">
                  Built to hold shape, resist daily wear, and stay through repeated use.
                </p>
              </div>
            </div>
          </div>

          <div class="relative bg-[var(--brand-ink)]">
            <div class="absolute inset-0 bg-center bg-cover opacity-80"
              style="background-image: url('/images/hero-leather.svg')"></div>
            <div
              class="absolute inset-0 bg-gradient-to-br from-[var(--brand-ink)]/80 via-[var(--brand-brown)]/35 to-[var(--brand-ink)]/90">
            </div>
            <div class="relative h-full p-10 sm:p-12 flex items-end">
              <div class="max-w-md rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm p-7 text-white">
                <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/80">Signature</p>
                <p class="mt-2 text-lg font-semibold tracking-tight">Muted gold details, deep brown tones.</p>
                <p class="mt-3 text-sm text-white/75 leading-relaxed">
                  A sophisticated palette that feels high-end and timeless—designed to complement leather textures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div class="max-w-2xl">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Testimonials</p>
          <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">Trusted by discerning
            customers</h2>
        </div>

        <div class="mt-10 grid gap-6 lg:grid-cols-3">
          <figure
            class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 shadow-premium hover:bg-white transition-all duration-500 hover:scale-[1.02] cursor-default group reveal reveal-fade-left">
            <blockquote class="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
              “The leather feels exceptional—subtle texture, clean finishing, and weight.”
            </blockquote>
            <figcaption class="mt-5 text-xs text-slate-500">— A. Customer</figcaption>
          </figure>
          <figure
            class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 shadow-premium hover:bg-white transition-all duration-500 hover:scale-[1.02] cursor-default group reveal reveal-fade-up">
            <blockquote class="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
              “Everything looks refined and organized. The quality is exactly what we wanted.”
            </blockquote>
            <figcaption class="mt-5 text-xs text-slate-500">— Studio Buyer</figcaption>
          </figure>
          <figure
            class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 shadow-premium hover:bg-white transition-all duration-500 hover:scale-[1.02] cursor-default group reveal reveal-fade-right">
            <blockquote class="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
              “Elegant, durable, and comfortable. You can tell it’s crafted with care.”
            </blockquote>
            <figcaption class="mt-5 text-xs text-slate-500">— Returning Client</figcaption>
          </figure>
        </div>
      </div>
    </section>
  </main>
</template>
