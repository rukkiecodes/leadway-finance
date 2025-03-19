<template>
  <v-tabs-window-item value="tansactions">
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
            <v-date-picker
              width="100%"
              v-model="date"
              color="indigo-accent-4"
              rounded="lg"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="transactionType"
              color="indigo-accent-4"
              rounded="lg"
              variant="outlined"
              density="compact"
              label="Transaction Type"
              :items="['Deposit', 'Withdrawal', 'Upgrade', 'Signal', 'Bonus', 'Tax']"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              density="compact"
              label="Transaction Status"
              variant="outlined"
              v-model="transactionStatus"
              rounded="lg"
              color="indigo-accent-4"
              :items="['Completed', 'Processing', 'Pending', 'Canceled']"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Amount"
              variant="outlined"
              v-model="amount"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="d-flex justify-end">
        <v-btn @click="saveTransaction" :loading="loading" :disabled="loading" variant="flat"
               color="indigo-accent-4" class="text-caption text-sm-body-2 text-md-body-1"
        >
          Save Transaction
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
            :items="allTransactions"
          >
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

const transactionType = ref("None");
const transactionStatus = ref("None");
const amount = ref("");
const date = ref(null);

const loading = ref(false)

const allTransactions = ref([])

const headers = [
  {key: 'transactionType', title: 'Type'},
  {key: 'amount', title: 'Amount'},
  {key: 'transactionStatus', title: 'Status'},
  {key: 'date', title: 'Date'},
]

const
  saveTransaction = async () => {
    if (!transactionType.value || !transactionStatus.value || !amount.value || !date.value) {
      return
    } else {
      try {
        loading.value = true;

        const dataToSave = {
          transactionType: transactionType.value,
          transactionStatus: transactionStatus.value,
          amount: amount.value,
          date: date.value,
        }

        const ssavedHistory = await addDoc(collection(db, 'leadway_users', props.user?.uid, 'transaction_history'), {
          ...dataToSave,
          timestamp: serverTimestamp(),
        })

        await setDoc(doc(db, 'transaction_history', ssavedHistory.id), {
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

const fetchTransactionHistory = async () => {
  const q = query(collection(db, "leadway_users", props.user?.uid, 'transaction_history'), orderBy("timestamp", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    allTransactions.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  });

  return unsubscribe;
}

onMounted(() => {
  fetchTransactionHistory();
})
</script>
