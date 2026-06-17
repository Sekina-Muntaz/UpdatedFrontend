const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_KEY = 'user'

const LEGACY_KEYS = [
  'access_token',
  'refresh_token',
  'auth_user',
  'accessToken',
  'refreshToken',
  'authUser'
]

export function getToken() {
  const value = localStorage.getItem(TOKEN_KEY)
  return value && value !== 'null' ? value : null
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token.startsWith('Bearer ') ? token.slice(7) : token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export function getRefreshToken() {
  const value = localStorage.getItem(REFRESH_TOKEN_KEY)
  return value && value !== 'null' ? value : null
}

export function setRefreshToken(token) {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  return raw && raw !== 'null' ? JSON.parse(raw) : null
}

export function setUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(USER_KEY)
  }
}

export function clearAuthStorage() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)

  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key))
}