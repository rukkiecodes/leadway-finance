<template>
  <v-navigation-drawer border="0">
    <template v-slot:prepend>
      <v-sheet class="d-flex flex-column justify-center align-center ga-5" dark height="250">
        <v-avatar
          image="@/assets/images/avatar.png"
          size="100"
        />

        <span class="text-body-2 text-sm-body-1 text-md-h6 font-weight-black">{{
            profile.profile?.firstName
          }} {{ profile.profile?.lastName }}</span>
      </v-sheet>
    </template>

    <v-sheet class="pa-2">
      <v-list dense :items="routes" base-color="indigo-accent-4"/>
    </v-sheet>

    <template v-slot:append>
      <v-sheet class="pa-2">
        <v-btn @click="signOutUser" prepend-icon="mdi-logout" block class="d-flex justify-start align-center" rounded="lg" variant="tonal" color="red">Logout</v-btn>
      </v-sheet>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {useProfileStore} from "@/stores/profile";
import {useRouter} from "vue-router";
const router = useRouter()

const profile = useProfileStore();

const routes = [
  {
    to: '/',
    value: 'Home',
    props: {
      prependIcon: 'mdi-home',
      title: 'Home',
      class: 'rounded-lg',
    }
  },
  {
    to: '/',
    value: 'Plans',
    props: {
      prependIcon: 'mdi-currency-usd',
      title: 'Plans',
      class: 'rounded-lg',
    }
  },
  {
    to: '/',
    value: 'Mining',
    props: {
      prependIcon: 'mdi-server-network',
      title: 'Mining',
      class: 'rounded-lg',
    }
  },
  {
    to: '/',
    value: 'Trading',
    props: {
      prependIcon: 'mdi-poll',
      title: 'Trading',
      class: 'rounded-lg',
    }
  },
  {
    to: '/',
    value: 'Holding',
    props: {
      prependIcon: 'mdi-wallet',
      title: 'Holding',
      class: 'rounded-lg',
    }
  },
  {
    to: '/',
    value: 'Staking',
    props: {
      prependIcon: 'mdi-wallet-membership',
      title: 'Staking',
      class: 'rounded-lg',
    }
  },
  {
    to: '/',
    value: 'Deposits',
    props: {
      prependIcon: 'mdi-bank-plus',
      title: 'Deposits',
      class: 'rounded-lg',
    }
  },
  {
    to: '/',
    value: 'My Account',
    props: {
      prependIcon: 'mdi-account',
      title: 'My Account',
      class: 'rounded-lg',
    }
  },
  {
    to: '/',
    value: 'Withdrawals',
    props: {
      prependIcon: 'mdi-cash-register',
      title: 'Withdrawals',
      class: 'rounded-lg',
    }
  },
  {
    to: '/',
    value: 'Copy trading',
    props: {
      prependIcon: 'mdi-account-multiple-outline',
      title: 'Copy trading',
      class: 'rounded-lg',
    }
  },
]

const signOutUser = () => {
  localStorage.removeItem('LeadWayUser');
  router.push('/auth');
}
</script>
