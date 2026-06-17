import { defineStore } from 'pinia'
import { clearLastActivity } from '@/utils/activity'

import {
  loginApi,
  logoutApi,
  getCurrentUserApi,
  requestPasswordResetApi,
  validateOtpApi,
  refreshTokenApi
} from '@/api/auth.api'
import {
  getToken,
  getRefreshToken,
  getUser,
  setToken,
  setRefreshToken,
  setUser,
  clearAuthStorage
} from '@/utils/storage'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: getToken(),
    refreshToken: getRefreshToken(),
    user: getUser(),
    loading: false,
    initialized: false,
    refreshPromise: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    username: (state) => state.user?.username || '',
    fullName: (state) => state.user?.fullName || '',
    firstName: (state) => state.user?.firstName || '',
    lastName: (state) => state.user?.lastName || '',
    roles: (state) => state.user?.roles || [],
    permissions: (state) => state.user?.permissions || [],
    organisation: (state) => state.user?.organisation || null
  },

  actions: {
    setAuthState({ accessToken, refreshToken, user }) {
      this.token = accessToken || null
      this.refreshToken = refreshToken || null
      this.user = user || null

      if (accessToken) {
        setToken(accessToken)
      }

      if (refreshToken) {
        setRefreshToken(refreshToken)
      }

      if (user) {
        setUser(user)
      }
    },

    clearPreAuthState() {
      this.token = null
      this.refreshToken = null
      this.user = null
      this.refreshPromise = null

      clearAuthStorage()
    },

    async login(credentials) {
      this.loading = true

      try {
        // ensure login starts from a clean auth state
        this.clearPreAuthState()

        const response = await loginApi(credentials)
        const data = response.data

        // MFA challenge started -> valid response, but no auth token yet
        if (data?.mfaRequired) {
          return data
        }

        const accessToken = data.accessToken || data.token || null
        const refreshToken = data.refreshToken || null
        const user = data.user || null

        if (!accessToken) {
          throw new Error('Login succeeded but no access token was returned.')
        }

        this.setAuthState({ accessToken, refreshToken, user })
        return data
      } finally {
        this.loading = false
      }
    },

    async completeOtpLogin(payload) {
      this.loading = true

      try {
        const response = await validateOtpApi(payload)
        const data = response.data

        const accessToken = data.accessToken || data.token || null
        const refreshToken = data.refreshToken || null
        const user = data.user || null

        if (!accessToken) {
          throw new Error('OTP validation succeeded but no token was returned.')
        }

        this.setAuthState({ accessToken, refreshToken, user })

        sessionStorage.removeItem('pendingOtpUserId')
        sessionStorage.removeItem('pendingOtpUsername')

        return data
      } catch (error) {
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'OTP validation failed. Please try again.'

        throw new Error(errorMessage)
      } finally {
        this.loading = false
      }
    },

    async refreshAccessToken() {
      if (!this.refreshToken) {
        throw new Error('No refresh token available.')
      }

      if (this.refreshPromise) {
        return this.refreshPromise
      }

      this.refreshPromise = (async () => {
        try {
          const response = await refreshTokenApi({
            refreshToken: this.refreshToken
          })

          const data = response.data
          const accessToken = data.accessToken || data.token || null
          const refreshToken = data.refreshToken || null
          const user = data.user || this.user || null

          if (!accessToken) {
            throw new Error('Refresh succeeded but no access token was returned.')
          }

          this.setAuthState({ accessToken, refreshToken, user })
          return accessToken
        } catch (error) {
          this.logoutLocal()
          throw error
        } finally {
          this.refreshPromise = null
        }
      })()

      return this.refreshPromise
    },

    async fetchCurrentUser() {
      const response = await getCurrentUserApi()
      const user = response.data?.user || response.data || null

      if (user) {
        this.user = user
        setUser(user)
      }

      return user
    },

    async initialize() {
      if (this.initialized) return

      try {
        if (this.token && !this.user) {
          await this.fetchCurrentUser()
        }
      } catch (error) {
        try {
          if (this.refreshToken) {
            await this.refreshAccessToken()
            if (!this.user) {
              await this.fetchCurrentUser()
            }
          } else {
            this.logoutLocal()
          }
        } catch {
          this.logoutLocal()
        }
      } finally {
        this.initialized = true
      }
    },

    async logout() {
      try {
        await logoutApi({
          refreshToken: this.refreshToken || null
        })
      } catch (error) {
        // optional logging
      } finally {
        this.logoutLocal()
      }
    },

   logoutLocal() {
  this.token = null
  this.refreshToken = null
  this.user = null
  this.initialized = true
  this.refreshPromise = null

  sessionStorage.removeItem('pendingOtpUserId')
  sessionStorage.removeItem('pendingOtpUsername')

  clearAuthStorage()
  clearLastActivity()
},

    async requestPasswordReset(payload) {
      try {
        const response = await requestPasswordResetApi(payload)
        return response.data
      } catch (error) {
        throw error
      }
    }
  }
})
