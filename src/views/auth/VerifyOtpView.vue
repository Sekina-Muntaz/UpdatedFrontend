<template>
  <AuthSplitLayout>
    <VerifyOtpPanel
      :email="displayEmail"
      :initial-countdown="48"
      :is-submitting="loading"
      :error-message="errorMessage"
      @submit="onSubmitOtp"
      @resend="onResendOtp"
    />
  </AuthSplitLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthSplitLayout from '@/components/auth/AuthSplitLayout.vue'
import VerifyOtpPanel from '@/components/auth/VerifyOtpPanel.vue'
import { useAuthStore } from '@/stores/auth'
const errorMessage = ref("");

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)

const userId = computed(() => {
  return route.query.userId || sessionStorage.getItem('pendingOtpUserId') || ''
})

const username = computed(() => {
  return route.query.username || sessionStorage.getItem('pendingOtpUsername') || ''
})

const displayEmail = computed(() => {
  return username.value || 'your registered email address'
})

const onSubmitOtp = async (otp) => {
  if (!userId.value) {
    router.replace({ name: 'login' })
    return
  }

  loading.value = true

  try {
    await authStore.completeOtpLogin({
      userId: Number(userId.value),
      token: otp
    })

    router.push({ name: 'dashboard' })
  } catch (error) {
  
errorMessage.value =
      error.message || 'Invalid OTP code. Please try again.'

    console.error('OTP validation failed:', error)
   
  } finally {
    loading.value = false
  }
}

const onResendOtp = async () => {
  console.log('Resend OTP clicked for userId:', userId.value)
  // plug in resend endpoint when backend provides one
}
</script>