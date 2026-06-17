import axios from 'axios'
import router from '@/router'
import {
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken,
  clearAuthStorage
} from '@/utils/storage'
import { getLastActivity } from '@/utils/activity'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

let isRefreshing = false
let failedQueue = []


// const IDLE_TIMEOUT_MS = 30 * 1000 // 30 seconds
const IDLE_TIMEOUT_MS = 15 * 60 * 1000  // 30 seconds

function processQueue(error, token = null) {
  console.log('[AUTH] processQueue called', {
    hasError: !!error,
    hasToken: !!token,
    queuedRequests: failedQueue.length
  })

  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token)
    }
  })

  failedQueue = []
}

function isAuthEndpoint(url = '') {
  return (
    url.includes('/api/token/generate-token') ||
    url.includes('/api/token/validate-otp') ||
    url.includes('/api/token/refresh-token') ||
    url.includes('/api/token/request-password-reset')
  )
}

function isLogoutEndpoint(url = '') {
  return url.includes('/api/token/logout')
}

function safeBase64UrlDecode(value) {
  try {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    return atob(padded)
  } catch (error) {
    console.warn('[AUTH] Failed to base64url decode token payload', error)
    return null
  }
}

function parseJwt(token) {
  if (!token || typeof token !== 'string') {
    console.warn('[AUTH] parseJwt called with invalid token')
    return null
  }

  const rawToken = token.startsWith('Bearer ') ? token.slice(7) : token
  const parts = rawToken.split('.')

  if (parts.length !== 3) {
    console.warn('[AUTH] Invalid JWT format')
    return null
  }

  const payload = safeBase64UrlDecode(parts[1])
  if (!payload) return null

  try {
    const parsed = JSON.parse(payload)
    console.log('[AUTH] Parsed JWT payload', parsed)
    return parsed
  } catch (error) {
    console.warn('[AUTH] Failed to parse JWT payload JSON', error)
    return null
  }
}

function getTokenExpiryInfo(token) {
  const payload = parseJwt(token)

  if (!payload || !payload.exp) {
    return {
      valid: false,
      exp: null,
      expiresAt: null,
      secondsRemaining: null
    }
  }

  const nowInSeconds = Math.floor(Date.now() / 1000)
  const secondsRemaining = payload.exp - nowInSeconds

  return {
    valid: true,
    exp: payload.exp,
    expiresAt: new Date(payload.exp * 1000).toISOString(),
    secondsRemaining
  }
}

function isTokenExpired(token, skewSeconds = 5) {
  const info = getTokenExpiryInfo(token)

  console.log('[AUTH] Token expiry check', {
    valid: info.valid,
    expiresAt: info.expiresAt,
    secondsRemaining: info.secondsRemaining,
    skewSeconds
  })

  if (!info.valid) return true

  return info.secondsRemaining <= skewSeconds
}

function isUserIdle() {
  const lastActivity = getLastActivity()

  if (!lastActivity) {
    console.log('[AUTH] No last activity found - treating as NOT idle for safety')
    return false
  }

  const idleForMs = Date.now() - lastActivity
  const idle = idleForMs > IDLE_TIMEOUT_MS

  console.log('[AUTH] Idle check', {
    lastActivity: new Date(lastActivity).toISOString(),
    idleForMs,
    idleTimeoutMs: IDLE_TIMEOUT_MS,
    idle
  })

  return idle
}

