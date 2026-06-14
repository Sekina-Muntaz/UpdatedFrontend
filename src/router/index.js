import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const HomeView = () => import("@/views/HomeView.vue");
const LoginView = () => import("@/views/auth/LoginView.vue");
const DashboardView = () => import("@/views/dashboard/DashboardView.vue");
const ProfileView = () => import("@/views/profile/ProfileView.vue");
const NotFoundView = () => import("@/views/NotFoundView.vue");
const LandingPageView = () => import("@/components/views/LandingPage.vue");
const ResetPasswordView = () => import("@/views/auth/ResetPasswordView.vue");
const CheckEmailView = () => import("@/views/auth/CheckEmailView.vue");
const DashboardLayout = () => import("@/layouts/DashboardLayout.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
  
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "dashboard-home",
          component: DashboardView,
        }
      ],
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,

      meta: {
        requiresAuth: true,
        permissions: ["VIEW_DASHBOARD"],
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
    {
      path: "/",
      name: "landing",
      component: LandingPageView,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPasswordView,
    },
    {
      path: "/check-email",
      name: "CheckEmail",
      component: CheckEmailView,
      meta: { guestOnly: true },
    },
  ],
});

function hasRequiredPermission(userPermissions, requiredPermissions) {
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }

  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }

  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission),
  );
}

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.initialized) {
    await authStore.initialize();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/login");
  }

  // if (to.meta.guestOnly && authStore.isAuthenticated) {
  //   return next("/dashboard");
  // }

  if (to.meta.requiresAuth) {
    const requiredPermissions = to.meta.permissions || [];
    const userPermissions = authStore.permissions || [];

    const allowed = hasRequiredPermission(userPermissions, requiredPermissions);

    if (!allowed) {
      return next("/403");
    }
  }

  next();
});

export default router;
