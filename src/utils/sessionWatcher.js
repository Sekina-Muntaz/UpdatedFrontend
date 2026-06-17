// src/utils/sessionWatcher.js
import router from '@/router'
import { pinia } from '@/stores'
import { useAuthStore } from '@/stores/auth.store'
import { getToken } from '@/utils/storage'
import { getLastActivity } from '@/utils/activity'

const IDLE_TIMEOUT_MS = 15 * 60 * 1000 // 15 min
// const IDLE_TIMEOUT_MS = 60000// 15 min
const CHECK_INTERVAL_MS = 5000 // check every 5 seconds

let watcherInterval = null

function safeBase64UrlDecode(value) {
  try {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    return atob(padded)
  } catch {
    return null
  }
}

function parseJwt(token) {
  if (!token || typeof token !== 'string') return null

  const rawToken = token.startsWith('Bearer ') ? token.slice(7) : token
  const parts = rawToken.split('.')

  if (parts.length !== 3) return null

  const payload = safeBase64UrlDecode(parts[1])
  if (!payload) return null

  try {
    return JSON.parse(payload)
  } catch {
    return null
  }
}

function isTokenExpired(token, skewSeconds = 0) {
  const payload = parseJwt(token)

  if (!payload || !payload.exp) {
    console.warn('[AUTH] Token invalid or missing exp; treating as expired')
    return true
  }

  const nowInSeconds = Math.floor(Date.now() / 1000)
  const expired = payload.exp <= (nowInSeconds + skewSeconds)

  console.log('[AUTH] Session watcher token check:', {
    expiresAt: new Date(payload.exp * 1000).toISOString(),
    now: new Date().toISOString(),
    expired
  })

  return expired
}

function isUserIdle() {
  const lastActivity = getLastActivity()

  if (!lastActivity) {
    console.log('[AUTH] No last activity found; treating as not idle')
    return false
  }

  const idleForMs = Date.now() - lastActivity
  const idle = idleForMs > IDLE_TIMEOUT_MS

  console.log('[AUTH] Session watcher idle check:', {
    lastActivity: new Date(lastActivity).toISOString(),
    idleForMs,
    idleTimeoutMs: IDLE_TIMEOUT_MS,
    idle
  })

  return idle
}

async function forceLogoutDueToExpiry() {
  const authStore = useAuthStore(pinia)

  console.warn('[AUTH] Token expired while idle. Logging out without request.')

  authStore.logoutLocal()

  if (router.currentRoute.value.name !== 'login') {
    await router.replace({
      name: 'login',
      query: { sessionExpired: 'true' }
    })
  }
}

export function startSessionWatcher() {
  if (watcherInterval) return

  console.log('[AUTH] Starting session watcher')

  watcherInterval = setInterval(async () => {
    const token = getToken()

    if (!token) return

    const expired = isTokenExpired(token, 0)
    const idle = isUserIdle()

    if (expired && idle) {
      await forceLogoutDueToExpiry()
    }
  }, CHECK_INTERVAL_MS)
}

export function stopSessionWatcher() {
  if (watcherInterval) {
    clearInterval(watcherInterval)
    watcherInterval = null
    console.log('[AUTH] Session watcher stopped')
  }
}