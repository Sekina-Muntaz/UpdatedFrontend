<template>
  <header class="landing-navbar">
    <div
      class="landing-navbar__bg"
      :style="{ backgroundImage: `url(${navbarBg})` }"
    ></div>

    <div class="landing-navbar__inner landing-navbar__container">
      <div class="landing-navbar__left">
        <AppLogo class="landing-navbar__logo" />
      </div>

      <div class="landing-navbar__right">
        <!-- Desktop nav -->
        <nav class="landing-navbar__nav">
          <a
            v-for="item in items"
            :key="item.label"
            :href="item.href"
            class="landing-navbar__link"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="landing-navbar__menu-button"
          aria-label="Toggle menu"
          @click="isMenuOpen = !isMenuOpen"
        >
      
          ☰
        </button>

        <RouterLink
          to="/login"
          class="landing-navbar__login-link landing-navbar__login-link--desktop"
        >
          <BaseButton variant="primary" size="sm">Login</BaseButton>
        </RouterLink>
      </div>
    </div>

    <!-- Mobile dropdown -->
    <div v-if="isMenuOpen" class="landing-navbar__mobile-menu">
      <nav class="landing-navbar__mobile-nav">
        <a
          v-for="item in items"
          :key="item.label"
          :href="item.href"
          class="landing-navbar__mobile-link"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </a>
        <RouterLink to="/login">
          <BaseButton variant="primary" size="sm">Login</BaseButton>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import AppLogo from "@/components/shared/AppLogo.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import navbarBg from "@/assets/images/navbar-bg.png";
// import menuIcon from "@/assets/icons/menu.svg" 

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const isMenuOpen = ref(false);
</script>

<style scoped>
.landing-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  min-height: 4.5625rem; /* 73px */
  overflow: visible;
  background-color: #003c33;
}

.landing-navbar__bg {
  position: absolute;
  inset: 0;
  background: center / cover no-repeat;
  z-index: 0;
}

.landing-navbar__container {
  width: min(100% - 1.5rem, 108rem);
  margin: 0 auto;
}

.landing-navbar__inner {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 4.5625rem;
  padding: 1rem 0 1.0625rem 0;
  gap: 1rem;
  min-width: 0;
}

.landing-navbar__left {
  display: flex;
  align-items: center;
  min-width: 0;
  flex-shrink: 1;
}

.landing-navbar__logo {
  display: block;
  max-width: 100%;
}

.landing-navbar__right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3.25rem;
  flex-shrink: 0;
}

.landing-navbar__nav {
  display: flex;
  align-items: center;
  gap: 3.25rem;
}

.landing-navbar__link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
}

.landing-navbar__login-link {
  text-decoration: none;
  flex-shrink: 0;
}

.landing-navbar__menu-button {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;
}

.landing-navbar__mobile-menu {
  position: relative;
  z-index: 2;
  background: #003c33;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.75rem 1rem 1rem;
}

.landing-navbar__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.landing-navbar__mobile-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.landing-navbar__mobile-login {
  text-decoration: none;
  margin-top: 0.25rem;
  display: inline-flex;
}

/* Slightly tighter on medium screens */
@media (max-width: 1200px) {
  .landing-navbar__right,
  .landing-navbar__nav {
    gap: 2rem;
  }
}

/* Hide desktop nav earlier for comfort */
@media (max-width: 960px) {
  .landing-navbar__nav {
    display: none;
  }

  .landing-navbar__menu-button {
    display: inline-flex;
  }

  .landing-navbar__right {
    gap: 0.75rem;
  }
}

/* Smaller screens */
@media (max-width: 640px) {
  .landing-navbar__container {
    width: min(100% - 1rem, 108rem);
  }

  .landing-navbar__inner {
    min-height: 4rem;
    padding: 0.75rem 0;
  }

  .landing-navbar__left {
    flex: 1;
    min-width: 0;
  }

  .landing-navbar__login-link--desktop {
    display: none;
  }

  .landing-navbar__menu-button {
    display: inline-flex;
  }
}
</style>
