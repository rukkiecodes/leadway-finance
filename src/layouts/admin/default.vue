<template>
  <AppBar/>
  <LeftDrawer/>
  <RightDrawer />
  <v-app>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useProfileStore} from "@/stores/user/profile";
import AppBar from "@/components/admin/AppBar.vue";
import LeftDrawer from "@/components/admin/LeftDrawer.vue";
import RightDrawer from "@/components/admin/RightDrawer.vue";
import { useClientsStore } from '@/stores/admin/clients';

const profileStore = useProfileStore();
const clientsStore = useClientsStore();

onMounted(() => {
  profileStore.fetchUserProfile()
  clientsStore.fetchClients();
});
</script>
