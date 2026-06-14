<template>
  <div class="section-tag">
    <span class="section-tag__line"></span>
    <span class="section-tag__text">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  light: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.section-tag {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.section-tag__line {
  display: inline-block;
  width: 24px;
  height: 1px;
  flex-shrink: 0;
  background: #68ab00;
}

.section-tag__text {
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
</style>