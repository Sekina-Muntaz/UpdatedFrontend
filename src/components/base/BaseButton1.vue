<template>
  <button
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.base-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem; /* 10px */

  border: none;
  border-radius: 0.5rem; /* 8px */
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;

  font-family: "DM Sans", sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
  transition: background 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
}

.base-button--primary {
  background: #75af0f;
  color: #ffffff;
}

.base-button--primary:hover {
  background: #679b0d;
}

.base-button--primary:active {
  transform: translateY(1px);
}

.base-button--sm {
  width: 4.875rem;         /* 78px */
  height: 2.5rem;          /* 40px */
  padding: 0.5rem 0.75rem; /* 8px 12px */
  font-size: 0.875rem;
}

.base-button--md {
  min-height: 2.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
}

.base-button--lg {
  min-width: 8.5rem;
  height: 3.5rem;          /* 56px */
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.75rem;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>