async function forceLogout(sessionExpired = true) {
  console.warn('[AUTH] forceLogout called', { sessionExpired })

  clearAuthStorage()

  if (router.currentRoute.value.name !== 'login') {
    await router.replace(
      sessionExpired
        ? { name: 'login', query: { sessionExpired: 'true' } }
        : { name: 'login' }
    )
  }
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken()

  console.log('[AUTH] refreshAccessToken called', {
    hasRefreshToken: !!refreshToken
  })

  if (!refreshToken) {
    throw new Error('No refresh token available.')
  }

  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh-token`,
    { refreshToken },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const data = response.data
  const newAccessToken = data.accessToken || data.token || null
  const newRefreshToken = data.refreshToken || null

  console.log('[AUTH] Refresh response received', {
    hasAccessToken: !!newAccessToken,
    hasRefreshToken: !!newRefreshToken
  })

  if (!newAccessToken) {
    throw new Error('Refresh succeeded but no access token was returned.')
  }

  setToken(newAccessToken)

  if (newRefreshToken) {
    setRefreshToken(newRefreshToken)
  }

  return newAccessToken
}

api.interceptors.request.use(
  async (config) => {
    const url = config.url || ''
    console.log('[AUTH] Request interceptor hit', { url })

    if (isAuthEndpoint(url)) {
      console.log('[AUTH] Auth endpoint detected - skipping token attach', { url })
      return config
    }

    let token = getToken()

    console.log('[AUTH] Current token present?', { hasToken: !!token })

    if (!token) {
      return config
    }

    if (isTokenExpired(token)) {
      console.warn('[AUTH] Access token expired or near expiry')

      if (isUserIdle()) {
        console.warn('[AUTH] User idle and token expired - logging out')
        await forceLogout(true)
        return Promise.reject(new Error('Session expired due to inactivity.'))
      }

      console.log('[AUTH] User active - attempting refresh')

      if (isRefreshing) {
        console.log('[AUTH] Refresh already in progress - queueing request')
        token = await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
      } else {
        isRefreshing = true

        try {
          const newToken = await refreshAccessToken()
          processQueue(null, newToken)
          token = newToken
        } catch (refreshError) {
          processQueue(refreshError, null)
          await forceLogout(true)
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }
    }

    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
    console.log('[AUTH] Authorization header attached', { url })

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {}
    const requestUrl = originalRequest.url || ''
    const status = error.response?.status

    console.warn('[AUTH] Response interceptor error', {
      url: requestUrl,
      status
    })

    const isUnauthorized = status === 401
    const isRefreshCall = requestUrl.includes('/api/token/refresh-token')
    const isLoginCall = requestUrl.includes('/api/token/generate-token')
    const isOtpCall = requestUrl.includes('/api/token/validate-otp')
    const isPasswordResetCall = requestUrl.includes('/api/token/request-password-reset')
    const isLogoutCall = isLogoutEndpoint(requestUrl)

    if (
      !isUnauthorized ||
      isRefreshCall ||
      isLoginCall ||
      isOtpCall ||
      isPasswordResetCall ||
      isLogoutCall
    ) {
      console.log('[AUTH] Skipping refresh handling for this response', {
        requestUrl,
        isUnauthorized,
        isRefreshCall,
        isLoginCall,
        isOtpCall,
        isPasswordResetCall,
        isLogoutCall
      })
      return Promise.reject(error)
    }

    if (originalRequest._retry) {
      console.warn('[AUTH] Request already retried once - forcing logout')
      await forceLogout(true)
      return Promise.reject(error)
    }

    const refreshToken = getRefreshToken()

    if (!refreshToken) {
      console.warn('[AUTH] No refresh token during 401 handling - forcing logout')
      await forceLogout(true)
      return Promise.reject(error)
    }

    if (isUserIdle()) {
      console.warn('[AUTH] 401 received while user idle - forcing logout')
      await forceLogout(true)
      return Promise.reject(error)
    }

    if (isRefreshing) {
      console.log('[AUTH] Refresh in progress during 401 - queueing request')
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          originalRequest.headers = originalRequest.headers || {}
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
        .catch((err) => Promise.reject(err))
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      console.log('[AUTH] Attempting refresh from 401 response path')
      const newAccessToken = await refreshAccessToken()

      processQueue(null, newAccessToken)

      originalRequest.headers = originalRequest.headers || {}
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      await forceLogout(true)
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default api
