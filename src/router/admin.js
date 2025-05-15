export default {
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
      path: "trades",
      name: 'admin_tradeGenerator',
      component: () => import('@/layouts/admin/trades.vue'),

      children: [
        {
          path: "",
          name: 'admin_trades',
          component: () => import('@/pages/admin/trades/overview.vue')
        },
        {
          path: ":user",
          name: 'admin_trade_manage',
          component: () => import('@/pages/admin/trades/manage.vue')
        }
      ]
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
