<template>
  <div class="dashboard-layout">
    <DashboardSideNav class="dashboard-layout__sidenav" />

    <div class="dashboard-layout__main">
      <DashboardTopNav class="dashboard-layout__topnav" />

      <main class="dashboard-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import DashboardSideNav from '@/components/dashboard/DashboardSideNav.vue'
import DashboardTopNav from '@/components/dashboard/DashboardTopNav.vue'
</script>

<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: 15.5rem 1fr;
  min-height: 100vh;
  background: #f7f5f2;
}

.dashboard-layout__sidenav {
  min-height: 100vh;
}

.dashboard-layout__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dashboard-layout__topnav {
  flex-shrink: 0;
}

.dashboard-layout__content {
  flex: 1;
  padding: 1.5rem;
  overflow: auto;
}
</style>