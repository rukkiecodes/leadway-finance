<template>
  <v-navigation-drawer order="1" location="end" border="none" v-model="rightDrawer" width="300">
    <v-row>
      <v-col cols="12" v-for="item in clients" :key="item.id">
        <router-link :to="`/admin/support/${item.id}`" class="text-decoration-none">
          <v-sheet class="d-flex justify-start align-center ga-4 pa-2 mx-2" color="#292E34" rounded="pill">
            <v-avatar>
              <v-img :src="item?.displayImage?.image"/>
            </v-avatar>

            <div class="d-flex flex-column">
              <span class="text-body-2 text-sm-body-1">{{ item?.firstName }}</span>
              <MessageCount :user="item?.id" />
            </div>
          </v-sheet>
        </router-link>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useClientsStore } from '@/stores/admin/clients';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import MessageCount from "@/components/admin/MessageCount.vue";

const appStore = useAppStore();
const { rightDrawer } = storeToRefs(appStore);
const clientStore = useClientsStore();
const { clients } = storeToRefs(clientStore);
</script>
