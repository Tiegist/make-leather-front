type ApiError = {
  status: number
  message: string
  details?: unknown
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? ''

function getCookie(name: string) {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie ? document.cookie.split('; ') : []
  for (const c of cookies) {
    const [k, ...rest] = c.split('=')
    if (k === name) return rest.join('=')
  }
  return null
}

function buildUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (!API_BASE_URL) return path
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

async function parseJsonSafe(res: Response) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { json?: unknown; throwOnError?: boolean },
): Promise<T> {
  const throwOnError = init?.throwOnError ?? true
  const headers = new Headers(init?.headers ?? {})
  headers.set('X-Requested-With', 'XMLHttpRequest')

  if (init?.json !== undefined) {
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
  } else {
    headers.set('Accept', 'application/json')
  }

  const method = (init?.method ?? 'GET').toUpperCase()
  const needsCsrf = !['GET', 'HEAD', 'OPTIONS'].includes(method)
  if (needsCsrf && !headers.has('X-XSRF-TOKEN')) {
    const xsrf = getCookie('XSRF-TOKEN')
    if (xsrf) headers.set('X-XSRF-TOKEN', decodeURIComponent(xsrf))
  }

  const res = await fetch(buildUrl(path), {
    ...init,
    headers,
    body: init?.json !== undefined ? JSON.stringify(init.json) : init?.body,
    credentials: 'include',
  })

  if (!res.ok) {
    const payload = await parseJsonSafe(res)
    const err: ApiError = {
      status: res.status,
      message:
        (payload && typeof payload === 'object' && 'message' in payload && typeof (payload as any).message === 'string'
          ? String((payload as any).message)
          : res.statusText) || 'Request failed',
      details: payload,
    }
    if (throwOnError) throw err
    return payload as T
  }

  return (await parseJsonSafe(res)) as T
}

export async function ensureCsrfCookie() {
  // Sanctum SPA: must hit csrf-cookie before login/register
  await apiFetch('/sanctum/csrf-cookie', { method: 'GET' })
}

