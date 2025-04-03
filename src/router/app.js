export default {
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
        {
          path: "referrals",
          name: "user_profile_referrals",
          component: () => import("@/pages/user/account/referrals.vue"),
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
    {
      path: "technical",
      name: "user_technical",
      component: () => import("@/pages/user/technical.vue"),
    },
    {
      path: "chart",
      name: "user_chart",
      component: () => import("@/pages/user/chart.vue"),
    },
  ],
}
