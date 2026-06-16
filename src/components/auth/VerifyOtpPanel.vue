<template>
  <section class="verify-otp-panel">
    <div class="verify-otp-panel__content">
      <h1 class="verify-otp-panel__title">Verify your identity</h1>

      <p class="verify-otp-panel__description">
        We sent a 6-digit OTP code to your registered email address.
      </p>

      <p class="verify-otp-panel__email">{{ email }}</p>
        <AppAlert
        v-if="errorMessage"

        variant="error"
        :message="errorMessage"
        :icon="authErrorIcon"
      />

      <div class="verify-otp-panel__field-group">
        <label class="verify-otp-panel__label">Enter OTP</label>



        <div class="verify-otp-panel__otp-row" @paste="handlePaste">
          <template v-for="(digit, index) in otpDigits" :key="index">
            <input
              :ref="(el) => setOtpRef(el, index)"
              v-model="otpDigits[index]"
              type="text"
              inputmode="numeric"
              maxlength="1"
              class="verify-otp-panel__otp-input"
              :class="{
                'verify-otp-panel__otp-input--filled': otpDigits[index],
              }"
              autocomplete="one-time-code"
              @input="handleInput(index, $event)"
              @keydown="handleKeydown(index, $event)"
            />

            <span
              v-if="index === 2"
              class="verify-otp-panel__otp-separator"
              aria-hidden="true"
            >
              —
            </span>
          </template>
        </div>
      </div>

      
    

      <BaseButton
      type="submit"
      :disabled="isSubmitting || !isComplete"
      variant="signin"
       @click="submitOtp"
      :loading="isSubmitting"
      >
       <template #icon>
        <img :src="forwardIcon" alt="" />
      </template>
      {{ isSubmitting ? "Verifying..." : "Verify & Sign in" }}

      </BaseButton>



      <p class="verify-otp-panel__resend-text">
        <template v-if="countdown > 0">
          Resend code in
          <span class="verify-otp-panel__resend-time">{{ countdown }}s</span>
        </template>

        <button
          v-else
          type="button"
          class="verify-otp-panel__resend-button"
          @click="resendCode"
        >
          Resend code
        </button>
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import AppAlert from "../base/AppAlert.vue";
import authErrorIcon from "@/assets/icons/auth-error.svg"
import BaseButton from "@/components/base/BaseButton.vue";
import forwardIcon from "@/assets/icons/forward.svg";

 



