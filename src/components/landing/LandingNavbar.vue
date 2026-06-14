<template>
  <header class="landing-navbar">
    <div
      class="landing-navbar__bg"
      :style="{ backgroundImage: `url(${navbarBg})` }"
    ></div>

    <div class="landing-navbar__inner landing-navbar__container">

       <div class="landing-navbar__left">
        <AppLogo />
      </div>

      <div class="landing-navbar__right">
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

        <RouterLink to="/login" class="landing-navbar__login-link">
          <BaseButton variant="primary" size="sm">Login</BaseButton>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AppLogo from '@/components/shared/AppLogo.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import navbarBg from '@/assets/images/navbar-bg.png'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>

.landing-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  min-height: 4.5625rem; /* 73px */
  overflow: hidden;
  background-color: #003c33;
}


.landing-navbar__bg {
  position: absolute;
  inset: 0;
  background: center / cover no-repeat;
  z-index: 0;
}

.landing-navbar__inner {
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  min-height: 4.5625rem;
  padding: 1rem 0 1.0625rem 0; /* 16px 0 17px 0 */
}



.landing-navbar__left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.landing-navbar__right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3.25rem; /* 52px */
}

.landing-navbar__nav {
  display: flex;
  align-items: center;
  gap: 3.25rem; /* 52px */
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
}


.landing-navbar__container {
  width: min(100% - 0.25rem, 108rem);
  margin: 0 auto;
}



@media (max-width: 1024px) {
  .landing-navbar__right,
  .landing-navbar__nav {
    gap: 1.5rem;
  }
}

@media (max-width: 860px) {
  .landing-navbar__nav {
    display: none;
  }

  .landing-navbar__right {
    gap: 0;
  }
}
</style>