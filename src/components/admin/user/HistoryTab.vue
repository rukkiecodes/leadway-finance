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
            <v-autocomplete
              v-model="asset"
              density="compact"
              variant="outlined"
              label="Asset"
              :items="trades"
              return-object
              item-title="id"
              rounded="lg"
              color="indigo-accent-4"
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
        <v-card flat>
          <v-data-table
            :headers="headers"
            :items="allTradeTransactions"
            :search="search"
            :filter-keys="['asset', 'id']"
            show-expand
            item-value="id"
          >
            <template v-slot:item.asset="{ item }">
              <p>{{ item.asset }}</p>
            </template>

            <template v-slot:item.date="{ item }">
              <p>{{ new Date(item.date.seconds * 1000).toDateString() }}</p>
            </template>

            <template v-slot:expanded-row="{ columns, item }">
              <tr>
                <td :colspan="columns.length" class="mx-0 px-0">
                  <v-card color="transparent" flat width="500" title="Update Trade History">
                    <v-card-text>
                      <v-text-field
                        v-model="item.tradingAmount"
                        density="compact"
                        variant="outlined"
                        label="Amount"
                        rounded="lg"
                        color="indigo-accent-4"
                        @keyup.enter="updateField('tradingAmount', item.tradingAmount, item.id)"
                      />

                      <v-autocomplete
                        v-model="item.asset"
                        density="compact"
                        variant="outlined"
                        label="Asset"
                        :items="trades"
                        return-object
                        item-title="id"
                        rounded="lg"
                        color="indigo-accent-4"
                        @update:modelValue="updateField('asset', item.asset.id, item.id)"
                      />

                      <v-select
                        v-model="item.tradeStatus"
                        density="compact"
                        variant="outlined"
                        label="Trade Status"
                        :items="['WIN', 'LOSS']"
                        rounded="lg"
                        color="indigo-accent-4"
                        @update:modelValue="updateField('tradeStatus', item.tradeStatus, item.id)"
                      />

                      <v-select
                        v-model="item.contract"
                        density="compact"
                        variant="outlined"
                        label="Contract"
                        :items="['WIN', 'LOSS']"
                        rounded="lg"
                        color="indigo-accent-4"
                        @update:modelValue="updateField('contract', item.contract, item.id)"
                      />

                      <v-text-field
                        v-model="item.profitOrLossPayout"
                        density="compact"
                        variant="outlined"
                        label="Profit or Loss Payout"
                        rounded="lg"
                        color="indigo-accent-4"
                        @keyup.enter="updateField('profitOrLossPayout', item.profitOrLossPayout, item.id)"
                      />

                      <v-switch
                        v-model="item.sendTradeHistory"
                        label="Send Trade History"
                        inset
                        color="indigo-accent-4"
                        @update:modelValue="updateField('sendTradeHistory', item.sendTradeHistory, item.id)"
                      />
                    </v-card-text>
                  </v-card>
                </td>
              </tr>
            </template>

            <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand, item }">
              <v-btn
                :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                :text="isExpanded(internalItem) ? 'Collapse' : 'More info'"
                class="text-none"
                color="medium-emphasis"
                size="small"
                variant="text"
                border
                slim
                @click="toggleExpand(internalItem)"
              />
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
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  doc,
  where,
  updateDoc, getDocs
} from "firebase/firestore";
import {db} from "@/firebase";
import {useAppStore} from '@/stores/app'

// Define props
const props = defineProps<{
  user: Record<string, any>;
}>();

const {snackbarObject} = useAppStore()

const trades = ref([])

const tradingAmount = ref("");
const asset = ref('TSX');
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
  {key: 'tradingAmount', title: 'Trade'},
  {key: 'date', title: 'Date'},
  {key: 'tradeStatus', title: 'Status'},
  {key: 'profitOrLossPayout', title: 'Payout'}
]

const
  saveTradeHistory = async () => {
    if (!tradingAmount.value || !asset.value || !tradeStatus.value || !date.value || !contract.value || !profitOrLossPayout.value) return

    else {
      try {
        loading.value = true;

        const dataToSave = {
          tradingAmount: tradingAmount.value,
          asset: asset.value.id,
          tradeStatus: tradeStatus.value,
          sendTradeHistory: sendTradeHistory.value,
          date: date.value,
          contract: contract.value,
          profitOrLossPayout: profitOrLossPayout.value,
        }

        await addDoc(collection(db, 'trade_history'), {
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
  const q = query(collection(db, 'trade_history'), where('user', '==', props.user?.uid), orderBy("timestamp", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    allTradeTransactions.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  });

  return unsubscribe;
}

onMounted(() => {
  fetChUserTradeHistory();
  fetchTrades()
})

const updateField = async (field: string, value: any, id) => {
  try {
    await updateDoc(doc(db, "trade_history", id), {
      [field]: value,
    });
    snackbarObject.show = true
    snackbarObject.message = `Updated Successfully`
    snackbarObject.color = "green"
  } catch (error) {
    console.error("Error updating field:", error);
  }
};

const fetchTrades = async () => {
  const q = query(collection(db, "trades"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  trades.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
}
</script>
