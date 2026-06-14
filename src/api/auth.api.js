import api from './axios'

export function loginApi(payload) {
  return api.post('/token/generate-token', payload)
}

export function logoutApi(payload = {}) {
  return api.post('/token/logout', payload)
}

export function refreshTokenApi(payload) {
  return api.post('/token/refresh', payload)
}


export function requestPasswordResetApi(payload) {
  return api.post('/token/request-password-reset', payload)
}

export function getCurrentUserApi() {
  return api.get('/users/me')
}