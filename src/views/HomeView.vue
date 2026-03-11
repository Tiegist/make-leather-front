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
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-[var(--brand-ink)]"></div>
      <div
        class="absolute inset-0 bg-center bg-cover opacity-85 animate-hero-shimmer"
        style="background-image: url('/images/hero-leather.svg')"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-br from-[var(--brand-ink)]/90 via-[var(--brand-brown)]/45 to-[var(--brand-ink)]/92 animate-hero-shimmer" style="animation-delay: -5s"></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(60%_55%_at_22%_18%,rgba(255,255,255,0.14),transparent_60%),radial-gradient(55%_55%_at_80%_76%,rgba(255,255,255,0.10),transparent_62%)]"
      ></div>

      <div class="relative">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24 lg:py-28">
          <div class="max-w-2xl text-white animate-fade-up">
            <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/80 transition-all duration-700 delay-100"> leather products</p>
            <h1 class="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight animate-fade-in-left">
              Crafted for Elegance
            </h1>
            <p class="mt-5 text-sm sm:text-base text-white/75 leading-relaxed">
              A refined portfolio of leather goods—crafted with precision, built for durability, and designed to look
              exceptional for years.
            </p>

            <div class="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up stagger-2">
              <RouterLink
                to="/products"
                class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-premium hover:bg-white/95 transition-all duration-300 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35"
              >
                Explore Collection
              </RouterLink>
              <RouterLink
                to="/about"
                class="inline-flex items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25"
              >
                Our Story
              </RouterLink>
            </div>
          </div>

          <div class="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl">
            <div class="rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm p-6 text-white reveal reveal-fade-left hover:bg-white/15 transition-all duration-500">
              <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/80">Quality</p>
              <p class="mt-2 text-sm text-white/75 leading-relaxed">
                 materials selected for texture, strength, and graceful aging.
              </p>
            </div>
            <div class="rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm p-6 text-white reveal reveal-fade-up hover:bg-white/15 transition-all duration-500">
              <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/80">Craftsmanship</p>
              <p class="mt-2 text-sm text-white/75 leading-relaxed">
                Clean stitching, refined finishing, and detail-first construction.
              </p>
            </div>
            <div class="rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm p-6 text-white reveal reveal-fade-right hover:bg-white/15 transition-all duration-500">
              <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/80">Durability</p>
              <p class="mt-2 text-sm text-white/75 leading-relaxed">
                Designed for long-term wear—built to keep its form and feel.
              </p>
            </div>
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
            A curated selection that highlights leather quality, refined silhouettes, and  finishing.
          </p>
        </div>
        <RouterLink
          to="/products"
          class="hidden sm:inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
        >
          View all
        </RouterLink>
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article class="group rounded-3xl bg-white ring-1 ring-black/5 shadow-premium overflow-hidden hover-lift transition-all duration-500 reveal reveal-fade-left">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden">
            <div class="h-full w-full transition duration-700 ease-out group-hover:scale-[1.08]">
              <img src="/leather-travel-bags.jpg" alt="Leather bag" fallback-label="Leather bag" />
            </div>
          </div>
          <div class="p-6">
            <p class="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-[var(--brand-brown)] transition-colors duration-300">Weekender Travel Bag</p>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">
              Structured, spacious, and designed for confident travel.
            </p>
            <RouterLink
              to="/products"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-brown)] hover:gap-3 transition-all duration-300 underline-offset-4"
            >
              Explore
              <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </RouterLink>
          </div>
        </article>

        <article class="group rounded-3xl bg-white ring-1 ring-black/5 shadow-premium overflow-hidden hover-lift transition-all duration-500 reveal reveal-fade-up">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden">
            <div class="h-full w-full transition duration-700 ease-out group-hover:scale-[1.08]">
              <img src="/leather-shoe.jpg" alt="Leather shoes" fallback-label="Leather shoes" />
            </div>
          </div>
          <div class="p-6">
            <p class="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-[var(--brand-brown)] transition-colors duration-300">Classic Shoes</p>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">
              Hand-finished leather with a clean, timeless silhouette.
            </p>
            <RouterLink
              to="/products"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-brown)] hover:gap-3 transition-all duration-300 underline-offset-4"
            >
              Explore
              <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </RouterLink>
          </div>
        </article>

        <article class="group rounded-3xl bg-white ring-1 ring-black/5 shadow-premium overflow-hidden hover-lift transition-all duration-500 reveal reveal-fade-right">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden">
            <div class="h-full w-full transition duration-700 ease-out group-hover:scale-[1.08]">
              <img src="/leather-wallet.jpg" alt="Leather wallet" fallback-label="Leather wallet" />
            </div>
          </div>
          <div class="p-6">
            <p class="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-[var(--brand-brown)] transition-colors duration-300">Slim Bifold Wallet</p>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">
              Refined pockets for essentials—thin, strong, and polished.
            </p>
            <RouterLink
              to="/products"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-brown)] hover:gap-3 transition-all duration-300 underline-offset-4"
            >
              Explore
              <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </RouterLink>
          </div>
        </article>
      </div>

      <div class="mt-10 sm:hidden">
        <RouterLink
          to="/products"
          class="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
        >
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
              Our design language is  calm—generous spacing, refined typography, and consistent details that
              build trust.
            </p>

            <div class="mt-8 grid gap-4">
              <div class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 reveal reveal-fade-right">
                <p class="text-sm font-semibold tracking-tight text-slate-900">Quality</p>
                <p class="mt-2 text-sm text-slate-600 leading-relaxed">
                  Selected materials with rich texture, strength, and a graceful patina over time.
                </p>
              </div>
              <div class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 reveal reveal-fade-right stagger-1">
                <p class="text-sm font-semibold tracking-tight text-slate-900">Craftsmanship</p>
                <p class="mt-2 text-sm text-slate-600 leading-relaxed">
                  Precision stitching, clean edges, and finishing that feels quiet and confident.
                </p>
              </div>
              <div class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 reveal reveal-fade-right stagger-2">
                <p class="text-sm font-semibold tracking-tight text-slate-900">Durability</p>
                <p class="mt-2 text-sm text-slate-600 leading-relaxed">
                  Built to hold shape, resist daily wear, and stay  through repeated use.
                </p>
              </div>
            </div>
          </div>

          <div class="relative bg-[var(--brand-ink)]">
            <div
              class="absolute inset-0 bg-center bg-cover opacity-80"
                style="background-image: url('/images/hero-leather.svg')"
            ></div>
            <div class="absolute inset-0 bg-gradient-to-br from-[var(--brand-ink)]/80 via-[var(--brand-brown)]/35 to-[var(--brand-ink)]/90"></div>
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
          <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">Trusted by discerning customers</h2>
        </div>

        <div class="mt-10 grid gap-6 lg:grid-cols-3">
          <figure class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 shadow-premium hover:bg-white transition-all duration-500 hover:scale-[1.02] cursor-default group reveal reveal-fade-left">
            <blockquote class="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
              “The leather feels exceptional—subtle texture, clean finishing, and weight.”
            </blockquote>
            <figcaption class="mt-5 text-xs text-slate-500">— A. Customer</figcaption>
          </figure>
          <figure class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 shadow-premium hover:bg-white transition-all duration-500 hover:scale-[1.02] cursor-default group reveal reveal-fade-up">
            <blockquote class="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
              “Everything looks refined and organized. The quality is exactly what we wanted.”
            </blockquote>
            <figcaption class="mt-5 text-xs text-slate-500">— Studio Buyer</figcaption>
          </figure>
          <figure class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 shadow-premium hover:bg-white transition-all duration-500 hover:scale-[1.02] cursor-default group reveal reveal-fade-right">
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
