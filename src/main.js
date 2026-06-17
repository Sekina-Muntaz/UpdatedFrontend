import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'
import { pinia } from '@/stores'
import { useAuthStore } from '@/stores/auth.store'
import { setLastActivity } from '@/utils/activity'
import { startSessionWatcher } from '@/utils/sessionWatcher'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')

const activityEvents = ['click', 'keydown', 'scroll', 'touchstart', 'mousemove']
let activityTimeout = null

function recordActivity() {
  if (activityTimeout) return

  activityTimeout = setTimeout(() => {
    setLastActivity()
    activityTimeout = null
  }, 1000)
}

activityEvents.forEach((eventName) => {
  window.addEventListener(eventName, recordActivity, { passive: true })
})

// record initial activity when app starts
setLastActivity()

// start background session watcher
startSessionWatcher()

window.addEventListener('storage', (event) => {
  const watchedKeys = ['token', 'refreshToken', 'user']

  if (!watchedKeys.includes(event.key)) return

  const authStore = useAuthStore(pinia)

  if (!localStorage.getItem('token')) {
    authStore.logoutLocal()
  }
})