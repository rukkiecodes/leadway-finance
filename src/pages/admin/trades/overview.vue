<script setup lang="ts">
import {useClientsStore} from '@/stores/admin/clients';
import {storeToRefs} from 'pinia';
import MiniTable from "@/components/admin/trades/MiniTable.vue";

const clientsStore = useClientsStore();
const {clients} = storeToRefs(clientsStore);
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        v-for="(client, i) in clients"
        :key="i"
      >
        <v-card rounded="xl">
          <v-card-text>
            <div class="d-sm-flex align-center">
              <div class="d-flex ga-5 align-center flex-1-0">
                <v-avatar v-if="client?.displayImage" :image="client?.displayImage?.image" size="60"/>
                <v-avatar v-else image="@/assets/images/avatar.png" size="60"/>

                <div>
                  <p class="text-body-2 font-weight-bold">{{ client?.firstName }} {{ client?.lastName }}</p>
                  <p class="text-caption font-weight-light">{{ client?.email }}</p>
                </div>
              </div>

              <v-btn
                color="indigo-accent-4"
                rounded="xl"
                class="text-caption mt-5"
                :to="`/admin/trades/${client.uid}`"
              >
                Manage User Trades
              </v-btn>
            </div>
          </v-card-text>

          <v-card-text>
            <MiniTable :user="{id: client?.id, ...client}" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
