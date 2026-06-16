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

  width: 100%; /* ✅ key change */
  max-width: 100%;

  padding: var(--spacing-auto-12, 12px)
           var(--spacing-auto-14, 14px);

  align-items: flex-start;
  gap: var(--spacing-auto-10, 10px);

  border-radius: var(--radius-auto-8, 8px);
  border: var(--stroke-auto-1, 1px) solid
          var(--color-auto-510605-20, rgba(81, 6, 5, 0.20));

  background: var(--color-auto-510605-5, rgba(81, 6, 5, 0.05));
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
  white-space: normal;
  line-height: 20px;

  word-break: break-word;
  overflow-wrap: anywhere;
}

</style>
