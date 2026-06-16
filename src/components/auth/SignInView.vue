<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <h2 class="login-form__title">Sign in</h2>

    <p class="login-form__subtitle">
      Authorized stakeholders only. Enter your credentials to continue.
    </p>

    <AppAlert
      v-if="errorMessage"
      variant="error"
      :message="errorMessage"
      :icon="authErrorIcon"
    />

    <div class="login-form__group">
      <label class="login-form__label" for="username">Username</label>
      <input
        id="username"
        v-model="form.username"
        class="login-form__input"
        type="text"
        placeholder="Enter your username"
      />
    </div>

    <div class="login-form__group">
      <div class="login-form__row">
        <label class="login-form__label" for="password">Password</label>

        <RouterLink to="/reset-password" class="login-form__forgot">
          Forgot password?
        </RouterLink>
      </div>

      <div class="login-form__password-wrap">
        <input
          id="password"
          v-model="form.password"
          class="login-form__input login-form__input--password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password"
        />
        <button
          type="button"
          class="login-form__password-toggle"
          @click="showPassword = !showPassword"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
        >
          <img
            :src="showPassword ? hidePasswordIcon : showPasswordIcon"
            alt=""
            class="login-form__password-icon"
          />
        </button>
      </div>
    </div>
    <BaseButton
      type="submit"
      :disabled="!isFormValid"
      variant="signin"
      :loading="isSubmitting"
    >
      {{ isSubmitting ? "Signing in..." : "Sign in" }}
      <template #icon>
        <img :src="forwardIcon" alt="" />
      </template>
    </BaseButton>

    <p class="login-form__helper">
      Need access? Coffee DSS does not offer public registration. Contact your
      system administrator to be provisioned.
    </p>
  </form>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import BaseButton from "@/components/base/BaseButton.vue";
import AppAlert from "@/components/base/AppAlert.vue";
import showPasswordIcon from "@/assets/icons/show-password.svg";
import hidePasswordIcon from "@/assets/icons/hide-password.svg";
import authErrorIcon from "@/assets/icons/auth-error.svg";
import forwardIcon from "@/assets/icons/forward.svg";

const MULTIFACTOR_ENABLED = import.meta.env.VITE_MULTIFACTOR === "true";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  username: "",
  password: "",
});

const errorMessage = ref("");
const showPassword = ref(false);
const isSubmitting = ref(false);

const isFormValid = computed(() => {
  return form.username.trim() !== "" && form.password.trim() !== "";
});

const handleLogin = async () => {
  errorMessage.value = "";
  isSubmitting.value = true;

  try {
    const response = await authStore.login({
      username: form.username,
      password: form.password,
      multifactor: MULTIFACTOR_ENABLED,
    });

    if (response?.mfaRequired) {
      const userId = String(response.userId ?? "");

      if (!userId) {
        throw new Error("OTP flow initiated but userId was not returned.");
      }

      // optional: preserve for refresh/revisit on OTP screen
      sessionStorage.setItem("pendingOtpUserId", userId);
      sessionStorage.setItem("pendingOtpUsername", form.username);

      router.push({
        name: "verifyOtp",
        query: {
          userId,
          username: form.username,
        },
      });
    } else {
      router.push({ name: "dashboard" });
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Login failed. Please verify your credentials.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
}

.login-form__title {
  margin: 0;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.25rem;
  letter-spacing: -0.046875rem;
}

.login-form__subtitle {
  margin: 0;
  align-self: stretch;
  color: rgba(74, 68, 65, 0.75);
  font-family: "Nunito", sans-serif;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
}

.login-form__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.login-form__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.login-form__label {
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
}

.login-form__forgot {
  font-size: 13px;
  color: #063e34;
  text-decoration: underline;
}

.login-form__input {
  width: 100%;
  height: 48px;
  border: 1px solid #ded9d2;
  border-radius: 8px;
  background: #fffdfa;
  padding: 0 14px;
  outline: none;
  box-sizing: border-box;
}

.login-form__password-wrap {
  position: relative;
  width: 100%;
}

.login-form__input--password {
  padding-right: 2.75rem;
}

.login-form__password-toggle {
  position: absolute;
  top: 50%;
  right: 0.875rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.login-form__password-icon {
  width: 1rem;
  height: 1rem;
  display: block;
  object-fit: contain;
}

.login-form__helper {
  margin: 0;
  color: rgba(74, 68, 65, 0.65);
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
}
</style>
