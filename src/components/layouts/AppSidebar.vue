<template>
  <nav class="sidebar-nav">
    <h3 class="brand">Menu</h3>

    <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
    <RouterLink to="/profile" class="nav-link">Profile</RouterLink>
  </nav>
</template>

<style scoped>
.sidebar-nav {
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
}

.brand {
  margin-bottom: 1rem;
}

.nav-link {
  color: #f9fafb;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.12);
}
</style>