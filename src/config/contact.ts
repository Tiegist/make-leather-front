export const companyContact = {
  phone: '+10000000000',
  email: 'hello@makeleather.com',
  whatsappNumber: '10000000000', // digits only
  telegramUsername: 'makeleather', // without @
} as const

export function buildWhatsAppOrderUrl(opts: { whatsappNumber: string; message: string }) {
  return `https://wa.me/${opts.whatsappNumber}?text=${encodeURIComponent(opts.message)}`
}

export function buildTelegramShareUrl(opts: { text: string; url?: string }) {
  const params = new URLSearchParams()
  if (opts.url) params.set('url', opts.url)
  params.set('text', opts.text)
  return `https://t.me/share/url?${params.toString()}`
}
