// Existing imports
import {createRouter, createWebHistory} from "vue-router";

// Static Routes
import Auth from "@/layouts/auth.vue";
import App from "@/layouts/app.vue";

import Login from "@/pages/login.vue";
import GetStarted from "@/pages/getStarted.vue";

const staticRoutes = [
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
      },
      {
        path: "getStarted",
        name: "getStarted",
        component: GetStarted,
      },
    ]
  },
  {
    path: "/",
    name: "home",
    component: App,
    meta: {requiresAuth: true},
    children: [
      {
        path: "",
        name: "index1",
        component: () => import("@/pages/home.vue"),
      },
      {
        path: "overview",
        name: "index2",
        component: () => import("@/pages/home.vue"),
      },
      {
        path: "plans",
        name: "plans",
        component: () => import("@/layouts/plans.vue"),
        children: [
          {
            path: "",
            name: "_plans",
            component: () => import('@/pages/plans/plans.vue')
          },
          {
            path: "mining",
            name: "_mining",
            component: () => import('@/pages/plans/mining.vue')
          },
          {
            path: "staking",
            name: "_staking",
            component: () => import('@/pages/plans/staking.vue')
          },
        ]
      },
      {
        path: "mining",
        name: "mining",
        component: () => import("@/pages/mining.vue"),
      },
      {
        path: "trading",
        name: "trading",
        component: () => import("@/layouts/trading.vue"),

        children: [
          {
            path: "",
            name: "_trading",
            component: () => import('@/pages/trading/trading.vue')
          },
          {
            path: ":symbol",
            name: "_symbol",
            component: () => import('@/pages/trading/symbol.vue')
          },
        ]
      },
      {
        path: "holding",
        name: "holding",
        component: () => import("@/pages/holding.vue"),
      },
      {
        path: "staking",
        name: "staking",
        component: () => import("@/pages/staking.vue"),
      },
      {
        path: "deposits",
        name: "deposits",
        component: () => import("@/pages/deposits.vue"),
      },
      {
        path: "account",
        name: "account",
        component: () => import("@/layouts/account.vue"),

        children: [
          {
            path: "",
            name: "profile",
            component: () => import('@/pages/account/account.vue')
          },
          {
            path: "updateContactInformation",
            name: "updateContactInformation",
            component: () => import('@/pages/account/updateContactInformation.vue')
          },
          {
            path: "updateAvatar",
            name: "updateAvatar",
            component: () => import('@/pages/account/updateAvatar.vue')
          },
          {
            path: "updatePassword",
            name: "updatePassword",
            component: () => import('@/pages/account/updatePassword.vue')
          },
          {
            path: "updateEmail",
            name: "updateEmail",
            component: () => import('@/pages/account/updateEmail.vue')
          },
          {
            path: "viewNotifications",
            name: "viewNotifications",
            component: () => import('@/pages/account/viewNotifications.vue')
          },
        ]
      },
      {
        path: "withdrawals",
        name: "withdrawals",
        component: () => import("@/pages/withdrawals.vue"),
      },
      {
        path: "news",
        name: "news",
        component: () => import("@/pages/news.vue"),
      },
      {
        path: "copytrading",
        name: "copytrading",
        component: () => import("@/pages/copytrading.vue"),
      },
    ],
  },
  // Add other static routes here
];

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
});

// Function to dynamically add a route
export function addDynamicRoute(route) {
  if (!router.hasRoute(route.name)) {
    router.addRoute(route); // Dynamically adds the route
    console.log(`Dynamic route added: ${route.name}`);
  }
}

// Navigation Guard
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("LeadWayUser") || "null");

  if (to.meta.requiresAuth && !user) {
    next("/auth/login");
  } else if (to.path === "/auth" && user) {
    next("/overview");
  } else {
    next();
  }
});

// Handle dynamic import errors
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
