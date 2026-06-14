<template>
  <div class="dashboard-topnav">
    <!-- Left: Search -->
    <div class="dashboard-topnav__search">
      <span class="dashboard-topnav__search-icon">
        <img :src="searchIcon" alt="Search" class="dashboard-topnav__icon" />
      </span>
      <input
        type="text"
        class="dashboard-topnav__search-input"
        placeholder="Search system..."
        @keyup.enter="$emit('search', search)"
      />    
        
      
    </div>

    <!-- Right -->
    <div class="dashboard-topnav__right">
      <button
        type="button"
        class="dashboard-topnav__icon-button"
        aria-label="Notifications"
        @click="$emit('notifications')"
      >
        <img :src="bellIcon" alt="Notifications" class="dashboard-topnav__icon" />
        <span v-if="hasNotifications" class="dashboard-topnav__dot"></span>
      </button>

      <span class="dashboard-topnav__divider"></span>

      <div class="dashboard-topnav__user" @click="$emit('profile')">
        <div class="dashboard-topnav__user-text">
          <span class="dashboard-topnav__user-name">{{ userName }}</span>
          <span class="dashboard-topnav__user-role">{{ userRole }}</span>
        </div>

        <div class="dashboard-topnav__avatar">
          <img :src="profileIcon" alt="" class="dashboard-topnav__icon-img"
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import searchIcon from "@/assets/icons/search.svg";
import bellIcon from "@/assets/icons/bell.svg";
import profileIcon from "@/assets/icons/profile.svg";

defineProps({
  userName: {
    type: String,
    default: "Salem"
  },
  userRole: {
    type: String,
    default: "DSS Operations"
  },
  hasNotifications: {
    type: Boolean,
    default: true
  }
});

defineEmits(["search", "notifications", "profile"]);

const search = ref("");
</script>

<style scoped>
.dashboard-topnav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  min-height: 4rem;
  padding: 0.75rem 1.5rem;
  box-sizing: border-box;

  background: #f7f5f2;
}

/* Search */
.dashboard-topnav__search {
  display: flex;
  align-items: center;
  gap: 0.625rem;

  width: 100%;
  max-width: 20rem;
  height: 2.5rem;
  padding: 0 0.875rem;

  border: 1px solid #d8d2ca;
  border-radius: 0.375rem;
  background: #f8f5ef;
  box-sizing: border-box;
}

.dashboard-topnav__search-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.dashboard-topnav__search-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;

  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
}

.dashboard-topnav__search-input::placeholder {
  color: rgba(74, 68, 65, 0.45);
}

/* Right section */
.dashboard-topnav__right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.dashboard-topnav__icon-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;
  padding: 0;

  border: none;
  background: transparent;
  cursor: pointer;
}

.dashboard-topnav__dot {
  position: absolute;
  top: 0.15rem;
  right: 0.1rem;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 999px;
  background: #d5312f;
}

/* Divider */
.dashboard-topnav__divider {
  width: 1px;
  height: 2rem;
  background: #e2ddd6;
}

/* User */
.dashboard-topnav__user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.dashboard-topnav__user-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.125rem;
}

.dashboard-topnav__user-name {
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1rem;
}

.dashboard-topnav__user-role {
  color: rgba(74, 68, 65, 0.6);
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem; /* 11px */
  font-weight: 400;
  line-height: 0.875rem;
}

.dashboard-topnav__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  background: #e8ece6;
  flex-shrink: 0;
}

/* Generic icon img */
.dashboard-topnav__icon-img {
  width: 1rem;
  height: 1rem;
  display: block;
  object-fit: contain;
}

/* Tablet */
@media (max-width: 960px) {
  .dashboard-topnav {
    padding: 0.75rem 1rem;
  }

  .dashboard-topnav__search {
    max-width: 15rem;
  }

  .dashboard-topnav__user-text {
    display: none;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .dashboard-topnav {
    gap: 0.75rem;
  }

  .dashboard-topnav__search {
    max-width: none;
  }

  .dashboard-topnav__divider {
    display: none;
  }
}
</style>
