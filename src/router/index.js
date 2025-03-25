// Existing imports
import {createRouter, createWebHistory} from "vue-router";
import {auth} from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

const staticRoutes = [
  {
    path: '/',
    name: 'Peripheral_Home',
    component: () => import('@/layouts/peripherals/default.vue'),

    children: [
      {
        path: '',
        name: 'Peripheral_Home_index',
        component: () => import('@/pages/peripherals/index.vue')
      }
    ]
  },

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
    ],
  },


  {
    path: "/app",
    name: "home",
    component: () => import("@/layouts/user/app.vue"),
    meta: {requiresAuth: true},
    children: [
      {
        path: "",
        name: "index1",
        component: () => import("@/pages/user/home.vue"),
      },
      {
        path: "overview",
        name: "index2",
        component: () => import("@/pages/user/home.vue"),
      },
      {
        path: "plans",
        name: "plans",
        component: () => import("@/pages/user/plans.vue")
      },
      {
        path: "history",
        name: "history",
        component: () => import("@/pages/user/history.vue"),
      },
      {
        path: "transactions",
        name: "transactions",
        component: () => import("@/pages/user/transactions.vue"),
      },
      {
        path: "trading",
        name: "trading",
        component: () => import("@/layouts/user/trading.vue"),
        children: [
          {
            path: "",
            name: "_trading",
            component: () => import("@/pages/user/trading/trading.vue"),
          },
          {
            path: ":symbol",
            name: "_symbol",
            component: () => import("@/pages/user/trading/symbol.vue"),
          },
        ],
      },
      {
        path: "deposits",
        name: "deposits",
        component: () => import("@/pages/user/deposits.vue"),
      },
      {
        path: "profile",
        name: "profile_page",
        component: () => import("@/layouts/user/account.vue"),
        children: [
          {
            path: "",
            name: "user_profile_page",
            component: () => import("@/pages/user/account/account.vue"),
          },
          {
            path: "updateContactInformation",
            name: "user_profile_updateContactInformation",
            component: () =>
              import("@/pages/user/account/updateContactInformation.vue"),
          },
          {
            path: "updateAvatar",
            name: "user_profile_updateAvatar",
            component: () => import("@/pages/user/account/updateAvatar.vue"),
          },
          {
            path: "updatePassword",
            name: "user_profile_updatePassword",
            component: () => import("@/pages/user/account/updatePassword.vue"),
          },
          {
            path: "updateEmail",
            name: "user_profile_updateEmail",
            component: () => import("@/pages/user/account/updateEmail.vue"),
          },
          {
            path: "verifyAccount",
            name: "user_profile_verifyAccount",
            component: () => import("@/pages/user/account/verifyAccount.vue"),
          },
        ],
      },
      {
        path: "withdrawals",
        name: "withdrawals",
        component: () => import("@/pages/user/withdrawals.vue"),
      },
      {
        path: "news",
        name: "news",
        component: () => import("@/pages/user/news.vue"),
      },
      {
        path: "support",
        name: "support",
        component: () => import("@/pages/user/support.vue"),
      },
      {
        path: "copyTrading",
        name: "user_copyTrading_page",
        component: () => import("@/pages/user/copyTrading.vue"),
      },
    ],
  },

  {
    path: '/admin',
    name: "admin",
    component: () => import('@/layouts/admin/default.vue'),
    meta: {requiresAuth: true},

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
        component: () => import('@/pages/admin/copyTrade.vue'),
      },
      {
        path: "tradeHistory",
        name: 'admin_tradeHistory',
        component: () => import('@/pages/admin/tradeHistory.vue'),
      },
      {
        path: "transactionHistory",
        name: 'admin_transactionHistory',
        component: () => import('@/pages/admin/transactionHistory.vue'),
      },
      {
        path: "support",
        name: 'admin_support',
        component: () => import('@/layouts/admin/support.vue'),

        children: [
          {
            path: "",
            name: "_admin_support_conversation",
            component: () => import('@/pages/admin/support/conversations.vue')
          },
          {
            path: ":chat",
            name: "_admin_support_chat",
            component: () => import('@/pages/admin/support/chat.vue')
          },
        ]
      },
      {
        path: "settings",
        name: 'admin_settings',
        component: () => import('@/pages/admin/settings.vue'),
      },
      {
        path: "account",
        name: "admin_account",
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

// Function to check authentication state
const checkAuthState = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

router.beforeEach(async (to, from, next) => {
  const user = await checkAuthState();

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !user) {
    next('/auth/login');
  } else if (to.path === '/auth/login' && user) {
    next('/app/overview');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;

  // Check if the route requires authentication
  if(to.meta.requiresAuth && !user) {
    next('/auth/login');
  } else if(to.path === '/login' && user) {
    next('/app/overview');
  } else {
    next();
  }
});

// Function to dynamically add a route
export function addDynamicRoute(route) {
  if (!router.hasRoute(route.name)) {
    router.addRoute(route); // Dynamically adds the route
    console.log(`Dynamic route added: ${route.name}`);
  }
}

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
