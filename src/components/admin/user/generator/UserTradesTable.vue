<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {db} from '@/firebase'
import {collection, getDocs} from 'firebase/firestore'
import {format} from 'date-fns'

const userSummaries = ref<
  {
    userId: string
    totalTrades: number
    wins: number
    losses: number
    profit: number
  }[]
>([])

const fetchTradeSummaries = async () => {
  const summaries: typeof userSummaries.value = []
  const currentMonth = format(new Date(), 'yyyy-MM')
  const usersSnap = await getDocs(collection(db, 'leadway_users'))

  for (const userDoc of usersSnap.docs) {
    const userId = userDoc.id
    const tradesSnap = await getDocs(collection(db, 'future_trades', userId, currentMonth))

    if (!tradesSnap.empty) {
      const trades = tradesSnap.docs.map(doc => doc.data())
      const totalTrades = trades.length
      const wins = trades.filter(t => t.contract === 'WIN').length
      const losses = totalTrades - wins
      const profit = trades.reduce((sum, t) => sum + (t.profitOrLossPayout || 0), 0)

      summaries.push({userId, totalTrades, wins, losses, profit})
    }
  }

  userSummaries.value = summaries
}

onMounted(() => {
  fetchTradeSummaries()
})
</script>


<template>
  <v-card class="pa-4" elevation="0">
    <v-card-title class="text-h6">Monthly Trade Summary by User</v-card-title>

    <v-data-table
      :items="userSummaries"
      :headers="[
          { title: 'User ID', key: 'userId' },
          { title: 'Total Trades', key: 'totalTrades' },
          { title: 'Wins', key: 'wins' },
          { title: 'Losses', key: 'losses' },
          { title: 'Profit/Loss ($)', key: 'profit' },
        ]"
      item-value="userId"
      class="elevation-0"
      density="compact"
    >
      <template #item.profit="{ item }">
          <span :class="item.profit >= 0 ? 'text-success' : 'text-red'">
            {{ item.profit }}
          </span>
      </template>
    </v-data-table>
  </v-card>
</template>
