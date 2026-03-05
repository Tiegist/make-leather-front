<script setup lang="ts">
import SmartImage from '../components/ui/SmartImage.vue'

const timeline = [
  {
    year: '2016',
    title: 'The beginning',
    text: 'A small workshop focused on premium leather finishing, clean stitching, and durability-first design.',
  },
  {
    year: '2019',
    title: 'Growing the collection',
    text: 'Expanded into bags, belts, and wallets—keeping a consistent premium look across every piece.',
  },
  {
    year: '2023',
    title: 'Modern portfolio presence',
    text: 'A refined brand identity and a product-first portfolio built to earn trust and showcase craftsmanship.',
  },
] as const
</script>

<template>
  <main class="bg-[var(--brand-beige)]">
    <!-- Header -->
    <section class="mx-auto max-w-7xl px-5 sm:px-8 pt-14 sm:pt-16 pb-12">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div class="max-w-xl animate-fade-up">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">About us</p>
          <h1 class="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">A story of craft and restraint</h1>
          <p class="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            We design leather goods with refined minimalism—clean lines, premium materials, and a focus on durability.
            Every product is made to feel elegant today and age beautifully over time.
          </p>

          <div class="mt-7 grid grid-cols-3 gap-3">
            <div class="rounded-3xl bg-white ring-1 ring-black/5 p-5 shadow-premium">
              <p class="text-xs text-slate-500">Mission</p>
              <p class="mt-2 text-sm font-semibold tracking-tight text-slate-900">Quality-first</p>
            </div>
            <div class="rounded-3xl bg-white ring-1 ring-black/5 p-5 shadow-premium">
              <p class="text-xs text-slate-500">Vision</p>
              <p class="mt-2 text-sm font-semibold tracking-tight text-slate-900">Modern elegance</p>
            </div>
            <div class="rounded-3xl bg-white ring-1 ring-black/5 p-5 shadow-premium">
              <p class="text-xs text-slate-500">Status</p>
              <p class="mt-2 text-sm font-semibold tracking-tight text-slate-900">Active</p>
            </div>
          </div>
        </div>

        <div class="rounded-[2rem] overflow-hidden ring-1 ring-black/5 shadow-premium bg-white">
          <div class="aspect-[4/3]">
            <SmartImage src="/images/workshop.svg" alt="Workshop craftsmanship" fallback-label="Workshop" />
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div class="max-w-2xl">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Our journey</p>
          <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">Growth with consistency</h2>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            From workshop beginnings to a complete premium collection—every step focused on craftsmanship and brand polish.
          </p>
        </div>

        <div class="mt-10 grid gap-5">
          <div
            v-for="item in timeline"
            :key="item.year"
            class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-7 shadow-premium"
          >
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div class="flex items-center gap-4">
                <span
                  class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-brown)] text-white text-sm font-semibold shadow-sm"
                >
                  {{ item.year }}
                </span>
                <p class="text-base font-semibold tracking-tight text-slate-900">{{ item.title }}</p>
              </div>
              <span class="text-xs text-slate-500">Milestone</span>
            </div>
            <p class="mt-4 text-sm text-slate-600 leading-relaxed max-w-3xl">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values / Achievements -->
    <section class="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Core values</p>
          <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">What we never compromise on</h2>
          <div class="mt-7 grid gap-5">
            <div class="rounded-3xl bg-white ring-1 ring-black/5 p-7 shadow-premium">
              <p class="text-sm font-semibold tracking-tight text-slate-900">Craftsmanship</p>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">
                Precise stitching, clean edges, and thoughtful details designed for longevity.
              </p>
            </div>
            <div class="rounded-3xl bg-white ring-1 ring-black/5 p-7 shadow-premium">
              <p class="text-sm font-semibold tracking-tight text-slate-900">Authenticity</p>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">
                Professional imagery, transparent materials, and honest presentation that builds trust.
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-white ring-1 ring-black/5 p-8 shadow-premium">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Achievements</p>
          <h3 class="mt-3 text-lg font-semibold tracking-tight text-slate-900">Recognized for quality</h3>
          <ul class="mt-5 space-y-3 text-sm text-slate-600">
            <li class="flex items-start gap-3">
              <span class="mt-1.5 h-2 w-2 rounded-full bg-[var(--brand-gold)]"></span>
              Built a consistent premium collection across multiple categories.
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1.5 h-2 w-2 rounded-full bg-[var(--brand-gold)]"></span>
              Repeat customers driven by comfort, durability, and refined design.
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1.5 h-2 w-2 rounded-full bg-[var(--brand-gold)]"></span>
              Optional certifications can be displayed here when available.
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>
