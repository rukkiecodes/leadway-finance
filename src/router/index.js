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
            component: () => import('@/pages/plans/plans.vue')
          }
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
        component: () => import("@/pages/trading.vue"),
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
        component: () => import("@/pages/account.vue"),
      },
      {
        path: "withdrawals",
        name: "withdrawals",
        component: () => import("@/pages/withdrawals.vue"),
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
