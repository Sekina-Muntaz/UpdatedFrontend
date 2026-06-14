<template>
  <div class="check-email">
    <IconTile>
      <AppIcon :src="mailIcon" alt="Check your email" />
    </IconTile>

    <h2 class="check-email__title">Check your email</h2>

    <p class="check-email__subtitle">
      We've sent password reset instructions to
      <strong class="check-email__email">{{ email }}</strong>.
      The link expires in 30 minutes.
    </p>

    <div class="check-email__notice">
      <p class="check-email__notice-text">
        Didn't receive it? Check your spam folder, or
        <button type="button" class="check-email__resend" @click="$emit('resend')">
          resend the link.
        </button>
      </p>
    </div>

    <RouterLink to="/login" class="check-email__back">
     <BaseButton variant="text" size="md">
        <template #icon>
            <AppIcon :src="backIcon" alt="Back to sign in" />
          </template>
         
        Back to sign in
      </BaseButton>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import IconTile from "@/components/base/IconTile.vue";
import AppIcon from "@/components/base/AppIcon.vue";
import mailIcon from "@/assets/icons/email.svg";
import backIcon from "@/assets/icons/back-arrow-sign-in.svg";

defineProps({
  email: {
    type: String,
    default: ""
  }
});

defineEmits(["resend"]);
</script>

<style scoped>
.check-email {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.75rem; /* 28px */
}

.check-email__title {
  margin: 0;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 2rem; /* 32px */
  font-style: normal;
  font-weight: 400;
  line-height: 2.25rem; /* 36px */
  letter-spacing: -0.046875rem; /* -0.75px */
}

.check-email__subtitle {
  margin: 0;
  color: rgba(74, 68, 65, 0.75);
  font-family: "Nunito", sans-serif;
  font-size: 1rem; /* 20px */
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 24px */
}

.check-email__email {
  color: #003525;
  font-weight: 500;
}

.check-email__notice {
  width: 100%;
  max-width: 25rem; /* 400px */
  padding: 1rem;
  border-radius: 0.5rem;
  background: rgba(74, 68, 65, 0.05);
  border: 1px solid rgba(74, 68, 65, 0.08);
  box-sizing: border-box;
}

.check-email__notice-text {
  margin: 0;
  color: rgba(74, 68, 65, 0.65);
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem; /* 14px */
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 20px */
}

.check-email__resend {
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  color: #003525;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem; /* 14px */
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 20px */
  cursor: pointer;
}

.check-email__back {
  color: #003525;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem; /* 14px */
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 20px */
  text-decoration: none;
}


</style>