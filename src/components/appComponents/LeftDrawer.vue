<template>
  <v-navigation-drawer border="0" permanent :rail="drawer">
    <template v-slot:prepend>
      <v-sheet class="d-flex flex-column justify-center align-center ga-5" dark :height="drawer ? 70 : 250">
        <v-avatar :size="drawer ? 50 : 100">
          <v-img :src="profile.profile?.displayImage?.image" lazy-src="@/assets/images/avatar.png" />
        </v-avatar>

        <span v-if="!drawer" class="text-body-2 text-sm-body-1 text-md-h6 font-weight-black">{{
            profile.profile?.firstName
          }} {{ profile.profile?.lastName }}</span>
      </v-sheet>
    </template>

    <v-list :items="routes" density="compact" color="indigo-accent-4" nav/>

    <template v-slot:append>
      <v-sheet class="pa-2">
        <v-btn @click="signOutUser" prepend-icon="mdi-logout" block class="d-flex justify-start align-center"
               rounded="lg" variant="tonal" color="red"
        >
          <span v-if="!drawer">Logout</span>
        </v-btn>
      </v-sheet>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {useProfileStore} from "@/stores/profile";
import {useAppStore} from '@/stores/app'
import {useRouter} from "vue-router";
import {storeToRefs} from 'pinia';

const router = useRouter()

const profile = useProfileStore();
const appStore = useAppStore();
const {drawer} = storeToRefs(appStore);

const routes = [
  {
    value: 'overview',
    props: {
      to: '/overview',
      prependIcon: 'mdi-home',
      title: 'Home',
      class: 'rounded-lg',
    }
  },
  {
    value: 'plans',
    props: {
      to: '/plans',
      prependIcon: 'mdi-currency-usd',
      title: 'Plans',
      class: 'rounded-lg',
    }
  },
  {
    value: 'mining',
    props: {
      to: '/mining',
      prependIcon: 'mdi-server-network',
      title: 'Mining',
      class: 'rounded-lg',
    }
  },
  {
    value: 'trading',
    props: {
      to: '/trading',
      prependIcon: 'mdi-poll',
      title: 'Trading',
      class: 'rounded-lg',
    }
  },
  {
    value: 'holding',
    props: {
      to: '/holding',
      prependIcon: 'mdi-wallet',
      title: 'Holding',
      class: 'rounded-lg',
    }
  },
  {
    value: 'staking',
    props: {
      to: '/staking',
      prependIcon: 'mdi-wallet-membership',
      title: 'Staking',
      class: 'rounded-lg',
    }
  },
  {
    value: 'deposits',
    props: {
      to: '/deposits',
      prependIcon: 'mdi-bank-plus',
      title: 'Deposits',
      class: 'rounded-lg',
    }
  },
  {
    value: 'withdrawals',
    props: {
      to: '/withdrawals',
      prependIcon: 'mdi-cash-register',
      title: 'Withdrawals',
      class: 'rounded-lg',
    }
  },
  {
    value: 'copytrading',
    props: {
      to: '/copytrading',
      prependIcon: 'mdi-file-tree',
      title: 'Copy trading',
      class: 'rounded-lg',
    }
  },
  {
    value: 'news',
    props: {
      to: '/news',
      prependIcon: 'mdi-newspaper-variant-multiple-outline',
      title: 'News',
      class: 'rounded-lg',
    }
  },
  {
    value: 'account',
    props: {
      to: '/account',
      prependIcon: 'mdi-account',
      title: 'My Account',
      class: 'rounded-lg',
    }
  },
]

const signOutUser = () => {
  localStorage.removeItem('LeadWayUser');
  router.push('/auth/login');
}
</script>
