<template>
  <div class="dashboard-layout">
    <aside class="dashboard-layout__sidenav">
      <DashboardSideNav class="dashboard-layout__sidenav-panel" />
    </aside>

    <div class="dashboard-layout__main">
      <header class="dashboard-layout__topbar">
        <DashboardTopNav
          :title="pageTitle"
          :user-name="displayName"
          :username="authStore.username"
          :user-role="userRole"
          :has-notifications="true"
          :organisation-name="organisationName"
          @search="onSearch"
          @notifications="onNotifications"
          @profile="onProfile"
          @switch-account="onSwitchAccount"
          @logout="openSignOutModal"
        />
      </header>

      <main class="dashboard-layout__content">
        <RouterView />
      </main>
    </div>

    <SignOutModal
      v-if="showSignOutModal"
      :loading="isLoggingOut"
      @close="closeSignOutModal"
      @confirm="confirmLogout"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import DashboardSideNav from "@/components/dashboard/DashboardSideNav.vue";
import DashboardTopNav from "@/components/dashboard/DashboardTopNav.vue";
import SignOutModal from "@/components/dashboard/SignOutModal.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const showSignOutModal = ref(false);
const isLoggingOut = ref(false);

const pageTitle = computed(() => route.meta?.title || "Dashboard");

const displayName = computed(() => {
  const fullName = `${authStore.firstName || ""} ${authStore.lastName || ""}`.trim();
  return fullName || authStore.username || "User";
});

const userRole = computed(() => {
  if (Array.isArray(authStore.roles) && authStore.roles.length > 0) {
    return authStore.roles[0];
  }
  return "User";
});

const organisationName = computed(() => authStore.organisation?.organisationName || "");

const onSearch = (query) => {
  console.log("Search:", query);
};

const onNotifications = () => {
  console.log("Open notifications");
};

const onProfile = () => {
  console.log("Open profile menu");
};

const onSwitchAccount = () => {
  console.log("Open switch account modal");
};

const openSignOutModal = () => {
  showSignOutModal.value = true;
};

const closeSignOutModal = () => {
  showSignOutModal.value = false;
};

const confirmLogout = async () => {
  isLoggingOut.value = true;

  try {
    await authStore.logout();
    router.push({ name: "login" });
  } finally {
    isLoggingOut.value = false;
    showSignOutModal.value = false;
  }
};
</script>

<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: 15.5rem 1fr;
  min-height: 100vh;
  background: #f7f5f2;
  box-sizing: border-box;
}

.dashboard-layout__sidenav {
  min-height: 100vh;
}

.dashboard-layout__sidenav-panel {
  min-height: 100vh;
}

.dashboard-layout__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
}

.dashboard-layout__topbar {
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 20;
  background: #ffffff;
}

.dashboard-layout__content {
  flex: 1;
  min-width: 0;
  min-height: 0;
  padding: 1.5rem;
  overflow: auto;
  box-sizing: border-box;
}

@media (max-width: 1024px) {
  .dashboard-layout {
    grid-template-columns: 15.5rem 1fr;
  }

  .dashboard-layout__content {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
  }

  .dashboard-layout__sidenav {
    display: none;
  }

  .dashboard-layout__content {
    padding: 0.875rem;
  }
}
</style>
