<template>
  <v-app-bar :elevation="0" order="1" :density="drawer ? 'compact' : 'comfortable'">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-5 d-flex d-lg-none" />
      <router-link to="/overview">
        <v-img
          src="@/assets/images/logo.png"
          width="80"
        />
      </router-link>
    </template>

    <template v-slot:append>
      <v-btn icon @click="rightDrawer = !rightDrawer" class="mr-5">
        <v-icon>mdi-broadcast</v-icon>
      </v-btn>

      <v-chip to="/account" :size="drawer ? 'large' : 'x-large'" class="pl-1">
        <v-avatar size="40">
          <v-img :src="profile.profile?.displayImage?.image" lazy-src="@/assets/images/avatar.png" />
        </v-avatar>

        <span class="ml-2 text-caption text-sm-body-2 text-md-body-1">{{ profile.profile?.firstName }}</span>
      </v-chip>
    </template>
  </v-app-bar>

  <v-app-bar :elevation="0" order="1" density="compact">
    <Marquee />
  </v-app-bar>
</template>

<script setup lang="ts">
import {useProfileStore} from "@/stores/profile";
import {useAppStore} from "@/stores/app";
import { storeToRefs } from "pinia"

const profile = useProfileStore();
const appStore = useAppStore();
const { drawer, rightDrawer } = storeToRefs(appStore)
</script>
