<template>
  <v-app-bar color="#1D2330" elevation="0" order="1">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
          class="d-block d-md-none opacity-0"
      />

      <div class="d-none d-md-flex ga-5 ml-5">
        <router-link
            v-for="(route, index) in routes"
            :key="index"
            :to="route.route"
            class="text-caption text-sm-body-2 text-decoration-none text-white"
        >
          {{ route.name }}
        </router-link>
      </div>
    </template>

    <router-link to="/">
      <v-img
          src="@/assets/logo.png"
          width="70"
      />
    </router-link>

    <template v-slot:append>
      <div class="d-none d-md-flex ga-5 mr-5">
        <router-link
            v-for="(route, index) in routes2"
            :key="index"
            :to="route.route"
            class="text-caption text-sm-body-2 text-decoration-none text-teal-accent-4"
        >
          <v-icon>{{ route.icon }}</v-icon>
          {{ route.name }}
        </router-link>
      </div>

      <v-app-bar-nav-icon
          class="d-block d-md-none"
          @click="peripheralDrawer = !peripheralDrawer"
      />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import {useAppStore} from '@/stores/app'
import {storeToRefs} from 'pinia'

const store = useAppStore()
const {peripheralDrawer} = storeToRefs(store)

const routes = [
  {name: 'Home', route: '/'},
  {name: 'About Us', route: '/about'},
  {name: 'Investment', route: '/investment'},
  {name: 'FAQs', route: '/faq'},
  {name: 'Contact', route: '/contact'},
]

const routes2 = [
  {name: 'Copy Trading', icon: 'mdi-chart-multiline', route: '/copyTrading'},
  {name: 'Registration', icon: 'mdi-shield-account-outline', route: '/auth/getStarted'},
  {name: 'Login', icon: 'mdi-shield-account-outline', route: '/auth/login'}
]
</script>
