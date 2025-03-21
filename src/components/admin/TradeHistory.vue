<template>
  <v-card flat>
    <v-data-table
      :filter-keys="['name']"
      :items="trades"
      :headers="headers"
    >
      <template v-slot:item.user="{ item }">
        <TradeHistoryUser :user="item.user" />
      </template>

      <template v-slot:item.asset="{ item }">
        <p>{{item.asset?.paymentMethod}}</p>
      </template>

      <template v-slot:item.contract="{ item }">
        <v-icon :color="item.contract == 'LOSS' ? 'red' : 'green'" size="25">{{ item.contract == 'LOSS' ? 'mdi-menu-down' : 'mdi-menu-up' }}</v-icon>
      </template>

      <template v-slot:item.tradingAmount="{ item }">
        <p>${{formatMoney(item.tradingAmount)}}</p>
      </template>

      <template v-slot:item.timestamp="{ item }">
        <p>{{ new Date(item.timestamp.seconds * 1000).toDateString() }}}</p>
      </template>

      <template v-slot:item.tradeStatus="{ item }">
        <p :class="item.tradeStatus == 'WIN' ? 'text-green' : 'text-red'">{{ item.tradeStatus }}</p>
      </template>

      <template v-slot:item.profitOrLossPayout="{ item }">
        <p>${{ item.tradeStatus == 'WIN' ? '' : '-' }}{{ formatMoney(item.profitOrLossPayout) }}</p>
      </template>
    </v-data-table>
  </v-card>
</template>


<script lang="ts">
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {db} from '@/firebase'
import TradeHistoryUser from "@/components/admin/TradeHistoryUser.vue";

export default {
  components: {TradeHistoryUser},
  data () {
    return {
      trades: [],
      headers: [
        { key: 'user', title: 'User' },
        { key: 'asset', title: 'Asset' },
        { key: 'contract', title: '' },
        { key: 'tradingAmount', title: 'Trade' },
        { key: 'timestamp', title: 'Date' },
        { key: 'tradeStatus', title: 'Status' },
        { key: 'profitOrLossPayout', title: 'Payout' },
      ],
    }
  },

  setup() {

    return {}
  },

  mounted() {
    this.fetchTrades()
  },

  methods: {
    async fetchTrades() {
      const q = query(collection(db, "trade_history"), orderBy("timestamp", 'desc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.trades = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      });

      return unsubscribe;
    },

    formatMoney(amount, currency = 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
    }
  }
}
</script>
