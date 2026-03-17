<script setup lang="ts">
import { RouterLink } from 'vue-router'

const social = [
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'X', href: '#', icon: 'x' },
] as const
</script>

<template>
  <footer class="bg-[var(--brand-ink)] text-white">
    <div class="mx-auto max-w-7xl px-5 sm:px-8 py-14">
      <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
        <div class="space-y-4">
          <div class="inline-flex items-center gap-3">
            <span
              class="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15"
              aria-hidden="true"
            >
               <img src="/leather-logo.jpg" alt="" class="rounded-full">
            </span>
            <div class="leading-tight">
              <p class="text-base font-semibold tracking-tight">Make Leather</p>
              <p class="text-xs text-white/70 -mt-0.5">Crafted for Elegance</p>
            </div>
          </div>
          <p class="text-sm text-white/70 leading-relaxed max-w-md">
            Premium leather goods designed with refined simplicity—built to last, crafted to be admired.
          </p>
        </div>

        <div class="grid gap-3">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/70">Quick Links</p>
          <div class="grid gap-2 text-sm">
            <RouterLink to="/" class="text-white/75 hover:text-white transition">Home</RouterLink>
            <RouterLink to="/about" class="text-white/75 hover:text-white transition">About Us</RouterLink>
            <RouterLink to="/products" class="text-white/75 hover:text-white transition">Our Products</RouterLink>
            <RouterLink to="/contact" class="text-white/75 hover:text-white transition">Contact Us</RouterLink>
          </div>
        </div>

        <div class="grid gap-5">
          <div class="grid gap-2">
            <p class="text-xs font-medium tracking-[0.18em] uppercase text-white/70">Contact</p>
            <p class="text-sm text-white/75">Phone: <a class="hover:text-white transition" href="tel:+10000000000">+1 000 000 0000</a></p>
            <p class="text-sm text-white/75">
              Email:
              <a class="hover:text-white transition" href="mailto:hello@makeleather.com">hello@makeleather.com</a>
            </p>
            <p class="text-sm text-white/75">Hours: Mon–Sat, 9:00–18:00</p>
          </div>

          <div class="flex items-center gap-3">
            <a
              v-for="s in social"
              :key="s.label"
              :href="s.href"
              class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
              :aria-label="s.label"
            >
              <svg v-if="s.icon === 'instagram'" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M16.5 7.5h.01" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
              </svg>
              <svg v-else-if="s.icon === 'facebook'" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M14 9h3V6h-3a4 4 0 0 0-4 4v3H7v3h3v5h3v-5h3l1-3h-4v-3a1 1 0 0 1 1-1Z" />
              </svg>
              <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M18 6 6 18" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M6 6l12 12" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-white/60">© {{ new Date().getFullYear() }} Make Leather. All rights reserved.</p>
        <p class="text-xs text-white/60">Designed with refined minimalism.</p>
      </div>
    </div>
  </footer>
</template>
