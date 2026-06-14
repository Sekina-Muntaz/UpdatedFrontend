<template>
  <article class="content-card">
    <div class="content-card__icon">
      <slot name="icon" />
    </div>

    <div class="content-card__body">
      <h3 class="content-card__title">{{ title }}</h3>
      <p class="content-card__description">{{ description }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<style scoped>

.content-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1rem;              /* 16px */
  padding: 1.75rem;       /* 28px */

  border-radius: 1rem;    /* 16px */
  border: 1px solid #e7e4df;
  background: #fbfaf8;

  width: 100%;
  min-height: 14.9375rem; /* ~239px feel */

  box-sizing: border-box;
  flex-shrink: 0;
}


/* icon container */
.content-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.5rem;
  height: 2.5rem;

  border-radius: 0.5rem;
  background: #8b5a3c; /* brown from design (adjust if needed) */
}

/* text block */
.content-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* title */
.content-card__title {
  margin: 0;

  color: #315f57;
  font-family: "Nunito", sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5rem;
}

/* description */

.content-card__description {
  margin: 0;

  align-self: stretch;

  color: rgba(74, 68, 65, 0.8);
  font-family: "Nunito", sans-serif;

  font-size: 0.9375rem;  /* 15px */
  font-weight: 400;
  line-height: 1.5rem;   /* 24px */
}

</style>