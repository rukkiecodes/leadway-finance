export default {
  path: '/',
  name: 'Peripheral_Home',
  component: () => import('@/layouts/peripherals/default.vue'),

  children: [
    {
      path: '',
      name: 'Peripheral_Home_index',
      component: () => import('@/pages/peripherals/index.vue')
    },
    {
      path: 'about',
      name: 'Peripheral_about',
      component: () => import('@/pages/peripherals/about.vue')
    },
    {
      path: 'investment',
      name: 'Peripheral_investment',
      component: () => import('@/pages/peripherals/investment.vue')
    },
    {
      path: 'faq',
      name: 'Peripheral_faq',
      component: () => import('@/pages/peripherals/faq.vue')
    },
    {
      path: 'contact',
      name: 'Peripheral_contact',
      component: () => import('@/pages/peripherals/contact.vue')
    },
    {
      path: 'copyTrading',
      name: 'Peripheral_copyTrading',
      component: () => import('@/pages/peripherals/copyTrading.vue')
    },
    {
      path: 'terms',
      name: 'Peripheral_terms',
      component: () => import('@/pages/peripherals/terms.vue')
    },
  ]
}
