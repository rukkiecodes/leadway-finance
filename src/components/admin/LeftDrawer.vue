<template>
  <v-navigation-drawer border="0" v-model="drawer">
    <template v-slot:prepend>
      <v-sheet class="d-flex flex-column justify-center align-center ga-5" dark :height="250">
        <v-avatar :size="100">
          <v-img :src="profile.profile?.displayImage?.image" lazy-src="@/assets/images/avatar.png"/>
        </v-avatar>

        <span class="text-body-2 text-sm-body-1 text-md-h6 font-weight-black">{{
            profile.profile?.firstName
          }} {{ profile.profile?.lastName }}</span>
      </v-sheet>
    </template>

    <v-list :items="routes" density="compact" color="indigo-accent-4" nav/>

    <template v-slot:append>
      <v-sheet class="pa-2">
        <v-btn
          @click="swtchToUser"
          prepend-icon="mdi-rotate-3d-variant"
          block
          class="d-flex justify-start align-center text-caption text-sm-body-2 text-md-body-1 mb-2"
          rounded="lg" variant="tonal" color="indigo-accent-4"
        >
          Switch Account
        </v-btn>

        <v-btn @click="signOutUser" prepend-icon="mdi-logout" block
               class="d-flex justify-start align-center text-caption text-sm-body-2 text-md-body-1"
               rounded="lg" variant="tonal" color="red"
        >
          Logout
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

const profile = useProfileStore();
const appStore = useAppStore();
const {drawer, switchAccount} = storeToRefs(appStore);

const routes = [
  {
    value: 'overview',
    props: {
      to: '/admin/overview',
      prependIcon: 'mdi-home',
      title: 'Home',
      class: 'rounded-lg',
    }
  },
  {
    value: 'Clients',
    props: {
      to: '/admin/clients',
      prependIcon: 'mdi-account-group',
      title: 'Clients',
      class: 'rounded-lg',
    }
  },
  {
    value: 'copyTrading',
    props: {
      to: '/admin/copyTrading',
      prependIcon: 'mdi-file-tree',
      title: 'Copy trading',
      class: 'rounded-lg',
    }
  },
  {
    value: 'tradeHistory',
    props: {
      to: '/admin/tradeHistory',
      prependIcon: 'mdi-swap-horizontal',
      title: 'Trade History',
      class: 'rounded-lg',
    }
  },
  {
    value: 'transactionHistory',
    props: {
      to: '/admin/transactionHistory',
      prependIcon: 'mdi-swap-horizontal',
      title: 'Transaction History',
      class: 'rounded-lg',
    }
  },
  {
    value: 'support',
    props: {
      to: '/admin/support',
      prependIcon: 'mdi-wechat',
      title: 'Customer Support',
      class: 'rounded-lg',
    }
  },
  {
    value: 'account',
    props: {
      to: '/admin/account',
      prependIcon: 'mdi-account',
      title: 'account',
      class: 'rounded-lg',
    }
  },
  {
    value: 'settings',
    props: {
      to: '/admin/settings',
      prependIcon: 'mdi-cog',
      title: 'Settings',
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
    router.push('/app/overview')
    setTimeout(() => {
      switchAccount.value = false
    }, 2000)
  }
}

const swtchToUser = () => {
  switchAccount.value = true

  checkSwitchAccount()
}
</script>
