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
      <v-list dense :items="routes"/>
    </v-sheet>

    <template v-slot:append>
      <v-sheet class="pa-2">
        <v-btn @click="signOutUser" prepend-icon="mdi-logout" block class="d-flex justify-start align-center"
               rounded="lg" variant="tonal" color="red"
        >Logout
        </v-btn>
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
    value: 'index',
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
    value: 'account',
    props: {
      to: '/account',
      prependIcon: 'mdi-account',
      title: 'My Account',
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
      prependIcon: 'mdi-account-multiple-outline',
      title: 'Copy trading',
      class: 'rounded-lg',
    }
  },
]

const signOutUser = () => {
  localStorage.removeItem('LeadWayUser');
  router.push('/auth/login');
}
</script>
