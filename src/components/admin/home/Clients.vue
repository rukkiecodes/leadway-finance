<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-group"></v-icon> &nbsp;
      Clients

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        rounded="lg"
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table
      v-model:search="search"
      :items="clients"
      density="comfortable"
      :headers="headers"
      :filter-keys="['firstName', 'lastName', 'email', 'phone']"
    >
      <!-- Display Image Column -->
      <template v-slot:item.displayImage="{ item }">
        <v-avatar size="50" class="my-2">
          <v-img :src="item.displayImage.image" cover />
        </v-avatar>
      </template>

      <template v-slot:item.totalBalance="{ item }">
        <p>${{ formatMoney(item.totalBalance || 0) }}</p>
      </template>

      <template v-slot:item.timestamp="{ item }">
        <p>{{ new Date(item.timestamp.seconds * 1000).toDateString() }}</p>
      </template>

      <template v-slot:item.verified="{ item }">
        <v-chip :color="item.verified ? 'green' : 'red'">{{ item.verified ? 'Verified' : 'Not Verified' }}</v-chip>
      </template>

      <!-- Actions Column -->
      <template v-slot:item.actions="{ item }">
        <v-btn :to="`/admin/account/${item.uid}`" variant="outlined" size="small">View Account</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { useClientsStore } from '@/stores/admin/clients';
import { ref, computed } from "vue";
import {storeToRefs} from 'pinia';

const clientsStore = useClientsStore();
const { clients } = storeToRefs(clientsStore);
const search = ref('');

// Define headers explicitly to exclude ID/UID
const headers = computed(() => [
  { title: "Photo", key: "displayImage", sortable: false },
  { title: "First Name", key: "firstName" },
  { title: "Last Name", key: "lastName" },
  { title: "Email", key: "email" },
  { title: "Phone", key: "phone" },
  { title: "Country", key: "country" },
  { title: "Account Type", key: "accountType" },
  { title: "Balance", key: "totalBalance" },
  { title: "Joined At", key: "timestamp" },
  { title: "Status", key: "verified" },
  { title: "", key: "actions", sortable: false }
]);

const viewClient = (client) => {
  console.log("Viewing client:", client);
};

const formatMoney = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
};
</script>
