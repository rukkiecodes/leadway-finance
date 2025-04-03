export default {
  path: "/auth",
  component: () => import("@/layouts/user/auth.vue"),
  children: [
    {
      path: "login",
      name: "login",
      component: () => import("@/pages/auth/login.vue"),
    },
    {
      path: ":user",
      name: "referrals_login",
      component: () => import("@/pages/auth/referralsLogin.vue"),
    },
    {
      path: "getStarted",
      name: "getStarted",
      component: () => import("@/pages/auth/getStarted.vue"),
    },
    {
      path: "forgotPassword",
      name: "forgotPassword",
      component: () => import("@/pages/auth/forgotPassword.vue"),
    },
  ],
}
