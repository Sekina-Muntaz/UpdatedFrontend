<template>
  <div>
    <LandingNavbar :items="navItems" />



    <HeroSection
      title="Transparent, timely settlement for Kenya's coffee value chain."
      description="Coffee DSS is a secure financial settlement system connecting every party in the coffee trade, from farmers to brokers to buyers."
      button-text="Login"
      :button-link="{ to: '/login' }"
    />

    <FeatureGridSection
      tag="What is Coffee DSS?"
      title="Coffee DSS is a digital settlement system that moves payments across Kenya's coffee value chain with full traceability."
      :items="features"
    />

    <StakeholderGridSection
      tag="Who uses Coffee DSS?"
      title="Six stakeholder groups, one settlement system."
      description="Every party in the value chain works from the same trusted record, with access scoped to their role."
      :items="stakeholders"
    />

    <ImageCtaSection
      tag="Contact"
      title="Questions about access or support?"
      description="Coffee DSS access is provisioned by administrators. The support team responds within one business day."
      button-text="Contact Support"

    @open-contact="openContactModal"
    />

    <LandingFooter />

    
 <ContactModal
      v-if="showContactModal"
      @close="closeContactModal"
      @submit="handleContactSubmit"
    />

  </div>
</template>

<script setup>

import { ref } from "vue";
import LandingNavbar from '@/components/landing/LandingNavbar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import FeatureGridSection from '@/components/landing/FeatureGridSection.vue'
import StakeholderGridSection from '@/components/landing/StakeholderGridSection.vue'
import ImageCtaSection from '@/components/landing/ImageCtaSection.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import ContactModal from "@/components/support/ContactModal.vue";

import { navItems, features, stakeholders } from '@/data/landing.js'


const showContactModal = ref(false);


const openContactModal = () => {
  showContactModal.value = true;
};

const closeContactModal = () => {
  showContactModal.value = false;
};


const handleContactSubmit = async (payload) => {
  console.log("Contact form payload:", payload);

  // TODO: call your backend API here

  showContactModal.value = false;
};
</script>