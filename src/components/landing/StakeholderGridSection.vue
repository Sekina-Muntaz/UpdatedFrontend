<template>

    <div class="stakeholder-grid-section">
      <SectionHeader
        :tag="tag"
        :title="title"
        :description="description"
        light
      />

      <div class="stakeholder-grid-section__grid">
        <ContentCard
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :description="item.description"
        >
          <template #icon>
            <AppIcon :src="item.icon" />
          </template>
        </ContentCard>
      </div>
    </div>

</template>

<script setup>
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
.stakeholder-grid-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  padding: 4rem 4.8125rem;
  background: linear-gradient(180deg, #6b3e26 0%, #87604c 100%);
  box-sizing: border-box;
  gap: 3rem;
}

.stakeholder-grid-section__container {
  display: flex;
  width: 100%;
  max-width: 76rem;
  padding: 0 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;

  margin: 0 auto;
  box-sizing: border-box;
}

.stakeholder-grid-section__grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem;
}

@media (max-width: 1024px) {
  .stakeholder-grid-section {
    padding: 4rem 2rem;
  }

  .stakeholder-grid-section__container {
    max-width: 100%;
    padding: 0;
  }

  .stakeholder-grid-section__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stakeholder-grid-section {
    padding: 3rem 1rem;
  }

  .stakeholder-grid-section__container {
    gap: 2rem;
  }
}
</style>
