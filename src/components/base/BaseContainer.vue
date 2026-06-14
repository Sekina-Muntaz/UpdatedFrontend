<template>
  <div class="base-container" :class="{ 'base-container--wide': wide }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  wide: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.base-container {
  width: min(100% - 48px, var(--container-width));
  margin: 0 auto;
}

.base-container--wide {
  width: min(100% - 16px, 108rem);
}
</style>
