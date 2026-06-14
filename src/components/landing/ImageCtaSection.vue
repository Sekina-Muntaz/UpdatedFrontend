<template>
  <section class="image-cta-section">
    <div
      class="image-cta-section__bg"
      :style="{ backgroundImage: `url(${ctaBg})` }"
    ></div>
    <div class="image-cta-section__overlay"></div>

    <div class="image-cta-section__inner">
      <div class="image-cta-section__left">
        <SectionTag :text="tag" />
        <h2 class="image-cta-section__title">{{ title }}</h2>
        <p class="image-cta-section__description">{{ description }}</p>
      </div>

      <div class="image-cta-section__right">
        <BaseButton variant="dark" size="cta"  @click="$emit('open-contact')">
          <template #icon>
            <img
              :src="contactSupportIcon"
              alt=""
              class="auth-shell__back-icon"
            />
          </template>
          {{ buttonText }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import SectionTag from "@/components/base/SectionTag.vue";
import ctaBg from "@/assets/images/manimadd.jpg";
import contactSupportIcon from "@/assets/icons/contact-support.svg";
import AppIcon from "@/components/base/AppIcon.vue";

defineProps({
  tag: String,
  title: String,
  description: String,
  buttonText: String,
});

defineEmits(["open-contact"]);
</script>

<style scoped>
.image-cta-section {
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-self: stretch;

  /* From Figma screenshot */
  padding: 4rem 5.25rem 4.0625rem 5.25rem; /* top 64, right 84, bottom 65, left 84 */

  background: #f7f5f2;
  box-sizing: border-box;
}

.image-cta-section__bg {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.65;
  z-index: 0;
}

.image-cta-section__overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.12);
  z-index: 1;
}

.image-cta-section__inner {
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  width: 100%;
}

.image-cta-section__left {
  display: flex;
  width: 36rem; /* 576px */
  min-height: 8.4375rem; /* 135px */
  padding-top: 0.5625rem; /* 9px */

  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem; /* 14px */
  flex-shrink: 0;
}

.image-cta-section__title {
  margin: 0;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 1.9375rem; /* 31px */
  font-weight: 400;
  line-height: 2.625rem; /* 42px */
}

.image-cta-section__description {
  margin: 0;
  max-width: 30rem;

  color: rgba(74, 68, 65, 0.8);
  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem; /* 15px */
  font-weight: 400;
  line-height: 1.5rem; /* 24px */
}

.image-cta-section__right {
  margin-left: auto;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
}

.image-cta-section__left :deep(.section-tag) {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 0;
}

.image-cta-section__left :deep(.section-tag__line) {
  display: inline-block;
  width: 24px;
  height: 2px;
  flex-shrink: 0;
  background: #68ab00;
  position: relative;
  z-index: 3;
}

.image-cta-section__left :deep(.section-tag__text) {
  color: #003525;
  position: relative;
  z-index: 3;
}

@media (max-width: 900px) {
  .image-cta-section {
    padding: 3rem 1.5rem;
  }

  .image-cta-section__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }

  .image-cta-section__left {
    width: 100%;
    min-height: auto;
    max-width: 100%;
  }

  .image-cta-section__description {
    max-width: 100%;
  }

  .image-cta-section__right {
    margin-left: 0;
    justify-content: flex-start;
  }
}
</style>
