<template>

    <div class="feature-grid-section">
      <SectionHeader
        :tag="tag"
        :title="title"
        :description="description"
      />

      <div class="feature-grid-section__grid">
        <ContentCard
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :description="item.description"
        >
          
 <template #icon>
          <AppIcon :src="item.icon" :alt="item.title" />
          </template>
        </ContentCard>
      </div>
    </div>
</template>


<script setup>
import BaseContainer from '@/components/base/BaseContainer.vue'
import SectionHeader from '@/components/base/SectionHeader.vue'
import ContentCard from '@/components/base/ContentCard.vue'
import AppIcon from '@/components/base/AppIcon.vue'

defineProps({
  tag: String,
  title: String,
  description: String,
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.feature-grid-section {
  display: flex;
  padding: 4rem 4.8125rem; /* 64px top/bottom, 77px left/right */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  border-top: 1px solid #e7e4df;
  border-bottom: 1px solid #e7e4df;
  background: #fff;
  box-sizing: border-box;
  gap: 3rem; /* 48px */
}

.feature-grid-section__container {
  display: flex;
  width: 100%;
  max-width: 76rem; /* 1216px */
  padding: 0 2rem; /* 32px left/right */
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem; /* 48px */

  margin: 0 auto;
  box-sizing: border-box;
}

.feature-grid-section__grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem; /* 28px */
}

@media (max-width: 1024px) {
  .feature-grid-section {
    padding: 4rem 2rem;
  }

  .feature-grid-section__container {
    max-width: 100%;
    padding: 0;
  }

  .feature-grid-section__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .feature-grid-section {
    padding: 3rem 1rem;
  }

  .feature-grid-section__container {
    gap: 2rem;
  }
}
</style>
