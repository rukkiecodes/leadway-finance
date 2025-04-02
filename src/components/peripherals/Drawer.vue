<template>
  <v-navigation-drawer
    v-model="peripheralDrawer"
    location="right"
    border="none"
  >
    <v-list
      nav
      :items="routes"
      density="compact"
      color="indigo-accent-4"
    />

    <v-divider/>

    <v-list
      nav
      :items="routes2"
      density="compact"
      color="indigo-accent-4"
    />
  </v-navigation-drawer>
</template>


<script setup lang="ts">
import {useAppStore} from '@/stores/app'
import {storeToRefs} from 'pinia'

const store = useAppStore()
const {peripheralDrawer} = storeToRefs(store)

const routes = [
  {
    title: 'Home',
    props: {
      to: '/',
      class: 'rounded-lg',
    }
  },
  {
    title: 'About Us',
    props: {
      to: '/about',
      class: 'rounded-lg',
    }
  },
  {
    title: 'Investment',
    props: {
      to: '/investment',
      class: 'rounded-lg',
    }
  },
  {
    title: 'FAQs',
    props: {
      to: '/faq',
      class: 'rounded-lg',
    }
  },
  {
    title: 'Contact',
    props: {
      to: '/contact',
      class: 'rounded-lg',
    }
  }
]

const routes2 = [
  {
    title: 'Copy Trading',
    props: {
      to: '/copyTrading',
      class: 'rounded-lg',
      prependIcon: 'mdi-chart-multiline',
    }
  },
  {
    title: 'Registration',
    props: {
      to: '/auth/getStarted',
      class: 'rounded-lg',
      prependIcon: 'mdi-shield-account-outline',
    }
  },
  {
    title: 'Login',
    props: {
      to: '/auth/login',
      class: 'rounded-lg',
      prependIcon: 'mdi-shield-account-outline',
    }
  },
]
</script>
