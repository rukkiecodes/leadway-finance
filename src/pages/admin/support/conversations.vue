<template>
  <v-container>
    <div class="d-flex d-sm-none">
      <v-list lines="two" width="100%">
        <v-list-item
          v-for="client in clients"
          :key="client.id"
          :to="`/admin/support/${client.id}`"
        >
          <v-list-item-title>{{ client?.firstName }} {{ client?.lastName }}</v-list-item-title>
          <v-list-item-subtitle>
            <MessageCount :user="client?.id"/>
          </v-list-item-subtitle>

          <template v-slot:prepend>
            <v-avatar size="50">
              <v-img :src="client?.displayImage?.image || '@/assets/images/avatar.png'" lazy-src="@/assets/images/avatar.png" cover/>
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>
    </div>

    <v-row class="d-none d-sm-flex">
      <v-col v-for="client in clients" :key="client.id" cols="12" sm="4" md="3" lg="2">
        <router-link :to="`/admin/support/${client.id}`" class="text-decoration-none">
          <v-card rounded="xl">
            <v-card-text class="d-flex flex-column justify-center align-center py-5">
              <v-avatar size="100">
                <v-img :src="client?.displayImage?.image || '@/assets/images/avatar.png'" lazy-src="@/assets/images/avatar.png" cover/>
              </v-avatar>

              <p class="text-body-2 text-sm-body-1 mt-5">{{ client?.firstName }} {{ client?.lastName }}</p>
              <MessageCount :user="client?.id"/>
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useClientsStore} from '@/stores/admin/clients'
import MessageCount from "@/components/admin/MessageCount.vue";

const clientStore = useClientsStore();
const {clients} = storeToRefs(clientStore);
</script>
