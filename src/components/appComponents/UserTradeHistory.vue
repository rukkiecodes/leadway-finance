<template>
  <v-card flat>
    <v-data-table
      :filter-keys="['name']"
      :items="trades"
      :headers="headers"
    >
      <template v-slot:item.asset="{ item }">
        <p class="text-caption text-sm-body-2">{{item.asset}}</p>
      </template>

      <template v-slot:item.contract="{ item }">
        <v-icon :color="item.contract == 'LOSS' ? 'red' : 'green'" size="25">{{ item.contract == 'LOSS' ? 'mdi-menu-down' : 'mdi-menu-up' }}</v-icon>
      </template>

      <template v-slot:item.tradingAmount="{ item }">
        <p class="text-caption text-sm-body-2">${{formatMoney(item.tradingAmount)}}</p>
      </template>

      <template v-slot:item.timestamp="{ item }">
        <p class="text-caption text-sm-body-2">{{ new Date(item.timestamp.seconds * 1000).toDateString() }}}</p>
      </template>

      <template v-slot:item.tradeStatus="{ item }">
        <p class="text-caption text-sm-body-2" :class="item.tradeStatus == 'WIN' ? 'text-green' : 'text-red'">{{ item.tradeStatus }}</p>
      </template>

      <template v-slot:item.profitOrLossPayout="{ item }">
        <p class="text-caption text-sm-body-2">${{ item.tradeStatus == 'WIN' ? '' : '-' }}{{ formatMoney(item.profitOrLossPayout) }}</p>
      </template>
    </v-data-table>
  </v-card>
</template>


<script lang="ts">
import {collection, query, orderBy, onSnapshot, where} from "firebase/firestore";
import {db, auth} from '@/firebase'

export default {
  data() {
    return {
      trades: [],
      headers: [
        {key: 'asset', title: 'Asset'},
        {key: 'contract', title: 'WIN / LOSS'},
        {key: 'tradingAmount', title: 'Trade'},
        {key: 'timestamp', title: 'Date'},
        {key: 'tradeStatus', title: 'Status'},
        {key: 'profitOrLossPayout', title: 'Payout'},
      ],
    }
  },

  mounted() {
    this.fetchTrades()
  },

  methods: {
    async fetchTrades() {
      const q = query(collection(db, "trade_history"), where('user', '==', auth.currentUser.uid), orderBy("timestamp", 'desc'));

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
