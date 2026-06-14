<template>
  <div class="auth-shell">
    <!-- LEFT PANEL -->
    <section class="auth-shell__panel auth-shell__panel--visual">
      <div class="auth-shell__overlay">
        <div class="auth-shell__visual-top">
          <AppLogo />

          <RouterLink to="/" class="auth-shell__back-link">
            <BaseButton variant="glass" size="back">
              <template #icon>
                <img :src="backIcon" alt="" class="auth-shell__back-icon" />
              </template>
              Back to home
            </BaseButton>
          </RouterLink>
        </div>

        <div class="auth-shell__visual-bottom">
          <h1 class="auth-shell__visual-title">
            Transparent, timely settlement for Kenya's coffee value chain.
          </h1>
          <p class="auth-shell__visual-text">
            Sign in to manage payments, traceability, and reconciliation across
            Kenya's coffee value chain.
          </p>
        </div>
      </div>
    </section>

    <!-- RIGHT PANEL -->
    <section class="auth-shell__panel auth-shell__panel--form">
      <div class="auth-shell__form-wrap">
        <slot />
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import AppLogo from "@/components/shared/AppLogo.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import backIcon from "@/assets/icons/back-arrow.svg";
</script>

<style scoped>
.auth-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 24px;
  padding: 12px;
  background: #f3f1ed;
  box-sizing: border-box;
}

.auth-shell__panel {
  min-height: calc(100vh - 24px);
  border-radius: 8px;
  overflow: hidden;
}

.auth-shell__panel--visual {
  position: relative;
  color: #ffffff;
  background:
    linear-gradient(
      192deg,
      rgba(0, 53, 37, 0.20) 5.72%,
      rgba(0, 53, 37, 0.95) 64.48%
    ),
    url("/src/assets/images/login-image.svg") center/cover no-repeat;
}

.auth-shell__overlay {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
}

.auth-shell__visual-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.auth-shell__back-link {
  display: inline-flex;
  text-decoration: none;
}

.auth-shell__back-icon {
  width: 14px;
  height: 14px;
  display: block;
  object-fit: contain;
}

.auth-shell__visual-bottom {
  max-width: 430px;
}

.auth-shell__visual-title {
  margin: 0 0 16px;
  color: #ffffff;
  font-family: "Nunito", sans-serif;
  font-size: 1.875rem;      /* 30px */
  font-style: normal;
  font-weight: 400;
  line-height: 2.3125rem;   /* 37px */
  letter-spacing: -0.046875rem; /* -0.75px */
}

.auth-shell__visual-text {
  margin: 0 0 64px;
  align-self: stretch;
  color: rgba(255, 255, 255, 0.7);
  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem;     /* 15px */
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;      /* 24px */
}

.auth-shell__panel--form {
  background: #f8f6f2;
  padding: 32px;
}

.auth-shell__form-wrap {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  max-width: 50rem; /* 400px */
  margin: 0 auto;
}

@media (max-width: 960px) {
  .auth-shell {
    grid-template-columns: 1fr;
  }

  .auth-shell__panel--visual {
    min-height: 320px;
  }

  .auth-shell__panel {
    min-height: auto;
  }

  .auth-shell__form-wrap {
    justify-content: flex-start;
  }

  .auth-shell__visual-top {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
  }
}
</style>