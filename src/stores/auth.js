const useMock = import.meta.env.VITE_USE_MOCK_AUTH === 'true'
import { defineStore } from 'pinia'
import {
  loginApi,
  logoutApi,
  getCurrentUserApi,
  requestPasswordResetApi,
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
    roles: (state) => state.user?.roles || [],
    permissions: (state) => state.user?.permissions || []
  },

  actions: {
    async login(credentials) {
      this.loading = true

      try {
// Mock authentication for development/testing
         if (useMock) {
      const fakeToken = 'mock-token-xyz'

      this.token = fakeToken
      this.user = {
        username: 'mockUser',
        roles: ['ADMIN'],
        permissions: ['VIEW_PROFILE'
  
        ]
      }

      setToken(fakeToken)
      setUser(this.user)

      return
    }
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
          setUser(user)
        }

        return response.data
      } finally {
        this.loading = false
      }
    },

    // async fetchCurrentUser() {
    //   try {
    //     const response = await getCurrentUserApi()
    //     this.user = response.data
    //     setUser(response.data)
    //     return response.data
    //   } catch (error) {
    //     throw error
    //   }
    // },

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
        await logoutApi({
          refreshToken: this.refreshToken
        })
      } catch (error) {
        // optional: log error
      } finally {
        this.logoutLocal()
      }
    },
//     async requestPasswordReset(email) {
//   try {
//     const response = await requestPasswordResetApi({ email }) 
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// },

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
    }
  }
})
