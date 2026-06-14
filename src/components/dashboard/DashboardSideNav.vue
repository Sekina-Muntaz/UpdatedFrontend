<template>
  <aside class="dashboard-sidenav">
    <!-- Top / brand -->
    <div class="dashboard-sidenav__brand">
      <RouterLink to="/app/dashboard" class="dashboard-sidenav__brand-link">
        logo
      </RouterLink>
    </div>

    <!-- Navigation -->
    <nav class="dashboard-sidenav__nav" aria-label="Main navigation">
      <div
        v-for="item in items"
        :key="item.label"
        class="dashboard-sidenav__item-wrap"
      >
        <!-- Simple item -->
        <RouterLink
          v-if="!item.children"
          :to="item.to"
          class="dashboard-sidenav__item"
          :class="{ 'dashboard-sidenav__item--active': isActive(item) }"
        >
          <span class="dashboard-sidenav__icon">
            item.icon
          </span>
          <span class="dashboard-sidenav__label">{{ item.label }}</span>
        </RouterLink>

        <!-- Expandable item -->
        <button
          v-else
          type="button"
          class="dashboard-sidenav__item dashboard-sidenav__item--group"
          :class="{ 'dashboard-sidenav__item--active': isGroupActive(item) }"
          @click="toggleGroup(item.label)"
        >
          <span class="dashboard-sidenav__item-left">
            <span class="dashboard-sidenav__icon">
              item.icon
            </span>
            <span class="dashboard-sidenav__label">{{ item.label }}</span>
          </span>

          <span
            class="dashboard-sidenav__chevron"
            :class="{ 'dashboard-sidenav__chevron--open': isOpen(item.label) }"
          >
            ▾
          </span>
        </button>

        <div
          v-if="item.children && isOpen(item.label)"
          class="dashboard-sidenav__children"
        >
          <RouterLink
            v-for="child in item.children"
            :key="child.label"
            :to="child.to"
            class="dashboard-sidenav__child"
            :class="{ 'dashboard-sidenav__child--active': isChildActive(child) }"
          >
            <span class="dashboard-sidenav__child-label">{{ child.label }}</span>
          </RouterLink>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

import logo from "@/assets/brand/logo.png";

/**
 * Replace these with your real icons
 */
import dashboardIcon from "@/assets/icons/dashboard.svg";
import organizationsIcon from "@/assets/icons/organization.svg";
import auctionIcon from "@/assets/icons/auction.svg";
import invoicesIcon from "@/assets/icons/invoice.svg";
import paymentsIcon from "@/assets/icons/payments.svg";
import settlementsIcon from "@/assets/icons/settlement.svg";
import transactionsIcon from "@/assets/icons/transactions.svg";
import reportsIcon from "@/assets/icons/reports.svg";
import chargesIcon from "@/assets/icons/charges.svg";

const route = useRoute();

const openGroups = ref(["Auction"]); // default open groups if needed

const items = [
  {
    label: "Dashboard",
    to: "/app/dashboard",
    icon: dashboardIcon,
  },
  {
    label: "Organizations",
    to: "/app/organizations",
    icon: organizationsIcon,
  },
  {
    label: "Auction",
    icon: auctionIcon,
    children: [
      { label: "Auction Files", to: "/app/auction/files" },
      { label: "Auction Results", to: "/app/auction/results" },
    ],
  },
  {
    label: "Invoices",
    to: "/app/invoices",
    icon: invoicesIcon,
  },
  {
    label: "Payments",
    to: "/app/payments",
    icon: paymentsIcon,
  },
  {
    label: "Settlements",
    to: "/app/settlements",
    icon: settlementsIcon,
  },
  {
    label: "Charges",
    to: "/app/charges",
    icon: chargesIcon,
  },
  {
    label: "Transactions",
    to: "/app/transactions",
    icon: transactionsIcon,
  },
  {
    label: "Reports",
    to: "/app/reports",
    icon: reportsIcon,
  },
];

const toggleGroup = (label) => {
  if (openGroups.value.includes(label)) {
    openGroups.value = openGroups.value.filter((item) => item !== label);
  } else {
    openGroups.value.push(label);
  }
};

const isOpen = (label) => openGroups.value.includes(label);

const isActive = (item) => route.path === item.to;

const isChildActive = (child) => route.path === child.to;

const isGroupActive = (item) => {
  return item.children?.some((child) => route.path === child.to);
};
</script>

<style scoped>
.dashboard-sidenav {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:
    linear-gradient(
      180deg,
      rgba(0, 53, 37, 0.96) 0%,
      rgba(0, 53, 37, 0.88) 100%
    ),
    url("/images/coffee-sidenav-bg.jpg") center/cover no-repeat;
  color: #ffffff;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

/* Brand */
.dashboard-sidenav__brand {
  padding: 1rem 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.dashboard-sidenav__brand-link {
  display: inline-flex;
  text-decoration: none;
}

.dashboard-sidenav__logo {
  max-width: 10rem;
  width: 100%;
  display: block;
  object-fit: contain;
}

/* Navigation */
.dashboard-sidenav__nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 0.5rem 1.25rem;
}

.dashboard-sidenav__item-wrap {
  display: flex;
  flex-direction: column;
}

.dashboard-sidenav__item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;

  min-height: 2.75rem;
  width: 100%;
  padding: 0 0.875rem;

  border-radius: 0.5rem;
  border: none;
  background: transparent;

  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;

  box-sizing: border-box;
  transition: background 0.2s ease, color 0.2s ease;
}

.dashboard-sidenav__item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.dashboard-sidenav__item--active {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  position: relative;
}

.dashboard-sidenav__item--active::before {
  content: "";
  position: absolute;
  left: -0.5rem;
  top: 0;
  bottom: 0;
  width: 0.1875rem;
  border-radius: 999px;
  background: #68ab00;
}

.dashboard-sidenav__item--group {
  justify-content: space-between;
}

.dashboard-sidenav__item-left {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

/* Icons */
.dashboard-sidenav__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
}

.dashboard-sidenav__icon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.dashboard-sidenav__label {
  white-space: nowrap;
}

.dashboard-sidenav__chevron {
  font-size: 0.875rem;
  line-height: 1;
  opacity: 0.9;
  transition: transform 0.2s ease;
}

.dashboard-sidenav__chevron--open {
  transform: rotate(180deg);
}

/* Children */
.dashboard-sidenav__children {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  margin-top: 0.25rem;
  margin-left: 2.375rem;
}

.dashboard-sidenav__child {
  display: flex;
  align-items: center;
  min-height: 2.125rem;
  padding: 0 0.5rem;
  border-radius: 0.375rem;

  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  transition: background 0.2s ease, color 0.2s ease;
}

.dashboard-sidenav__child:hover {
  background: rgba(255, 255, 255, 0.05);
}

.dashboard-sidenav__child--active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.dashboard-sidenav__child-label {
  white-space: nowrap;
}

/* Tablet */
@media (max-width: 1024px) {
  .dashboard-sidenav__brand {
    padding: 1rem 0.75rem 1rem;
  }

  .dashboard-sidenav__logo {
    max-width: 8rem;
  }

  .dashboard-sidenav__item {
    padding: 0 0.75rem;
  }
}

/* Mobile: hidden by layout on small screens */
@media (max-width: 768px) {
  .dashboard-sidenav {
    min-height: auto;
  }
}
</style>