const props = defineProps({
  email: {
    type: String,
    default: "",
  },
  initialCountdown: {
    type: Number,
    default: 48,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
   errorMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["submit", "resend"]);

const otpDigits = ref(["", "", "", "", "", ""]);
const otpRefs = ref([]);
const countdown = ref(props.initialCountdown);
let timer = null;

const isComplete = computed(() =>
  otpDigits.value.every((digit) => digit !== ""),
);

const otpCode = computed(() => otpDigits.value.join(""));

const setOtpRef = (el, index) => {
  if (el) {
    otpRefs.value[index] = el;
  }
};

const focusInput = (index) => {
  const input = otpRefs.value[index];
  if (input) {
    input.focus();
    input.select();
  }
};

const handleInput = (index, event) => {
  const value = event.target.value.replace(/\D/g, "");

  otpDigits.value[index] = value;

  if (value && index < otpDigits.value.length - 1) {
    focusInput(index + 1);
  }
};

const handleKeydown = (index, event) => {
  if (event.key === "Backspace") {
    if (otpDigits.value[index]) {
      otpDigits.value[index] = "";
      return;
    }

    if (index > 0) {
      focusInput(index - 1);
      otpDigits.value[index - 1] = "";
    }
  }

  if (event.key === "ArrowLeft" && index > 0) {
    event.preventDefault();
    focusInput(index - 1);
  }

  if (event.key === "ArrowRight" && index < otpDigits.value.length - 1) {
    event.preventDefault();
    focusInput(index + 1);
  }
};

const handlePaste = (event) => {
  const pasted = event.clipboardData
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, 6);

  if (!pasted) return;

  event.preventDefault();

  pasted.split("").forEach((char, i) => {
    otpDigits.value[i] = char || "";
  });

  const nextIndex = Math.min(pasted.length, 5);
  focusInput(nextIndex);
};

const submitOtp = () => {
  if (!isComplete.value || props.isSubmitting) return;

  emit("submit", otpCode.value);
};

const resendCode = () => {
  otpDigits.value = ["", "", "", "", "", ""];
  focusInput(0);
  countdown.value = props.initialCountdown;
  emit("resend");
  startCountdown();
};

const startCountdown = () => {
  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
};

onMounted(() => {
  focusInput(0);

  if (countdown.value > 0) {
    startCountdown();
  }
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.verify-otp-panel {
  width: 100%;
  max-width: 34.125rem; /* 546px */
}

.verify-otp-panel__content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.verify-otp-panel__title {
  margin: 0;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 3rem; /* 48px */
  font-style: normal;
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.06rem;
}

.verify-otp-panel__description {
  margin: 1.5rem 0 0 0;
  color: rgba(74, 68, 65, 0.75);
  font-family: "Nunito", sans-serif;
  font-size: 1rem; /* 16px */
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 28px */
}

.verify-otp-panel__email {
  margin: 0;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
}

.verify-otp-panel__field-group {
  margin-top: 2.5rem;
}

.verify-otp-panel__label {
  display: inline-block;
  margin-bottom: 1rem;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
}

.verify-otp-panel__otp-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: nowrap;
  margin-bottom: 1.5rem;
}

.verify-otp-panel__otp-input {
  width: 4.625rem; /* 74px */
  height: 4.9375rem; /* 79px */
  border-radius: 0.875rem;
  border: 1px solid #d8d2ca;
  background: #fff;
  box-sizing: border-box;
  text-align: center;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.verify-otp-panel__otp-input:focus {
  border-color: #68ab00;
  box-shadow: 0 0 0 3px rgba(104, 171, 0, 0.12);
}

.verify-otp-panel__otp-input--filled {
  border-color: #c9d8b5;
}

.verify-otp-panel__otp-separator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  color: #d8d2ca;
  font-family: "Nunito", sans-serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1;
}




.verify-otp-panel__resend-text {
  margin: 1rem 0 0 0;
  text-align: center;
  color: rgba(74, 68, 65, 0.65);
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
}

.verify-otp-panel__resend-time {
  color: #003525;
  font-weight: 700;
}

.verify-otp-panel__resend-button {
  border: none;
  background: transparent;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.75rem;
  cursor: pointer;
  padding: 0;
}

@media (max-width: 768px) {
  .verify-otp-panel {
    max-width: 100%;
  }

  .verify-otp-panel__title {
    font-size: 2.25rem;
    line-height: 1.2;
  }

  /* .verify-otp-panel__otp-row {
    gap: 0.5rem;
  } */

  .verify-otp-panel__otp-input {
    width: 3.5rem;
    height: 4rem;
    border-radius: 0.75rem;
    font-size: 1.5rem;
  }
}

@media (max-width: 520px) {
  .verify-otp-panel__title {
    font-size: 1.875rem;
    letter-spacing: -0.04rem;
  }

  .verify-otp-panel__description,
  .verify-otp-panel__email,
  .verify-otp-panel__label,
  .verify-otp-panel__resend-text {
    font-size: 0.9375rem;
    line-height: 1.5rem;
  }

  /* .verify-otp-panel__otp-row {
    gap: 0.375rem;
  } */

  .verify-otp-panel__otp-input {
    width: 2.875rem;
    height: 3.5rem;
    border-radius: 0.625rem;
    font-size: 1.25rem;
  }

  .verify-otp-panel__otp-separator {
    width: 0.75rem;
    font-size: 1.5rem;
  }

 

}
</style>
