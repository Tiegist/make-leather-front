export function getErrorMessage(err: unknown, fallback = 'Something went wrong') {
  if (typeof err === 'string') return err
  if (err instanceof Error && typeof err.message === 'string' && err.message.trim()) return err.message

  if (err && typeof err === 'object') {
    const anyErr = err as any

    if (typeof anyErr.message === 'string' && anyErr.message.trim()) return anyErr.message

    const details = anyErr.details
    if (details && typeof details === 'object') {
      // Laravel validation payloads often include: { message, errors: { field: [msg] } }
      const errors = (details as any).errors
      if (errors && typeof errors === 'object') {
        for (const key of Object.keys(errors)) {
          const v = (errors as any)[key]
          if (Array.isArray(v) && typeof v[0] === 'string' && v[0].trim()) return v[0]
          if (typeof v === 'string' && v.trim()) return v
        }
      }

      if (typeof (details as any).message === 'string' && String((details as any).message).trim()) {
        return String((details as any).message)
      }
    }
  }

  return fallback
}

