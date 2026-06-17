<template>
  <div class="login-shell">
  
    <section class="login-shell__panel login-shell__panel--visual">
      <div class="login-shell__overlay">
        <div class="login-shell__visual-top">
          <AppLogo />

          <RouterLink to="/">
            <BaseButton variant="glass" size="back">
              <template #icon>
                <image :src="backIcon" alt="Back Home" />
              </template>

              Back to home
            </BaseButton>
          </RouterLink>
        </div>

        <div class="login-shell__visual-bottom">
          <h1>
            Transparent, timely settlement for Kenya's coffee value chain.
          </h1>
          <p>
            Sign in to manage payments, traceability, and reconciliation across
            Kenya's coffee value chain.
          </p>
        </div>
      </div>
    </section>

    <section class="login-shell__panel login-shell__panel--form">
      <div class="login-shell__form-wrap">
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

          <!-- <div class="login-form__group">
              <div class="login-form__row">
                <label class="login-form__label" for="password">Password</label>
                <a href="#" class="login-form__forgot">Forgot password?</a>
              </div>

              <input
                id="password"
                v-model="form.password"
                class="login-form__input"
                type="password"
                placeholder="Enter your password"
              />
            </div> -->

          <div class="login-form__group">
            <div class="login-form__row">
              <label class="login-form__label" for="password">Password</label>
              <a href="#" class="login-form__forgot">Forgot password?</a>
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
            variant="signin"
            size="lg"
            :disabled="!isFormValid"
            type="submit"
          >
            Sign in
          </BaseButton>

          <p class="login-form__helper">
            Need access? Coffee DSS does not offer public registration. Contact
            your system administrator to be provisioned.
          </p>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import AppLogo from "@/components/shared/AppLogo.vue";
import AppAlert from "../../components/base/AppAlert.vue";
import loginVisualBg from "@/assets/images/login-image.svg";
import BaseButton from "@/components/base/BaseButton.vue";
import backIcon from "@/assets/icons/back-arrow.svg";
import showPasswordIcon from "@/assets/icons/show-password.svg";
import hidePasswordIcon from "@/assets/icons/hide-password.svg";
import authErrorIcon from "@/assets/icons/auth-error.svg";
const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  username: "",
  password: "",
});

const errorMessage = ref("");
const showPassword = ref(false);

const isFormValid = computed(() => {
  return form.username.trim() !== "" && form.password.trim() !== "";
});

const handleLogin = async () => {
  errorMessage.value = "";

  try {
    await authStore.login({
      username: form.username,
      password: form.password,
    });

    // if (!authStore.user) {
    //   await authStore.fetchCurrentUser();
    // }

    router.push("/dashboard");
  } catch (error) {

    console.log("Login error:", error);
    errorMessage.value =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Login failed. Please verify your credentials.";
  }
};
</script>

<style scoped>
.login-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 25% 75%;
  gap: 24px;
  padding: 12px;
  background: #f3f1ed;
  box-sizing: border-box;
}

.login-shell__panel {
  min-height: calc(100vh - 24px);
  border-radius: 8px;
  overflow: hidden;
}

.login-shell__panel--visual {
  position: relative;
  color: #ffffff;
  background:
    linear-gradient(
      192deg,
      rgba(0, 53, 37, 0.2) 5.72%,
      rgba(0, 53, 37, 0.95) 64.48%
    ),
    url("@/assets/images/login-image.svg") center/cover no-repeat;
}

.login-shell__overlay {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
}

.login-shell__visual-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.login-shell__visual-bottom {
  max-width: 430px;
}

.login-shell__visual-bottom p {
  margin: 0 0 64px;
  /* font-size: 16px; */

  align-self: stretch;

  color: rgba(255, 255, 255, 0.7);

  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem; /* 15px */
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 24px */
}

.login-shell__panel--form {
  background: #f8f6f2;
  padding: 32px;
}

.login-shell__form-wrap {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  max-width: 50rem; /* 400px */
  margin: 0 auto;
}

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
  font-size: 1.875rem; /* 30px */
  font-style: normal;
  font-weight: 400;
  line-height: 2.25rem; /* 36px */
  letter-spacing: -0.046875rem; /* -0.75px */
}

.login-form__subtitle {
  margin: 0 0 0;
  align-self: stretch;

  color: rgba(74, 68, 65, 0.75);

  font-family: "Nunito";
  font-size: 1.5rem; /* 15px */
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
  font-size: 0.875rem; /* 14px */
  font-style: normal;
  font-weight: 500;

  line-height: 1.25rem; /* 20px */
}

.login-form__forgot {
  font-size: 13px;
  color: #063e34;
  text-decoration: none;
}

.login-form__input {
  width: 100%;
  height: 48px;
  border: 1px solid #ded9d2;
  border-radius: 8px;
  background: #fffdfa;
  padding: 0 14px;
  outline: none;
}
.login-page__visual-title {
  align-self: stretch;

  color: #ffffff;

  font-family: "Nunito", sans-serif;
  font-size: 1.875rem; /* 30px */
  font-style: normal;
  font-weight: 400;
  line-height: 2.3125rem; /* 37px */
  letter-spacing: -0.046875rem; /* -0.75px */
}

.login-shell__visual-bottom h1 {
  margin: 0 0 16px;
  /* font-size: 28px; */
  color: #ffffff;

  font-family: "Nunito";
  font-size: 1.875rem; /* 30px */
  font-style: normal;
  font-weight: 400;
  line-height: 2.3125rem; /* 37px */
  letter-spacing: -0.046875rem; /* -0.75px */
}

.login-form__password-wrap {
  position: relative;
  width: 100%;
}

.login-form__input--password {
  padding-right: 2.75rem; /* makes room for the icon */
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
  color: #8a8a8a;
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
  font-size: 1rem;   /* 14px */
  font-style: normal;
  font-weight: 400;

  line-height: 1.25rem;  /* 20px */
}


@media (max-width: 960px) {
  .login-shell {
    grid-template-columns: 1fr;
  }

  .login-shell__panel--visual {
    min-height: 320px;
  }

  .login-shell__panel {
    min-height: auto;
  }

  .login-shell__form-wrap {
    justify-content: flex-start;
  }
}

@media (max-width: 960px) {
  .login-shell__visual-top {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
  }
}
</style>
