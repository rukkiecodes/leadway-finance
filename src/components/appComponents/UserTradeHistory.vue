<template>
  <v-card flat>
    <v-data-table
      :filter-keys="['name']"
      :items="trades"
      :headers="headers"
    >
      <template v-slot:item.asset="{ item }">
        <p class="text-caption">{{item.asset}}</p>
      </template>

      <template v-slot:item.timestamp="{ item }">
        <p class="text-caption">{{ new Date(item.date ? (item.date.seconds * 1000) : (item.timestamp.seconds * 1000)).toDateString() }}</p>
      </template>

      <template v-slot:item.tradeStatus="{ item }">
        <p class="text-caption" :class="(item.tradeStatus || item.result) == 'WIN' ? 'text-green' : 'text-red'">{{ item.tradeStatus || item.result }}</p>
      </template>

      <template v-slot:item.tradingAmount="{ item }">
        <p class="text-caption">${{formatMoney(item.tradingAmount || item.amount)}}</p>
      </template>

      <template v-slot:item.amount="{ item }">
        <p class="text-caption">${{formatMoney(item.amount || item.entryPrice || item.tradingAmount)}}</p>
      </template>

      <template v-slot:item.profitOrLossPayout="{ item }">
        <p class="text-caption text-sm-body-2">${{ (item.tradeStatus || item.result) == 'WIN' ? '' : '-' }}{{ formatMoney(item.profitOrLossPayout || item.exitPrice) }}</p>
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
        {key: 'timestamp', title: 'Date'},
        {key: 'tradeStatus', title: 'Result'},
        {key: 'tradingAmount', title: 'Trade'},
        {key: 'amount', title: 'Entry'},
        {key: 'profitOrLossPayout', title: 'Exit'},
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
