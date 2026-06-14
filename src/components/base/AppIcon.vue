<template>
  <img
    class="app-icon"
    :src="src"
    :alt="alt"
  />
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.app-icon {
  width: 1.25rem;
  height: 1.25rem;
  display: block;
  object-fit: contain;
  flex-shrink: 0;
}
</style>