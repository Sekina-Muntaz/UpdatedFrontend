<template>
  <div class="section-header" :class="{ 'section-header--light': light }">
    <SectionTag v-if="tag" :text="tag" />

    <h2 class="section-header__title">{{ title }}</h2>

    <p v-if="description" class="section-header__description">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
import SectionTag from './SectionTag.vue'

defineProps({
  tag: String,
  title: {
    type: String,
    required: true
  },
  description: String,
  light: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.section-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: flex-start;
  gap: 1rem;

  width: 100%;
  max-width: 50rem;
  margin: 0;
  color: var(--color-text);
}

.section-header--light {
  color: #ffffff;
}


.section-header__title {
  margin: 0;

  color: #003525;
  font-family: "Nunito", sans-serif;

  font-size: 1.9375rem;   /* 31px */
  font-weight: 400;
  line-height: 2.625rem;  /* 42px */
}



.section-header__description {
  margin: 0;

  align-self: stretch;

  color: #6f7d78; /* default (light section like features) */
  font-family: "Nunito", sans-serif;

  font-size: 0.9375rem; /* 15px */
  font-weight: 400;
  line-height: 1.5rem;  /* 24px */
}

.section-header--light .section-header__description {
  align-self: stretch;

  color: #fbfaf8; 
  font-family: "Nunito", sans-serif;

  font-size: 0.9375rem; /* 15px */
  font-weight: 400;
  line-height: 1.5rem;  /* 24px */
}




@media (max-width: 768px) {
  .section-header {
    max-width: 100%;
  }

  .section-header__title {
    font-size: 2rem;
    line-height: 1.2;
  }
}


</style>