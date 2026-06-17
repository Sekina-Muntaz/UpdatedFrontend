import { createRouter, createWebHistory } from "vue-router";
import { pinia } from "@/stores";
import { useAuthStore } from "@/stores/auth.store";

const LoginView = () => import("@/views/auth/LoginView.vue");
const NotFoundView = () => import("@/views/NotFoundView.vue");
const LandingPageView = () => import("@/views/LandingPage.vue");
const ResetPasswordView = () => import("@/views/auth/ResetPasswordView.vue");
const CheckEmailView = () => import("@/views/auth/CheckEmailView.vue");
const VerifyOtpView = () => import("@/views/auth/VerifyOtpView.vue");
const DashboardLayout = () => import("@/layouts/DashboardLayout.vue");

/**
 * Child views inside dashboard layout
 */
const DashboardHomeView = () => import("@/views/dashboard/DashboardHomeView.vue");
const OrganizationsView = () => import("@/views/dashboard/OrganizationView.vue");
const InvoicesView = () => import("@/views/dashboard/InvoiceView.vue");
const AccessDeniedView = () => import("@/views/AccessDeniedView.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingPageView,
      meta: { guestOnly: true, title: "Home" }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guestOnly: true, title: "Login" }
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPasswordView,
      meta: { guestOnly: true, title: "Reset Password" }
    },
    {
      path: "/check-email",
      name: "checkEmail",
      component: CheckEmailView,
      meta: { guestOnly: true, title: "Check Email" }
    },
    {
      path: "/verify-otp",
      name: "verifyOtp",
      component: VerifyOtpView,
      meta: { guestOnly: true, title: "Verify OTP" }
    },
    {
      path: "/403",
      name: "forbidden",
      component: AccessDeniedView,
      meta: { title: "Access Denied" }
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
          redirect: { name: "dashboard" }
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: DashboardHomeView,
          meta: { requiresAuth: true, title: "Dashboard" }
        },
        {
          path: "organizations",
          name: "organizations",
          component: OrganizationsView,
          meta: {
            requiresAuth: true,
            title: "Organizations",
            permissions: [] // e.g. ["CAN_VIEW_ORGANISATIONS"]
          }
        },
        {
          path: "invoices",
          name: "invoices",
          component: InvoicesView,
          meta: {
            requiresAuth: true,
            title: "Invoices",
            permissions: [] // e.g. ["CAN_VIEW_INVOICES"]
          }
        }
      ]
    },

    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
      meta: { title: "Page Not Found" }
    }
  ]
});

function hasRequiredPermission(userPermissions, requiredPermissions) {
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }

  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }

  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );
}

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(pinia);

  if (!authStore.initialized) {
    await authStore.initialize();
  }

  // Protected routes
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({
      name: "login",
      query: {
        redirect: to.fullPath
      }
    });
  }

  // Guest-only routes
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    const redirect = to.query.redirect;

    if (typeof redirect === "string" && redirect.startsWith("/")) {
      return next(redirect);
    }

    return next({ name: "dashboard" });
  }

  // Permission guard
  if (to.meta.requiresAuth) {
    const requiredPermissions = to.meta.permissions || [];
    const userPermissions = authStore.permissions || [];

    const allowed = hasRequiredPermission(userPermissions, requiredPermissions);

    if (!allowed) {
      return next({ name: "forbidden" });
    }
  }

  next();
});

router.afterEach((to) => {
  const appName = import.meta.env.VITE_APP_NAME || "Application";
  document.title = to.meta?.title ? `${to.meta.title} | ${appName}` : appName;
});

export default router;