import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const LoginView = () => import("@/views/auth/LoginView.vue");

const NotFoundView = () => import("@/views/NotFoundView.vue");
const LandingPageView = () => import("@/views/LandingPage.vue");
const ResetPasswordView = () => import("@/views/auth/ResetPasswordView.vue");
const CheckEmailView = () => import("@/views/auth/CheckEmailView.vue");
const VerifyOtpView= () => import("@/views/auth/VerifyOtpView.vue")
const DashboardLayout = () => import("@/layouts/DashboardLayout.vue");

/**
 * Child views inside dashboard layout
 */
const DashboardHomeView = () => import("@/views/dashboard/DashboardHomeView.vue");
const OrganizationsView = () => import("@/views/dashboard/OrganizationView.vue");
const InvoicesView = () => import("@/views/dashboard/InvoiceView.vue");


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingPageView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPasswordView,
      meta: { guestOnly: true },
    },
    {
      path: "/check-email",
      name: "checkEmail",
      component: CheckEmailView,
      meta: { guestOnly: true },
    },
    {
      path: "/verify-otp",
      name: "verifyOtp",
      component: VerifyOtpView,
    },

    /**
     * Dashboard shell
     */
    {
      path: "/app",
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          redirect: { name: "dashboard" },
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: DashboardHomeView,
          meta: { requiresAuth: true, title: "Dashboard" },
        },
        {
          path: "organizations",
          name: "organizations",
          component: OrganizationsView,
          meta: { requiresAuth: true, title: "Organizations" },
        },
         {
          path: "invoices",
          name: "invoices",
          component: InvoicesView,
          meta: { requiresAuth: true, title: "Invoices" },
        }
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
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
  //   return next({ name: "dashboard" });
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