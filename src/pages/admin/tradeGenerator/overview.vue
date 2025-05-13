<script setup type="ts">
import {useClientsStore} from '@/stores/admin/clients';
import {storeToRefs} from "pinia";
import {getDocs, collection, getDoc, doc} from 'firebase/firestore'
import {format} from 'date-fns'
import {ref, onMounted} from 'vue'
import {db} from '@/firebase'

const clientStore = useClientsStore();
const {clients} = storeToRefs(clientStore);

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const generatedTrades = [];
const groupedTrades = ref([])

const fetchGroupedTrades = async () => {
  // const allClientsId = clients.value.map(client => client.id);
  //
  // const indexDocRef = doc(db, "future_trades", client.id);

  for (const client of clients.value) {
    const indexDocRef = doc(db, "future_trades", client.id);
    const indexSnap = await getDoc(indexDocRef);

    if (indexSnap.exists()) {
      const months = indexSnap.id;
      console.log(months);
    }
  }

  // for (const users of allClientsId) {
  //   const fetchParentCollection = await getDocs(collection(db, "future_trades", users, "2025-05"));
  //
  //   console.log('FetchParentCollection', fetchParentCollection);
  // }
}

onMounted(() => fetchGroupedTrades());
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card rounded="lg">
          <v-card-title>{{ months[new Date().getMonth()] }} {{ new Date().getFullYear() }}</v-card-title>
          <v-divider/>

          <v-card-text>
            <span class="text-caption text-sm-body-2">Generate Trades for the month ({{
                months[new Date().getMonth()]
              }}) For all ({{ clients.length }}) Clients</span>

          </v-card-text>

          <v-card-actions>
            <v-btn
              to="/admin/tradeGenerator/generator"
              color="indigo-accent-4"
              class="text-capitalize"
              variant="flat"
              rounded="lg"
            >
              Generate
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      {{ groupedTrades }}
      <v-col v-for="(trade, index) in generatedTrades" :key="index">
        <v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
