<template>
  <form class="reset-form" @submit.prevent="handleSubmit">
    <h2 class="reset-form__title">Reset your password</h2>

    <p class="reset-form__subtitle">
      Enter the email linked to your account and we'll send reset instructions.
    </p>

  
<AppAlert
  v-if="errorMessage"
  variant="error"
  :message="errorMessage"
  :icon="authErrorIcon"
/>


    <div class="reset-form__group">
      <label class="reset-form__label" for="email">Email address</label>
      <input
        id="email"
        v-model.trim="email"
        class="reset-form__input"
        type="email"
        placeholder="you@example.com"
        autocomplete="email"
      />
    </div>

    <BaseButton
      variant="signin"
      size="lg"
      type="submit"
      :disabled="submitting || !isValid"
    >

     <template #icon>
        <img :src="forwardIcon" alt="" />
      </template>
   
      {{ submitting ? "Sending..." : "Send reset link" }}
    </BaseButton>

    <RouterLink to="/login" class="reset-form__back">
      <BaseButton variant="text" size="md">
        <template #icon>
          <img
            :src="backIcon"
            alt=""
            class="auth-shell__back-icon"
          /> </template
        >Back to sign in
      </BaseButton>
    </RouterLink>
  </form>
</template>
<script setup>
import { computed, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import BaseButton from "@/components/base/BaseButton.vue";
import AppAlert from "@/components/base/AppAlert.vue";
import authErrorIcon from "@/assets/icons/auth-error.svg";
import backIcon from "@/assets/icons/back-arrow-sign-in.svg";
import forwardIcon from "@/assets/icons/forward.svg";

import { useAuthStore } from "@/stores/auth";


const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const submitting = ref(false);
const errorMessage = ref("");

const isValid = computed(() => email.value.trim() !== "");

const handleSubmit = async () => {
  errorMessage.value = "";
  submitting.value = true;

  try {
    const response = await authStore.requestPasswordReset({
      username: email.value
    });

    // Backend returns 200 even for business errors
    if (response?.error) {
      errorMessage.value =
        response.message ||
        "Unable to process your request. Please check the details and try again.";
      return;
    }

    // Success -> go straight to check email page
    router.push({
      name: "checkEmail",
      query: { email: email.value }
    });
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to process your request at the moment.";
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.reset-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
}

.reset-form__title {
  margin: 0;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 1.875rem; /* 30px */
  font-style: normal;
  font-weight: 400;
  line-height: 2.25rem; /* 36px */
  letter-spacing: -0.046875rem; /* -0.75px */
}

.reset-form__subtitle {
  margin: 0;
  align-self: stretch;
  color: rgba(74, 68, 65, 0.75);
  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem; /* 15px */
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 24px */
}

.reset-form__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reset-form__label {
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem; /* 14px */
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 20px */
}

.reset-form__input {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  border: 1px solid #ded9d2;
  border-radius: 8px;
  background: #fffdfa;
  padding: 0 14px;
  outline: none;

  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.25rem;
}

.reset-form__input::placeholder {
  color: rgba(74, 68, 65, 0.4);
}

.reset-form__back {
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  text-decoration: none;
}
</style>
