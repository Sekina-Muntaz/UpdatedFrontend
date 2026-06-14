<template>
  <header class="header">
    <div>
      <h2>Coffee Dss</h2>
    </div>

    <div class="right">
      <span v-if="authStore.user">Hi, {{ authStore.fullName || authStore.username }}</span>
      <button @click="handleLogout">Logout</button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.header {
  height: 64px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

button {
  border: none;
  background: #dc2626;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}
</style>
