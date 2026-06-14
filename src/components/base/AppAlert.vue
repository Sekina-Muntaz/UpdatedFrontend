<template>
  <div
    v-if="message"
    class="app-alert"
    :class="`app-alert--${variant}`"
    role="alert"
    aria-live="polite"
  >
    <img
      v-if="icon"
      :src="icon"
      alt=""
    />
    <div class="app-alert__content">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'error'
  }
})
</script>

<style scoped>
.app-alert {
  display: flex;
  width: 50rem;              /* 400px */
  max-width: 100%;
  min-height: 4.4375rem;     /* 71px */
  padding: 0.75rem 0.875rem; /* 12px 14px */
  align-items: flex-start;
  gap: 0.625rem;             /* 10px */
  flex-shrink: 0;

  border-radius: 0.5rem;     /* 8px */
  box-sizing: border-box;
}

/* Error variation */
.app-alert--error {
  border: 1px solid rgba(81, 6, 5, 0.20);
  background: rgba(81, 6, 5, 0.05);
}

.app-alert__icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-top: 0.125rem; /* tiny optical alignment */
  object-fit: contain;
}


.app-alert__content {
  color: #510605;

  font-family: "Nunito", sans-serif;
  font-size: 1rem;   /* 14px */
  font-style: normal;
  font-weight: 400;

  line-height: 1.25rem;  /* 20px */
}
</style>
