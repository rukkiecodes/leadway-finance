// Existing imports
import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/firebase";

const staticRoutes = [
  {
    path: "/auth",
    component: () => import("@/layouts/user/auth.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/pages/auth/login.vue"),
      },
      {
        path: "getStarted",
        name: "getStarted",
        component: () => import("@/pages/auth/getStarted.vue"),
      },
      {
        path: "accountType",
        name: "accountType",
        component: () => import("@/pages/auth/accountType.vue"),
      },
    ],
  },
  {
    path: "/app",
    name: "home",
    component: () => import("@/layouts/user/app.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "index1",
        component: () => import("@/pages/useer/home.vue"),
      },
      {
        path: "overview",
        name: "index2",
        component: () => import("@/pages/useer/home.vue"),
      },
      {
        path: "plans",
        name: "plans",
        component: () => import("@/layouts/user/plans.vue"),
        children: [
          {
            path: "",
            name: "_plans",
            component: () => import("@/pages/useer/plans/plans.vue"),
          },
          {
            path: "mining",
            name: "_mining",
            component: () => import("@/pages/useer/plans/mining.vue"),
          },
          {
            path: "staking",
            name: "_staking",
            component: () => import("@/pages/useer/plans/staking.vue"),
          },
        ],
      },
      {
        path: "mining",
        name: "mining",
        component: () => import("@/pages/useer/mining.vue"),
      },
      {
        path: "trading",
        name: "trading",
        component: () => import("@/layouts/user/trading.vue"),
        children: [
          {
            path: "",
            name: "_trading",
            component: () => import("@/pages/useer/trading/trading.vue"),
          },
          {
            path: ":symbol",
            name: "_symbol",
            component: () => import("@/pages/useer/trading/symbol.vue"),
          },
        ],
      },
      {
        path: "holding",
        name: "holding",
        component: () => import("@/pages/useer/holding.vue"),
      },
      {
        path: "staking",
        name: "staking",
        component: () => import("@/pages/useer/staking.vue"),
      },
      {
        path: "deposits",
        name: "deposits",
        component: () => import("@/pages/useer/deposits.vue"),
      },
      {
        path: "account",
        name: "account",
        component: () => import("@/layouts/user/account.vue"),
        children: [
          {
            path: "",
            name: "profile",
            component: () => import("@/pages/useer/account/account.vue"),
          },
          {
            path: "updateContactInformation",
            name: "updateContactInformation",
            component: () =>
              import("@/pages/useer/account/updateContactInformation.vue"),
          },
          {
            path: "updateAvatar",
            name: "updateAvatar",
            component: () => import("@/pages/useer/account/updateAvatar.vue"),
          },
          {
            path: "updatePassword",
            name: "updatePassword",
            component: () => import("@/pages/useer/account/updatePassword.vue"),
          },
          {
            path: "updateEmail",
            name: "updateEmail",
            component: () => import("@/pages/useer/account/updateEmail.vue"),
          },
          {
            path: "viewNotifications",
            name: "viewNotifications",
            component: () => import("@/pages/useer/account/viewNotifications.vue"),
          },
        ],
      },
      {
        path: "withdrawals",
        name: "withdrawals",
        component: () => import("@/pages/useer/withdrawals.vue"),
      },
      {
        path: "news",
        name: "news",
        component: () => import("@/pages/useer/news.vue"),
      },
      {
        path: "copytrading",
        name: "copytrading",
        component: () => import("@/pages/useer/copytrading.vue"),
      },
    ],
  },

  {
    path: '/admin',
    name: "admin",
    component: () => import('@/layouts/admin/default.vue'),

    children: [
      {
        path: "",
        name: 'admin_home',
        component: () => import('@/pages/admin/home.vue')
      },
      {
        path: "overview",
        name: 'admin_home_overview',
        component: () => import('@/pages/admin/home.vue')
      },
      {
        path: "clients",
        name: 'admin_clients',
        component: () => import('@/pages/admin/clients.vue')
      },
      {
        path: "copyTrading",
        name: 'admin_copyTrading',
        component: () => import('@/layouts/admin/copyTrading.vue'),

        children: [
          {
            path: "",
            component: () => import('@/pages/admin/copyTrade/copyTrade.vue')
          },
          {
            path: ":trader",
            component: () => import('@/pages/admin/copyTrade/trader.vue')
          },
        ]
      },
      {
        path: "account",
        name: "account",
        component: () => import("@/layouts/admin/account.vue"),
        children: [
          {
            path: "",
            name: "profile",
            component: () => import("@/pages/admin/account/account.vue"),
          },
          {
            path: ":user",
            name: "user_profile",
            component: () => import("@/pages/admin/account/user.vue"),
          },
          {
            path: "updateContactInformation",
            name: "updateContactInformation",
            component: () =>
              import("@/pages/admin/account/updateContactInformation.vue"),
          },
          {
            path: "updateAvatar",
            name: "updateAvatar",
            component: () => import("@/pages/admin/account/updateAvatar.vue"),
          },
          {
            path: "updatePassword",
            name: "updatePassword",
            component: () => import("@/pages/admin/account/updatePassword.vue"),
          },
          {
            path: "updateEmail",
            name: "updateEmail",
            component: () => import("@/pages/admin/account/updateEmail.vue"),
          },
          {
            path: "viewNotifications",
            name: "viewNotifications",
            component: () => import("@/pages/admin/account/viewNotifications.vue"),
          },
        ],
      },
    ]
  }
  // Add other static routes here
];

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
});

