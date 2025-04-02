<template>
  <v-container>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-spacer />

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
        />
      </v-card-title>

      <v-data-table
        :filter-keys="['status', 'id']"
        :items="deposits"
        :headers="headers"
        item-value="id"
        v-model:search="search"
        >
        <template v-slot:item.id="{ item }">
          <p class="text-caption text--sm-body-2">{{ item?.id }}</p>
        </template>

        <template v-slot:item.amount="{ item }">
          <p class="text-caption text--sm-body-2">${{ formatMoney(item?.amount) }}</p>
        </template>

        <template v-slot:item.convertedRate="{ item }">
          <p class="text-caption text--sm-body-2">{{ item?.convertedRate }} {{ item?.address?.code }}</p>
        </template>

        <template v-slot:item.type="{ item }">
          <v-chip>
            <v-icon v-if="item?.type == 'deposit'">mdi-arrow-up</v-icon>
            <v-icon v-if="item?.type == 'withdraw'">mdi-arrow-down</v-icon>
            <span class="text-caption text--sm-body-2 text-capitalize ml-2">{{ item?.type }}</span>
          </v-chip>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            class="text-caption text--sm-body-2 text-capitalize"
            :color="item?.status == 'Completed' ? 'green' : item?.status == 'Canceled' ? 'red' : 'amber'"
          >
            {{ item?.status }}
          </v-chip>
        </template>

        <template v-slot:item.timestamp="{ item }">
          <p class="text-caption text--sm-body-2">{{ new Date(item?.timestamp.seconds * 1000).toDateString() }}</p>
        </template>
      </v-data-table>
    </v-card>

    <v-btn
      to="/app/plans"
      position="fixed"
      location="bottom right"
      class="ma-5 text-caption text-sm-body-2 text-md-body-1"
      color="indigo-accent-4"
      prepend-icon="mdi-plus"
      rounded="pill"
      size="large"
    >
      Make a deposit
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import {useProfileStore} from '@/stores/user/profile'
import {useAppStore} from '@/stores/app'
import {onMounted, ref as vueRef} from "vue";
import {db} from '@/firebase';
import QrcodeVue from 'qrcode.vue'
import {collection, getDocs, query, addDoc, doc, serverTimestamp, setDoc} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const profileStore = useProfileStore();
const totalDeposits = vueRef('0.00')
const deposits = vueRef([])
const search = vueRef('')
const monthsAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const headers = [
  {key: 'id', title: 'Payment ID'},
  {key: 'amount', title: 'Amount'},
  {key: 'convertedRate', title: 'Rate'},
  {key: 'type', title: 'Type'},
  {key: 'status', title: 'Status'},
  {key: 'timestamp', title: 'Date'}
]

const fetchDeposits = async () => {
  const profile = profileStore.profile;
  if (!profile) return

  try {
    const paymentsRef = collection(db, "leadway_users", profile.uid, 'payments');
    const q = query(paymentsRef);
    const querySnapshot = await getDocs(q);

    deposits.value = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }))

    // Calculate total amount
    const totalAmount = querySnapshot.docs.reduce((sum, doc) => {
      const data = doc.data();
      return sum + (data.amount || 0); // Ensure 'amount' exists and is a number
    }, 0);

    // Format totalAmount as currency
    totalDeposits.value = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalAmount);
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  fetchDeposits();
});

const formatMoney = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
};
</script>
