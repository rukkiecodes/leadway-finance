<template>
  <v-app-bar :elevation="0" order="1" :density="drawer ? 'compact' : 'comfortable'">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-5 d-flex d-lg-none"/>
      <router-link to="/app/overview">
        <v-img
          src="@/assets/images/logo.png"
          width="80"
        />
      </router-link>
    </template>

    <template v-slot:append>
      <v-btn to="/app/support" size="small" icon class="mr-5">
        <v-icon icon="mdi-bell"/>
      </v-btn>

      <v-btn icon @click="rightDrawer = !rightDrawer" class="mr-5">
        <v-icon>mdi-broadcast</v-icon>
      </v-btn>

      <v-menu
        v-model="menu"
        location="bottom"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props }">
          <v-avatar
            size="40"
            v-bind="props"
          >
            <v-img
              v-if="profile?.displayImage"
              :src="profile?.displayImage?.image"
              lazy-src="@/assets/images/avatar.png"
            />
            <v-img v-else src="@/assets/images/avatar.png"/>
          </v-avatar>
        </template>

        <v-card min-width="300" rounded="lg" elevation="10">
          <v-card-text class="d-flex flex-column justify-center align-center py-4">
            <v-avatar size="x-large">
              <v-img
                v-if="profile?.displayImage"
                :src="profile?.displayImage?.image"
                lazy-src="@/assets/images/avatar.png"
              />
              <v-img v-else src="@/assets/images/avatar.png"/>
            </v-avatar>

            <p class="text-body-2 text-sm-body-1 font-weight-bold mt-4">{{ profile?.firstName }} {{
                profile?.lastName
              }}</p>
          </v-card-text>

          <v-divider/>

          <v-card-text>
            <v-list :items="items" density="compact" color="indigo-accent-4" nav/>
          </v-card-text>

          <v-card-actions>
            <v-btn
              @click="signOutUser"
              prepend-icon="mdi-logout"
              block
              class="d-flex justify-start align-center text-caption text-sm-body-2 text-md-body-1"
              rounded="lg"
              variant="tonal"
              color="red"
            >
              <span>Logout</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>

  <v-app-bar :elevation="0" order="1" density="compact" class="pa-0">
    <Marquee/>
  </v-app-bar>
</template>

<script setup lang="ts">
import {useProfileStore} from "@/stores/user/profile";
import {useAppStore} from "@/stores/app";
import {storeToRefs} from "pinia"
import {ref} from "vue";
import {signOut} from "firebase/auth";
import {auth} from '@/firebase'

const menu = ref(false)
const profileStore = useProfileStore();
const appStore = useAppStore();

const {drawer, rightDrawer} = storeToRefs(appStore)
const {profile} = storeToRefs(profileStore)

const items = [
  {
    title: 'My Account',
    props: {
      to: '/app/profile',
      prependIcon: 'mdi-account',
      class: 'rounded-lg',
    }
  },
  {
    title: 'Deposit',
    props: {
      to: '/app/plans',
      prependIcon: 'mdi-currency-usd',
      class: 'rounded-lg',
    }
  },
  {
    title: 'Withdrawals',
    props: {
      to: '/app/withdrawals',
      prependIcon: 'mdi-cash-register',
      class: 'rounded-lg',
    }
  },
  {
    title: 'Transactions',
    value: 'transactions',
    props: {
      to: '/app/transactions',
      prependIcon: 'mdi-swap-horizontal',
      class: 'rounded-lg',
    }
  },
]

const signOutUser = async () => {
  await signOut(auth)
  router.push('/auth/login');
}
</script>
