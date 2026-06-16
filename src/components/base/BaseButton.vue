<template>
  <!-- <button
    class="base-button"
    :class="[
      `base-button--${variant}`,
      `base-button--${size}`,
      { 'base-button--loading': loading }

    ]"
    :type="type"
    :disabled="disabled || loading"
  >


    
<span v-if="$slots.icon && !loading" class="base-button__icon"> 
      <slot name="icon" />
    </span>
      <span class="base-button__label">
      <slot />
    </span>
    <span v-if="loading" class="base-button__icon">
      <img :src="spinner" alt="Loading..." class="base-button__spinner" />
    </span>
  
  </button> -->
  <button
  class="base-button"
  :class="[
    `base-button--${variant}`,
    `base-button--${size}`,
    { 'base-button--loading': loading }
  ]"
  :type="type"
  :disabled="disabled || loading"
>
  <!-- icon before label for non-submit buttons -->
  <span
    v-if="$slots.icon && !loading && type !== 'submit'"
    class="base-button__icon"
  >
    <slot name="icon" />
  </span>

  <span class="base-button__label">
    <slot />
  </span>

  <!-- icon after label for submit buttons -->
  <span
    v-if="$slots.icon && !loading && type === 'submit'"
    class="base-button__icon"
  >
    <slot name="icon" />
  </span>

  <!-- spinner always after label -->
  <span v-if="loading" class="base-button__icon">
    <img :src="spinner" alt="Loading..." class="base-button__spinner"/>
    </span>
    </button>
</template>

<script setup>
import spinner from '@/assets/icons/spinner.svg'
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
  },
  loading: {
  type: Boolean,
  default: false
}
})
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* 8px */
  flex-shrink: 0;

  border: none;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;

  font-family: "Nunito", sans-serif;
  font-style: normal;
  transition: background 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
}

.base-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.base-button__label {
  display: inline-flex;
  align-items: center;
}

/* Variants */
.base-button--primary {
  background: #75af0f;
  color: #ffffff;
}

.base-button--primary:hover {
  background: #679b0d;
}

.base-button--dark {
  background: #003525;
  color: #ffffff;
}

.base-button--dark:hover {
  background: #002a20;
}

.base-button--danger-text {
  background: #ffffff;
  color: #e04b3f;
  border: none;
}

.base-button--danger-text:hover {
  background: rgba(224, 75, 63, 0.04);
}

.base-button--outline {
  background: #ffffff;
  color: #1f2d27;
  border: 1px solid #d9d5ce;
}

.base-button--outline:hover {
  background: #f8f6f2;
}

.base-button--danger {
  background: #e23a47;
  color: #ffffff;
  border: none;
}

.base-button--danger:hover {
  background: #d52f3d;
}

/* translucent button */
.base-button--glass {
  background: rgba(255, 255, 255, 0.7);
  color: #7a7a7a;
  backdrop-filter: blur(2px);
  padding: 8px 12px;
  border-radius: 8px;
}

.base-button--glass:hover {
  background: rgba(255, 255, 255, 0.82);
}

.base-button--signin {
  min-width: 8.5rem;
  height: 3.5rem;
  padding: 0 1.5rem;
  border-radius: 0.75rem;

  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
  background: #68ab00;
  color: #ffffff;
}

.base-button--text {
  background: transparent;
  border: none;

  color: #003525;

  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;   /* 14px */
  font-weight: 500;
  line-height: 1.25rem; /* 20px */

  padding: 0;
  height: auto;

  cursor: pointer;
}


.base-button--text:hover {
  text-decoration: underline;
}


/* Sizes */
.base-button--sm {
  width: 4.875rem;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;

  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1rem;
}

.base-button--md {
  min-height: 2.75rem;
  padding: 0 1rem;
  border-radius: 0.5rem;

  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1rem;
}

.base-button--lg {
  min-width: 8.5rem;
  height: 3.5rem;
  padding: 0 1.5rem;
  border-radius: 0.75rem;

  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
}

.base-button--dropdown {
  display: flex;
  height: 2.5625rem;          /* 41px */
  padding: 0.625rem 1rem;     /* 10px 16px */
  align-items: center;
  gap: 0.625rem;              /* 10px */
  flex-shrink: 0;
  align-self: stretch;

  width: 100%;
  justify-content: flex-start;

  border-radius: 0;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;            /* adjust if needed */
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
}
.base-button--modal {
  display: inline-flex;
  width: 100%;
  height: 3.25rem;            /* ~52px */
  padding: 0 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-radius: 0.75rem;

  font-family: "Nunito", sans-serif;
  font-size: 1.125rem;         /* ~18px */
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
}
/* CTA button */
.base-button--cta {
  width: 11.625rem;       /* 186px */
  height: 2.75rem;        /* 44px */
  padding: 0 1.5rem;      /* 24px */
  border-radius: 0.25rem; /* 4px */

  font-size: 0.9375rem;   /* 15px */
  font-weight: 600;
  line-height: 1rem;
}

.base-button:disabled {
  /* opacity: 0.6; */
  cursor: not-allowed;
}

.base-button:active {
  transform: translateY(1px);
}
.base-button__spinner {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.base-button--loading {
  pointer-events: none;
  opacity: 0.8;
}





</style>