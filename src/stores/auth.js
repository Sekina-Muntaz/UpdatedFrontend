const useMock = import.meta.env.VITE_USE_MOCK_AUTH === 'true'


import { defineStore } from 'pinia'
import {
  loginApi,
  logoutApi,
  getCurrentUserApi,
  requestPasswordResetApi,
  validateOtpApi
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
    initialized: false
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
    async login(credentials) {
      this.loading = true

      try {

        const response = await loginApi(credentials)

        const accessToken = response.data.accessToken || response.data.token
        const refreshToken = response.data.refreshToken || null
        const user = response.data.user || null

        this.token = accessToken
        this.refreshToken = refreshToken
        this.user = user

        setToken(accessToken)

        if (refreshToken) {
          setRefreshToken(refreshToken)
        }

        if (user) {
          console.log ("User=======================",user)
          setUser(user)
        }

        return response.data
      } finally {
        this.loading = false
      }
    },

   

    async initialize() {
      if (this.initialized) return

      try {
        if (this.token && !this.user) {
          await this.fetchCurrentUser()
        }
      } catch (error) {
        this.logoutLocal()
      } finally {
        this.initialized = true
      }
    },


    async logout() {
  try {
    if (this.user?.username) {
      await logoutApi(this.user.username)
    }
  } catch (error) {
    // optional: log error
  } finally {
    this.logoutLocal()
  }
},


async requestPasswordReset(payload) {
  try {
    const response = await requestPasswordResetApi(payload);
    return response.data;
  } catch (error) {
    throw error;
  }
},
    logoutLocal() {
      this.token = null
      this.refreshToken = null
      this.user = null
      this.initialized = true
      clearAuthStorage()
    },

    
   async completeOtpLogin(payload) {
  this.loading = true

  try {
    const response = await validateOtpApi(payload)
    const data = response.data

    const accessToken = data.accessToken || data.token
    const refreshToken = data.refreshToken || null
    const user = data.user || null

    if (!accessToken) {
      throw new Error('OTP validation succeeded but no token was returned.')
    }

    this.token = accessToken
    this.refreshToken = refreshToken
    this.user = user

    setToken(accessToken)

    if (refreshToken) {
      setRefreshToken(refreshToken)
    }

    if (user) {
      setUser(user)
    }

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
}

  }
})
