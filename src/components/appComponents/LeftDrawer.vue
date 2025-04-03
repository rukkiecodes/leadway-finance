<template>
  <v-navigation-drawer border="0" v-model="drawer">
    <template v-slot:prepend>
      <v-sheet class="d-flex flex-column justify-center align-center ga-5" dark :height="250">
        <v-avatar :size="100">
          <v-img :src="profile?.displayImage?.image || '@/assets/images/avatar.png'"
                 lazy-src="@/assets/images/avatar.png"
          />
        </v-avatar>

        <span class="text-body-2 text-sm-body-1 text-md-h6 font-weight-black">{{
            profile?.firstName
          }} {{ profile?.lastName }}</span>
      </v-sheet>
    </template>

    <v-list :items="routes" density="compact" color="indigo-accent-4" nav/>

    <v-expansion-panels elevation="0" density="compact">
      <v-expansion-panel>
        <v-expansion-panel-title>
          Live Analytics
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-list :items="liveAnalytics" density="compact" color="indigo-accent-4" nav/>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

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
    title: 'Home',
    props: {
      to: '/app/overview',
      prependIcon: 'mdi-home',
      class: 'rounded-lg',
    }
  },
  {
    title: 'Copy trading',
    props: {
      to: '/app/copyTrading',
      prependIcon: 'mdi-file-tree',
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
    title: 'History',
    props: {
      to: '/app/history',
      prependIcon: 'mdi-swap-horizontal',
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
  {
    title: 'Withdrawals',
    props: {
      to: '/app/withdrawals',
      prependIcon: 'mdi-cash-register',
      class: 'rounded-lg',
    }
  },
  {
    title: 'News',
    props: {
      to: '/app/news',
      prependIcon: 'mdi-newspaper-variant-multiple-outline',
      class: 'rounded-lg',
    }
  },
  {
    title: 'Support',
    props: {
      to: '/app/support',
      prependIcon: 'mdi-wechat',
      class: 'rounded-lg',
    }
  },
  {
    title: 'My Account',
    props: {
      to: '/app/profile',
      prependIcon: 'mdi-account',
      class: 'rounded-lg',
    }
  },
]

const liveAnalytics = [
  {
    title: 'Technical Analysis',
    props: {
      to: '/app/technical',
      prependIcon: 'mdi-google-analytics',
      class: 'rounded-lg',
    }
  },
  {
    title: 'Live Market Chart',
    props: {
      to: '/app/chart',
      prependIcon: 'mdi-finance',
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
