<template>
  <section
    class="hero-section"
    :style="{
      backgroundImage: `linear-gradient(
        115deg,
        rgba(0, 78, 56, 0.8) 16.59%,
        rgba(0, 74, 53, 0.73) 51.64%,
        rgba(0, 42, 30, 0.2) 85.38%
      ), url(${heroBg})`,
    }"
  >
    <BaseContainer wide>
      <div class="hero-section__layout">
        <div class="hero-section__content">
          <h1 class="hero-section__title">{{ title }}</h1>
          <p class="hero-section__description">{{ description }}</p>

          <div class="hero-section__actions">
            <RouterLink
              v-if="buttonLink"
              v-bind="buttonLink"
              class="hero-section__cta-link"
            >
              <BaseButton variant="primary" size="lg">{{ buttonText }}</BaseButton>
            </RouterLink>

            <BaseButton v-else variant="primary" size="lg">{{ buttonText }}</BaseButton>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import BaseContainer from "@/components/base/BaseContainer.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import heroBg from "@/assets/images/coffee-hero.png";

defineProps({
  title: String,
  description: String,
  buttonText: String,
  buttonLink: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>
.hero-section {
  display: flex;
  align-items: center;
  align-self: stretch;
  min-height: calc(100vh - 4.5625rem); /* viewport minus navbar height */

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  color: #ffffff;
}

.hero-section__layout {
  display: flex;
  align-items: center;
  min-height: calc(100vh - 4.5625rem);

  /* translated from Figma padding */
  padding: 16.15625rem 0 12.71875rem 0;
  /* 258.5px top, 203.5px bottom */
}

.hero-section__content {
  display: flex;
  width: 38.5rem; /* 616px */
  max-width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem; /* 24px */
}

.hero-section__title {
  margin: 0;
  color: #fff;
  font-family: "DM Sans", sans-serif;
  font-size: 2.75rem; /* 44px */
  font-weight: 600;
  line-height: 3.3125rem; /* 53px */
  letter-spacing: -0.06875rem; /* -1.1px */
}

.hero-section__description {
  margin: 0;
  color: #b8cfc4;
  font-family: "Nunito", sans-serif;
  font-size: 1rem; /* 16px */
  font-weight: 500;
  line-height: 1.421875rem; /* 22.75px */
}

.hero-section__cta-link {
  text-decoration: none;
}
.hero-section__actions {
  display: flex;
  width: 36rem; /* 576px */
  max-width: 100%;
  min-height: 3.5rem; /* 56px */

  padding-top: 0.5rem; /* 8px */

  align-items: center;
  align-content: center;

  gap: 1rem; /* 16px */
  flex-wrap: wrap;
}

@media (max-width: 1200px) {
  .hero-section__layout {
    padding: 10rem 0 8rem 0;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
  }

  .hero-section__layout {
    min-height: auto;
    padding: 7rem 0 5rem 0;
  }

  .hero-section__content {
    width: 100%;
  }

  .hero-section__title {
    font-size: 2.25rem;
    line-height: 1.2;
  }
}
</style>
