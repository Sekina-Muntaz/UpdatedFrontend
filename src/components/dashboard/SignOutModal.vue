<template>
  <div class="signout-modal" @click.self="$emit('close')">
    <div
      class="signout-modal__card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signout-modal-title"
    >
      <button
        type="button"
        class="signout-modal__close"
        aria-label="Close sign out modal"
        @click="$emit('close')"
      >
        ×
      </button>

      <div class="signout-modal__icon-wrap">
        <img :src="logoutIcon" alt="" class="signout-modal__icon" />
      </div>

      <h2 id="signout-modal-title" class="signout-modal__title">
        Sign out of your account?
      </h2>

      <p class="signout-modal__subtitle">
        You will need to sign in again to continue.
      </p>

      <div class="signout-modal__actions">
        <BaseButton
          variant="outline"
          size="modal"
          type="button"
          @click="$emit('close')"
        >
          Cancel
        </BaseButton>

        <BaseButton
          variant="danger"
          size="modal"
          type="button"
          :loading="loading"
          @click="$emit('confirm')"
        >
          Sign out
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import logoutIcon from "@/assets/icons/logout-large.svg";

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close", "confirm"]);
</script>

<style scoped>
.signout-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1.5rem;
  box-sizing: border-box;

  background: rgba(0, 0, 0, 0.48);
}

.signout-modal__card {
  position: relative;

  width: 100%;
  max-width: 33.75rem; /* ~540px */
  padding: 2.25rem 2.375rem 2.5rem;
  border-radius: 1.5rem;
  background: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  box-sizing: border-box;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
}

.signout-modal__close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;

  border: none;
  background: transparent;
  padding: 0;

  color: rgba(74, 68, 65, 0.55);
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
}

.signout-modal__icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 4.75rem;
  height: 4.75rem;
  border-radius: 999px;
  background: rgba(224, 75, 63, 0.10);

  margin-bottom: 1.75rem;
}

.signout-modal__icon {
  width: 2rem;
  height: 2rem;
  display: block;
  object-fit: contain;
}

.signout-modal__title {
  margin: 0;
  color: #1f2d27;
  font-family: "Nunito", sans-serif;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.5rem;
  letter-spacing: -0.02em;
}

.signout-modal__subtitle {
  margin: 1rem 0 0;
  color: rgba(74, 68, 65, 0.75);
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
}

.signout-modal__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  width: 100%;
  margin-top: 2rem;
}

@media (max-width: 640px) {
  .signout-modal__card {
    padding: 1.75rem 1.25rem 1.5rem;
    border-radius: 1rem;
  }

  .signout-modal__title {
    font-size: 1.625rem;
    line-height: 2rem;
  }

  .signout-modal__actions {
    grid-template-columns: 1fr;
  }
}
</style>