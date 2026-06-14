<template>
  <AppLayout>
    <section>
      <h1>Profile</h1>

      <div class="profile-card" v-if="authStore.user">
        <p><strong>Username:</strong> {{ authStore.user.username }}</p>
        <p><strong>Full Name:</strong> {{ authStore.user.fullName }}</p>
        <p><strong>Email:</strong> {{ authStore.user.email }}</p>
        <p><strong>Roles:</strong> {{ authStore.roles.join(', ') }}</p>
      </div>

      <p v-else>No profile loaded.</p>
    </section>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.profile-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 600px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}
</style>