let isAuthChecked = false;

// router.beforeEach(async (to, from, next) => {
//   if (!isAuthChecked) {
//     await new Promise((resolve) => {
//       auth.onAuthStateChanged((user) => {
//         isAuthChecked = true;
//         if (to.meta.requiresAuth && !user) {
//           next("/auth/login");
//         } else if (to.path === "/auth" && user) {
//           next("/overview");
//         } else {
//           next();
//         }
//         resolve();
//       });
//     });
//   } else {
//     const user = auth.currentUser;
//     if (to.meta.requiresAuth && !user) {
//       next("/auth/login");
//     } else if (to.path === "/auth" && user) {
//       next("/overview");
//     } else {
//       next();
//     }
//   }
// });

router.beforeEach(async (to, from, next) => {
  if (!isAuthChecked) {
    await new Promise((resolve) => {
      auth.onAuthStateChanged((user) => {
        isAuthChecked = true;
        handleNavigation(user, to, next);
        resolve();
      });
    });
  } else {
    handleNavigation(auth.currentUser, to, next);
  }
});

function handleNavigation(user, to, next) {
  const isAdmin = JSON.parse(localStorage.getItem("leadway_admin"));
  const hasCompletedSetup = localStorage.getItem("leadway_setup_complete"); // Add a flag

  if (to.meta.requiresAuth && !user) {
    return next("/auth/login");
  }

  // Prevent infinite redirect to /auth/accountType
  if (isAdmin && !hasCompletedSetup && to.path !== "/auth/accountType" && !to.path.startsWith("/admin")) {
    return next("/auth/accountType");
  }

  // If user completes setup, set the flag
  if (to.path === "/auth/accountType") {
    localStorage.setItem("leadway_setup_complete", "true");
  }

  if (to.path === "/auth" && user) {
    return next("/app/overview");
  }

  next();
}


// function handleNavigation(user, to, next) {
//   const isAdmin = JSON.parse(localStorage.getItem("leadway_admin")); // Check if admin exists in localStorage
//
//   if (to.meta.requiresAuth && !user) {
//     return next("/auth/login");
//   }
//
//   if (isAdmin && to.path !== "/auth/accountType" && !to.path.startsWith("/admin")) {
//     return next("/auth/accountType");
//   }
//
//   if (to.path === "/auth" && user) {
//     return next("/app/overview");
//   }
//
//   next();
// }

// Function to dynamically add a route
export function addDynamicRoute(route) {
  if (!router.hasRoute(route.name)) {
    router.addRoute(route); // Dynamically adds the route
    console.log(`Dynamic route added: ${route.name}`);
  }
}

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
