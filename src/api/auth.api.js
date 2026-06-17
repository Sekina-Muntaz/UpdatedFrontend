
import apiClient from '@/api/client'

export function loginApi(payload) {
  return apiClient.post('/token/generate-token', payload)
}

export function validateOtpApi(payload) {
  return apiClient.post('/token/validate-otp', payload)
}

export function refreshTokenApi(payload) {
  return apiClient.post('/token/refresh-token', payload)
}

export function logoutApi(payload) {
  return apiClient.post('/token/logout', payload)
}

export function getCurrentUserApi() {
  return apiClient.get('/api/user/current')
}

export function requestPasswordResetApi(payload) {
  return apiClient.post('/token/request-password-reset', payload)
}