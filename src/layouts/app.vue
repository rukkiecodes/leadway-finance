<template>
  <AppBar/>
  <LeftDrawer/>
  <v-app>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useProfileStore} from "@/stores/profile";
import AppBar from "@/components/appComponents/AppBar.vue";
import LeftDrawer from "@/components/appComponents/LeftDrawer.vue";

const profileStore = useProfileStore();

onMounted(() => profileStore.fetchUserProfile());
</script>
