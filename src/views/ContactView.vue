<script setup lang="ts">
import { ref } from 'vue'

const phone = '+10000000000'
const emailTo = 'hello@makeleather.com'
const whatsappNumber = '10000000000' // digits only
const telegramUsername = 'makeleather' // without @

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

function submitToEmail() {
  const s = encodeURIComponent(subject.value || 'Website inquiry')
  const body = encodeURIComponent(
    `Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`.trim(),
  )
  window.location.href = `mailto:${emailTo}?subject=${s}&body=${body}`
}
</script>

<template>
  <main class="bg-[var(--brand-beige)]">
    <section class="mx-auto max-w-7xl px-5 sm:px-8 pt-14 sm:pt-16 pb-14">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div class="max-w-xl animate-fade-up">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Contact us</p>
          <h1 class="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Let’s talk</h1>
          <p class="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Reach us instantly by phone or messaging. For detailed requests, use the form—your message will open in your
            email client ready to send.
          </p>

          <div class="mt-8 grid gap-4">
            <div class="rounded-3xl bg-white ring-1 ring-black/5 p-7 shadow-premium">
              <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Phone</p>
              <a class="mt-2 block text-sm font-semibold text-slate-900 hover:underline underline-offset-4" :href="`tel:${phone}`">
                {{ phone }}
              </a>
              <p class="mt-2 text-sm text-slate-600">Tap to call directly.</p>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <a
                class="rounded-3xl bg-white ring-1 ring-black/5 p-7 shadow-premium hover:bg-black/5 transition"
                :href="`https://wa.me/${whatsappNumber}`"
                target="_blank"
                rel="noopener"
              >
                <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">WhatsApp</p>
                <p class="mt-2 text-sm font-semibold text-slate-900">Message now</p>
                <p class="mt-2 text-sm text-slate-600">Fast replies for product inquiries.</p>
              </a>

              <a
                class="rounded-3xl bg-white ring-1 ring-black/5 p-7 shadow-premium hover:bg-black/5 transition"
                :href="`https://t.me/${telegramUsername}`"
                target="_blank"
                rel="noopener"
              >
                <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Telegram</p>
                <p class="mt-2 text-sm font-semibold text-slate-900">Chat instantly</p>
                <p class="mt-2 text-sm text-slate-600">Share references and details.</p>
              </a>
            </div>

            <div class="rounded-3xl bg-white ring-1 ring-black/5 p-7 shadow-premium">
              <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Email</p>
              <a
                class="mt-2 block text-sm font-semibold text-slate-900 hover:underline underline-offset-4"
                :href="`mailto:${emailTo}`"
              >
                {{ emailTo }}
              </a>
              <p class="mt-2 text-sm text-slate-600">For business, wholesale, or collaboration.</p>
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-white ring-1 ring-black/5 p-8 shadow-premium">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-slate-500">Send a message</p>
          <h2 class="mt-3 text-xl font-semibold tracking-tight text-slate-900">Contact form</h2>
          <p class="mt-2 text-sm text-slate-600">Fields are designed to feel premium and calm.</p>

          <form class="mt-7 space-y-4" @submit.prevent="submitToEmail">
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
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
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
                  class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
                />
              </div>
            </div>

            <div>
              <label for="subject" class="block text-[13px] font-medium text-slate-700">Subject</label>
              <input
                id="subject"
                v-model="subject"
                type="text"
                required
                placeholder="What is this about?"
                class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
              />
            </div>

            <div>
              <label for="message" class="block text-[13px] font-medium text-slate-700">Message</label>
              <textarea
                id="message"
                v-model="message"
                rows="5"
                required
                placeholder="Tell us what you’re looking for…"
                class="mt-2 block w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-black/5 placeholder:text-slate-400 outline-none transition duration-200 ease-out focus:border-[var(--brand-brown)] focus:ring-4 focus:ring-[rgba(90,58,43,0.22)]"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full inline-flex items-center justify-center rounded-2xl bg-[var(--brand-brown)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(90,58,43,0.85)] hover:brightness-[1.06] active:brightness-[0.98] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(90,58,43,0.32)]"
            >
              Send Message
            </button>

            <p class="text-xs text-slate-500 text-center">
              This opens your email client. If you want server-side email sending, we can connect it to your backend.
            </p>
          </form>

          <div class="mt-10 rounded-3xl overflow-hidden ring-1 ring-black/5 bg-slate-100">
            <div class="aspect-[16/9] grid place-items-center text-xs text-slate-500">
              Optional map: paste your Google Maps embed here.
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <div class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-5">
              <p class="text-xs text-slate-500">Business hours</p>
              <p class="mt-2 text-sm font-semibold tracking-tight text-slate-900">Mon–Sat, 9:00–18:00</p>
            </div>
            <div class="rounded-3xl bg-[var(--brand-beige)] ring-1 ring-black/5 p-5">
              <p class="text-xs text-slate-500">Location</p>
              <p class="mt-2 text-sm font-semibold tracking-tight text-slate-900">City, Country</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

