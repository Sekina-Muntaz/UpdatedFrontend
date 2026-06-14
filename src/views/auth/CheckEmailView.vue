<template>
  <AuthSplitLayout>
    <CheckEmailPanel :email="email" @resend="onResend" />
  </AuthSplitLayout>
</template>

<script setup>
import AuthSplitLayout from "@/components/auth/AuthSplitLayout.vue";
import CheckEmailPanel from "@/components/auth/CheckEmailPanel.vue";

const email = "user@example.com"; // Replace with actual email

const onResend = () => {
  // Handle resend logic
};
</script>