<template>
  <div class="profile-dropdown">
    <div class="profile-dropdown__header">
      <p class="profile-dropdown__name">{{ userName }}</p>
      <p class="profile-dropdown__sub">{{ organisationName }}</p>
    </div>

    <BaseButton
      variant="danger-text"
      size="dropdown"
      type="button"
      @click="$emit('logout')"
    >
      <template #icon>
        <img :src="logoutIcon" alt="Logout" class="profile-dropdown__icon" />
      </template>
      Logout
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import logoutIcon from "@/assets/icons/logout.svg";

defineProps({
  userName: {
    type: String,
    default: ""
  },
  organisationName: {
    type: String,
    default: ""
  }
});

defineEmits(["logout"]);
</script>

<style scoped>
.profile-dropdown {
  width: 12.5rem;
  border-radius: 0.375rem;
  background: #ffffff;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
  border: 1px solid rgba(141, 110, 99, 0.14);
  overflow: hidden;
}

.profile-dropdown__header {
  padding: 1rem 1.125rem 0.875rem;
  border-bottom: 1px solid rgba(141, 110, 99, 0.14);
  background: #ffffff;
}

.profile-dropdown__name {
  margin: 0;
  color: #26352f;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
}

.profile-dropdown__sub {
  margin: 0.25rem 0 0;
  color: rgba(74, 68, 65, 0.65);
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
}

.profile-dropdown__icon {
  width: 1rem;
  height: 1rem;
  display: block;
  object-fit: contain;
}
</style>
