<template>
  <v-tabs-window-item value="history">
    <v-toolbar density="compact" color="transparent">
      <template v-slot:prepend>
        <v-toolbar-title>Edit Account Records</v-toolbar-title>
      </template>
    </v-toolbar>
    <v-divider class="mb-10"/>

    <v-row>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Trading Amount"
              variant="outlined"
              v-model="tradingAmount"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              density="compact"
              label="Asset"
              variant="outlined"
              v-model="asset"
              item-title="paymentMethod"
              return-object
              rounded="lg"
              color="indigo-accent-4"
              :items="[
                    {paymentMethod: 'Ethereum (ETH)', code: 'ETH'},
                    {paymentMethod: 'Bitcoin (BTC)', code: 'BTC'},
                    {paymentMethod: 'Ripple (XRP)', code: 'XRP'},
                    {paymentMethod: 'BnB smart chain (BNB)', code: 'BNB'},
                    {paymentMethod: 'Litecoin (LTC)', code: 'LTC'},
                  ]"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              density="compact"
              label="Trade Status"
              variant="outlined"
              v-model="tradeStatus"
              rounded="lg"
              color="indigo-accent-4"
              :items="['WIN', 'LOSS']"
            />
          </v-col>

          <v-col cols="12">
            <v-switch
              label="Send trade history to client"
              inset
              color="indigo-accent-4"
              v-model="sendTradeHistory"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12">
            <v-date-picker
              width="100%"
              v-model="date"
              color="indigo-accent-4"
              rounded="lg"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              density="compact"
              label="Contract"
              variant="outlined"
              v-model="contract"
              rounded="lg"
              color="indigo-accent-4"
              :items="['WIN', 'LOSS']"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="profit or Loss Payout"
              variant="outlined"
              v-model="profitOrLossPayout"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="d-flex justify-end">
        <v-btn @click="saveTradeHistory" :loading="loading" :disabled="loading" variant="flat"
               color="indigo-accent-4" class="text-caption text-sm-body-2 text-md-body-1"
        >
          Save Trade History
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-divider/>
      </v-col>

      <v-col cols="12">
        <p class="text-center text-body-1 text-sm-h6 text-md-h5 font-weight-bold">{{ user.firstName }} {{
            user.lastName
          }} Trade History</p>
      </v-col>

      <v-col cols="12">
        <v-card
          title="Nutrition"
          flat
        >
          <v-data-table
            :headers="headers"
            :items="allTradeTransactions"
            :search="search"
          >
            <template v-slot:item.asset="{ item }">
              <p>{{item.asset.paymentMethod}}</p>
            </template>

            <template v-slot:item.date="{ item }">
              <p>{{ new Date(item.date.seconds * 1000).toDateString() }}</p>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-tabs-window-item>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {defineProps} from "vue";
import {addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, setDoc, doc} from "firebase/firestore";
import {db} from "@/firebase";
import {useAppStore} from '@/stores/app'

// Define props
const props = defineProps<{
  user: Record<string, any>;
}>();

const {snackbarObject} = useAppStore()

const tradingAmount = ref("");
const asset = ref({paymentMethod: 'None', code: 'None'});
const tradeStatus = ref("None");
const sendTradeHistory = ref(props.user?.sendTradeHistory || false);

const date = ref(null);
const contract = ref("None");
const profitOrLossPayout = ref("");

const loading = ref(false)

const allTradeTransactions = ref([])

const search = ref('')
const headers = [
  {key: 'asset', title: 'Asset'},
  {
    key: 'tradingAmount',
    title: 'Trade',
  },
  {key: 'date', title: 'Date'},
  {key: 'tradeStatus', title: 'Status'},
  {key: 'profitOrLossPayout', title: 'Payout'}
]

const
  saveTradeHistory = async () => {
    if (!tradingAmount.value || !asset.value || !tradeStatus.value || !date.value || !contract.value || !profitOrLossPayout.value) {
      return
    } else {
      try {
        loading.value = true;

        const dataToSave = {
          tradingAmount: tradingAmount.value,
          asset: asset.value,
          tradeStatus: tradeStatus.value,
          sendTradeHistory: sendTradeHistory.value,
          date: date.value,
          contract: contract.value,
          profitOrLossPayout: profitOrLossPayout.value,
        }

        const savedTradeHistory = await addDoc(collection(db, 'leadway_users', props.user?.uid, 'trade_history'), {
          ...dataToSave,
          timestamp: serverTimestamp(),
        })

        await setDoc(doc(db, 'trade_history', savedTradeHistory.id), {
          ...dataToSave,
          user: props.user?.uid,
          timestamp: serverTimestamp(),
        })

        loading.value = false;
        snackbarObject.show = true
        snackbarObject.message = `Saved Successfully`
        snackbarObject.color = "green"
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    }
  }

const fetChUserTradeHistory = async () => {
  const q = query(collection(db, "leadway_users", props.user?.uid, 'trade_history'), orderBy("timestamp", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    allTradeTransactions.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  });

  return unsubscribe;
}

onMounted(() => {
  fetChUserTradeHistory();
})
</script>
