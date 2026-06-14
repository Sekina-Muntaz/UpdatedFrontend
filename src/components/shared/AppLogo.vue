<template>
  <img
    class="app-logo"
    :src="logo"
    alt="Kenya Coffee Direct"
  />
</template>

<script setup>
import logo from '@/assets/brand/logo.png'
</script>

<style scoped>
.app-logo {
  height: 2.75rem;
  width: auto;
  display: block;
  object-fit: contain;
}
</style>