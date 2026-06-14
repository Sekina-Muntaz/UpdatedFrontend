<template>
  <div class="app-shell">
    <aside class="sidebar">
      <AppSidebar />
    </aside>

    <div class="main-area">
      <AppHeader />
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/layouts/AppHeader.vue'
import AppSidebar from '@/components/layouts/AppSidebar.vue'
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 240px 1fr;
  background: #f7f8fa;
}

.sidebar {
  background: #1f2937;
  color: white;
}

.main-area {
  display: flex;
  flex-direction: column;
}

.content {
  padding: 1.5rem;
}
</style>