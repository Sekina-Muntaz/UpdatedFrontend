const LAST_ACTIVITY_KEY = 'lastActivityAt'

export function setLastActivity(timestamp = Date.now()) {
  console.log('[AUTH] Activity recorded at', new Date(timestamp).toISOString())
  localStorage.setItem(LAST_ACTIVITY_KEY, String(timestamp))
}

export function getLastActivity() {
  const raw = localStorage.getItem(LAST_ACTIVITY_KEY)
  const value = raw ? Number(raw) : 0

  console.log('[AUTH] getLastActivity', {
    raw,
    parsed: value ? new Date(value).toISOString() : null
  })

  return value
}

export function clearLastActivity() {
  console.log('[AUTH] Clearing last activity')
  localStorage.removeItem(LAST_ACTIVITY_KEY)
}
