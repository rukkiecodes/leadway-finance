<template>
  <v-navigation-drawer border="0" v-model="drawer">
    <template v-slot:prepend>
      <v-sheet class="d-flex flex-column justify-center align-center ga-5" dark :height="250">
        <v-avatar :size="100">
          <v-img :src="profile?.displayImage?.image || '@/assets/images/avatar.png'" lazy-src="@/assets/images/avatar.png"/>
        </v-avatar>

        <span class="text-body-2 text-sm-body-1 text-md-h6 font-weight-black">{{
            profile?.firstName
          }} {{ profile?.lastName }}</span>
      </v-sheet>
    </template>

    <v-list :items="routes" density="compact" color="indigo-accent-4" nav/>

    <template v-slot:append>
      <v-sheet class="pa-2">
        <v-btn
          v-if="profile?.admin"
          @click="swtchToAdmin"
          prepend-icon="mdi-rotate-3d-variant"
          block
          class="d-flex justify-start align-center text-caption text-sm-body-2 text-md-body-1 mb-2"
          rounded="lg"
          variant="tonal"
          color="indigo-accent-4"
        >
          Switch Account
        </v-btn>

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
      </v-sheet>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {onMounted} from "vue"
import {useProfileStore} from "@/stores/user/profile";
import {useAppStore} from '@/stores/app'
import {useRouter} from "vue-router";
import {storeToRefs} from 'pinia';
import {useDisplay} from "vuetify";
import {auth} from '@/firebase'
import {signOut} from "firebase/auth";

const {name} = useDisplay()

const router = useRouter()

const profileStore = useProfileStore();
const appStore = useAppStore();
const {drawer, switchAccount} = storeToRefs(appStore);
const {profile} = storeToRefs(profileStore);

const routes = [
  {
    value: 'overview',
    props: {
      to: '/app/overview',
      prependIcon: 'mdi-home',
      title: 'Home',
      class: 'rounded-lg',
    }
  },
  {
    value: 'copyTrading',
    props: {
      to: '/app/copyTrading',
      prependIcon: 'mdi-file-tree',
      title: 'Copy trading',
      class: 'rounded-lg',
    }
  },
  {
    value: 'deposit',
    props: {
      to: '/app/plans',
      prependIcon: 'mdi-currency-usd',
      title: 'Deposit',
      class: 'rounded-lg',
    }
  },
  {
    value: 'history',
    props: {
      to: '/app/history',
      prependIcon: 'mdi-swap-horizontal',
      title: 'History',
      class: 'rounded-lg',
    }
  },
  {
    value: 'transactions',
    props: {
      to: '/app/transactions',
      prependIcon: 'mdi-swap-horizontal',
      title: 'Transactions',
      class: 'rounded-lg',
    }
  },
  // {
  //   value: 'mining',
  //   props: {
  //     to: '/app/mining',
  //     prependIcon: 'mdi-server-network',
  //     title: 'Mining',
  //     class: 'rounded-lg',
  //   }
  // },
  // {
  //   value: 'trading',
  //   props: {
  //     to: '/app/trading',
  //     prependIcon: 'mdi-poll',
  //     title: 'Trading',
  //     class: 'rounded-lg',
  //   }
  // },
  // {
  //   value: 'holding',
  //   props: {
  //     to: '/app/holding',
  //     prependIcon: 'mdi-wallet',
  //     title: 'Holding',
  //     class: 'rounded-lg',
  //   }
  // },
  // {
  //   value: 'staking',
  //   props: {
  //     to: '/app/staking',
  //     prependIcon: 'mdi-wallet-membership',
  //     title: 'Staking',
  //     class: 'rounded-lg',
  //   }
  // },
  // {
  //   value: 'deposits',
  //   props: {
  //     to: '/app/deposits',
  //     prependIcon: 'mdi-bank-plus',
  //     title: 'Deposits',
  //     class: 'rounded-lg',
  //   }
  // },
  {
    value: 'withdrawals',
    props: {
      to: '/app/withdrawals',
      prependIcon: 'mdi-cash-register',
      title: 'Withdrawals',
      class: 'rounded-lg',
    }
  },
  {
    value: 'news',
    props: {
      to: '/app/news',
      prependIcon: 'mdi-newspaper-variant-multiple-outline',
      title: 'News',
      class: 'rounded-lg',
    }
  },
  {
    value: 'support',
    props: {
      to: '/app/support',
      prependIcon: 'mdi-wechat',
      title: 'Support',
      class: 'rounded-lg',
    }
  },
  {
    value: 'profile',
    props: {
      to: '/app/profile',
      prependIcon: 'mdi-account',
      title: 'My Account',
      class: 'rounded-lg',
    }
  },
]

const signOutUser = async () => {
  await signOut(auth)
  router.push('/auth/login');
}

const validateDrawer = () => {
  drawer.value = ['xs', 'sm', 'md'].includes(name.value) ? false : true;
};

onMounted(() => {
  validateDrawer()
})

async function checkSwitchAccount() {
  const result = await appStore.setSwitchAccount();
  if (result) {
    router.push('/admin/overview')
    setTimeout(() => {
      switchAccount.value = false
    }, 2000)
  }
}

const swtchToAdmin = () => {
  switchAccount.value = true

  checkSwitchAccount()
}
</script>
