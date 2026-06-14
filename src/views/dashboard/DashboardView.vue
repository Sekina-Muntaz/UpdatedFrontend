<template>
  <AppLayout>
    <section>
      <h1>Dashboard</h1>
      <p>Welcome back, {{ authStore.fullName || authStore.username }}.</p>

      <div class="cards">
        <div class="card">
          <h3>Users</h3>
          <p>120</p>
        </div>

        <div class="card">
          <h3>Transactions</h3>
          <p>4,582</p>
        </div>

        <div class="card">
          <h3>Status</h3>
          <p>Operational</p>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/layouts/AppLayout.vue'

const authStore = useAuthStore()
</script>

<style scoped>
.cards {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(160px, 1fr));
  gap: 1rem;
}

.card {
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}
</style>
