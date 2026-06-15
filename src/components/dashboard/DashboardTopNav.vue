<template>
  <div class="dashboard-topnav">
    <!-- Left: Search -->
    <div class="dashboard-topnav__search">
      <span class="dashboard-topnav__search-icon">
        <img :src="searchIcon" alt="Search" class="dashboard-topnav__search-img"
      ></span>
      <input
        type="text"
        class="dashboard-topnav__search-input"
        placeholder="Search system..."
        @keyup.enter="$emit('search', search)"
      />
    </div>

    <!-- Right -->
    <div class="dashboard-topnav__right">
      <!-- Switch account -->
      <button
        type="button"
        class="dashboard-topnav__icon-button"
        aria-label="Switch account"
        @click="$emit('switch-account')"
      >
        <img
          :src="switchIcon"
          alt="Switch account"
          class="dashboard-topnav__icon-img"
        />
      </button>

      <!-- Notifications -->
      <button
        type="button"
        class="dashboard-topnav__icon-button"
        aria-label="Notifications"
        @click="$emit('notifications')"
      >
        <img
          :src="bellIcon"
          alt="Notifications"
          class="dashboard-topnav__icon-img"
        />
      </button>
      <span class="dashboard-topnav__divider"></span>

      <!-- Profile trigger + dropdown -->
      <div class="dashboard-topnav__profile-wrap" ref="profileWrap">
        <button
          type="button"
          class="dashboard-topnav__user"
          @click="toggleProfileMenu"
          aria-label="Open profile menu"
        >
          <div class="dashboard-topnav__user-text">
            <span class="dashboard-topnav__user-name">{{ userName }}</span>
            <span class="dashboard-topnav__user-role">{{ organisationName }}</span>
          </div>

          <div class="dashboard-topnav__avatar">
            <img
              :src="profileIcon"
              alt="Profile"
              class="dashboard-topnav__avatar-img"
            />
          </div>
        </button>

        
 <div v-if="showProfileMenu" class="dashboard-topnav__dropdown">
    <ProfileDropdown
      :user-name="userName"
      :organisation-name="organisationName"
      @logout="handleLogout"
    />
  </div>

        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import ProfileDropdown from "@/components/dashboard/ProfileDropdown.vue";

import searchIcon from "@/assets/icons/search.svg";
import bellIcon from "@/assets/icons/bell.svg";
import profileIcon from "@/assets/icons/profile.svg";
import switchIcon from "@/assets/icons/switch-account.svg";

defineProps({
  userName: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  hasNotifications: {
    type: Boolean,
    default: true,
  },
  organisationName: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  "search",
  "notifications",
  "switch-account",
  "logout",
]);

const search = ref("");
const showProfileMenu = ref(false);
const profileWrap = ref(null);

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

const handleLogout = () => {
  showProfileMenu.value = false;
  emit("logout");
};

const handleClickOutside = (event) => {
  if (!profileWrap.value) return;

  if (!profileWrap.value.contains(event.target)) {
    showProfileMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.dashboard-topnav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.75rem;
  box-sizing: border-box;
  background: #ffffff;
  border-bottom: 1px solid rgba(141, 110, 99, 0.2);
}

.dashboard-topnav__search {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  max-width: 20rem;
  height: 2.25rem;
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

.dashboard-topnav__divider {
  width: 1px;
  height: 2rem;
  background: #e2ddd6;
}

.dashboard-topnav__profile-wrap {
  position: relative;
}

.dashboard-topnav__user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
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
  font-size: 0.6875rem;
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

.dashboard-topnav__icon-img {
  width: 1rem;
  height: 1rem;
  display: block;
  object-fit: contain;
}

.dashboard-topnav__dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 100;
}

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