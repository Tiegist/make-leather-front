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

const teamMembers = [
  {
    name: 'Sony Madison',
    role: 'CEO, Director',
    image: '/images/team-sony.png',
  },
  {
    name: 'Hary Warth',
    role: 'Head Manager',
    image: '/images/team-hary.png',
  },
  {
    name: 'Jenny Hobb',
    role: 'Branch Manager',
    image: '/images/team-jenny.png',
  },
  {
    name: 'Johny Smith',
    role: 'Supervisor',
    image: '/images/team-johny.png',
  },
]
</script>

<template>
  <main class="bg-[var(--brand-beige)]">
    <!-- Header -->
    <section class="mx-auto max-w-7xl px-5 sm:px-8 pt-14 sm:pt-16 pb-12">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div class="max-w-xl animate-fade-up">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">About us</p>
          <h1 class="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            A story of craft and restraint
          </h1>
          <p class="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            We design leather goods with refined minimalism—clean lines, premium materials, and a
            focus on durability. Every product is made to feel elegant today and age beautifully
            over time.
          </p>

          <div class="mt-7 grid grid-cols-3 gap-3">
            <div class="rounded-3xl bg-white ring-1 ring-black/5 p-5 shadow-premium">
              <p class="text-xs text-slate-500">Mission</p>
              <p class="mt-2 text-sm font-semibold tracking-tight text-slate-900">Quality-first</p>
            </div>
            <div class="rounded-3xl bg-white ring-1 ring-black/5 p-5 shadow-premium">
              <p class="text-xs text-slate-500">Vision</p>
              <p class="mt-2 text-sm font-semibold tracking-tight text-slate-900">
                Modern elegance
              </p>
            </div>
            <div class="rounded-3xl bg-white ring-1 ring-black/5 p-5 shadow-premium">
              <p class="text-xs text-slate-500">Status</p>
              <p class="mt-2 text-sm font-semibold tracking-tight text-slate-900">Active</p>
            </div>
          </div>
        </div>

        <div class="rounded-[2rem] overflow-hidden ring-1 ring-black/5 shadow-premium bg-white">
          <div class="aspect-[4/3]">
            <SmartImage
              src="/images/workshop.svg"
              alt="Workshop craftsmanship"
              fallback-label="Workshop"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div class="max-w-2xl">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Our journey</p>
          <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Growth with consistency
          </h2>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            From workshop beginnings to a complete premium collection—every step focused on
            craftsmanship and brand polish.
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
                <p class="text-base font-semibold tracking-tight text-slate-900">
                  {{ item.title }}
                </p>
              </div>
              <span class="text-xs text-slate-500">Milestone</span>
            </div>
            <p class="mt-4 text-sm text-slate-600 leading-relaxed max-w-3xl">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Members -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20 border-t border-slate-100">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-6"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span class="text-[10px] font-bold tracking-widest uppercase text-slate-500"
              >Our Team</span
            >
            <span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
            Team Members
          </h2>
          <p class="text-sm text-slate-500 leading-relaxed">
            Sint nascetur facere, delectus conubia consequuntur, nonummy distinctio! Non officiis,
            id natus non nisl provident justo.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="member in teamMembers" :key="member.name" class="group">
            <div
              class="relative rounded-[2.5rem] overflow-hidden bg-slate-50 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div class="aspect-[4/5]">
                <img
                  :src="member.image"
                  :alt="member.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <!-- Content Overlay / Bottom Bar -->
              <div class="absolute bottom-6 left-6 right-6">
                <div
                  class="bg-amber-950 rounded-3xl p-5 text-center text-white shadow-lg transform transition-transform duration-300 group-hover:scale-[1.02]"
                >
                  <h3 class="font-bold text-lg leading-tight">{{ member.name }}</h3>
                  <p class="text-xs text-orange-100 mt-1 font-medium opacity-90">
                    {{ member.role }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-6 flex justify-center items-center gap-4">
              <button
                class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all"
              >
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </button>
              <button
                class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all"
              >
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </button>
              <button
                class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all"
              >
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                  />
                </svg>
              </button>
              <button
                class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all"
              >
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 10.001 12.324A6.162 6.162 0 0012 5.838zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values / Achievements -->
    <section class="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Core values</p>
          <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            What we never compromise on
          </h2>
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
                Professional imagery, transparent materials, and honest presentation that builds
                trust.
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-white ring-1 ring-black/5 p-8 shadow-premium">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Achievements</p>
          <h3 class="mt-3 text-lg font-semibold tracking-tight text-slate-900">
            Recognized for quality
          </h3>
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
