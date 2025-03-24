<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" lg="9">
        <iframe
          :src="frameSRC"
          border="0"
          marginwidth="0"
          marginheight="0"
          frameborder="0"
          scrolling="no"
          width="100%"
          height="550"
          id="marketData"
        />
      </v-col>

      <v-col cols="12" md="4" lg="3">
        <v-img src="@/assets/images/hue.png" cover rounded="lg" height="150">
          <div class="d-flex justify-space-around align-center" style="height: 100%">
            <div class="d-flex flex-column justify-center align-center text-center">
                  <span class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-bold">${{
                      formatMoney(profile?.trading || 0)
                    }}</span>
              <span class="text-uppercase text-caption text-sm-body-2 mt-2">TRADING BALANCE</span>
            </div>
          </div>
        </v-img>

        <v-card color="transparent" :loading="loading" :disabled="loading" class="pt-2 mt-10">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="tradingAmount"
                variant="outlined"
                density="compact"
                label="Amount(USD)"
                prepend-inner-icon="mdi-currency-usd"
                inputmode="numeric"
                type="number"
                hide-details
                rounded="lg"
                color="indigo-accent-4"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="leverage"
                variant="outlined"
                density="compact"
                label="Leverage (250 MAX)"
                prepend-inner-icon="mdi-currency-usd"
                inputmode="numeric"
                type="number"
                hide-details
                rounded="lg"
                color="indigo-accent-4"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="time"
                variant="outlined"
                density="compact"
                label="Time (Minutes)"
                prepend-inner-icon="mdi-currency-usd"
                inputmode="numeric"
                type="number"
                hide-details
                rounded="lg"
                color="indigo-accent-4"
              />
            </v-col>

            <v-col cols="12">
              <v-btn @click="transact('WIN')" flat block color="green-darken-3">BUY</v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn @click="transact('LOSS')" flat block color="red-darken-3">SELL</v-btn>
            </v-col>

            <v-col cols="12" class="d-flex align-center justify-space-around">
              <span>$0.00</span>
              <span>$0.00</span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card flat>

        </v-card>
        <v-data-table
          :headers="headers"
          :items="allTradeTransactions"
          :search="search"
          :filter-keys="['asset', 'id']"
        >
          <template v-slot:item.asset="{ item }">
            <p>{{ item.asset }}</p>
          </template>

          <template v-slot:item.date="{ item }">
            <p>{{ new Date(item.date.seconds * 1000).toDateString() }}</p>
          </template>

          <template v-slot:item.tradeStatus="{ item }">
            <div class="d-flex align-center" style="height: 100%">
              <v-icon size="25" :color="item.tradeStatus == 'WIN' ? 'green' : 'red'">{{ item.tradeStatus == 'WIN' ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon>
              <span :class="item.tradeStatus == 'WIN' ? 'text-green' : 'text-red'" class="text-caption text-sm-body-2">{{ item.tradeStatus }}</span>
            </div>
          </template>

          <template v-slot:item.profitOrLossPayout="{ item }">
            <p :class="item.tradeStatus == 'WIN' ? 'text-green' : 'text-red'" class="text-caption text-sm-body-2">{{ item.profitOrLossPayout }}</p>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore'
import {db, auth} from '@/firebase'
import {useAppStore} from '@/stores/app'
import {useProfileStore} from '@/stores/user/profile'
import {storeToRefs} from "pinia";


export default {
  data: () => ({
    frameSRC: '',

    tradingAmount: '',
    leverage: '',
    time: '',
    loading: false,

    search: '',

    allTradeTransactions: [],

    headers: [
      {key: 'asset', title: 'Asset'},
      {key: 'tradingAmount', title: 'Trade'},
      {key: 'date', title: 'Date'},
      {key: 'tradeStatus', title: 'Status'},
      {key: 'profitOrLossPayout', title: 'Payout'}
    ]
  }),

  setup() {
    const {snackbarObject} = useAppStore()
    const profileStore = useProfileStore();
    const {profile} = storeToRefs(profileStore);

    const formatMoney = (amount, currency = 'USD') => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
    }

    return {
      snackbarObject,
      formatMoney,
      profile
    }
  },

  created() {
    const symbol = this.$route.params?.symbol || 'BTC'
    this.frameSRC = `https://freeserv.dukascopy.com/2.0/?path=chart/index&showUI=true&showTabs=true&showParameterToolbar=true&showOfferSide=true&allowInstrumentChange=true&allowPeriodChange=true&allowOfferSideChange=true&showAdditionalToolbar=true&showDetachButton=true&presentationType=candle&axisX=true&axisY=true&legend=true&timeline=true&showDateSeparators=true&showZoom=true&showScrollButtons=true&showAutoShiftButton=true&crosshair=true&borders=false&uiColor=%23000&candleUpColor=%2300FF00&candleDownColor=%23F60002&wickUpColor=%2300ff00&wickDownColor=%23ff0000&barUpColor=%2300ff00&barDownColor=%23ff0000&availableInstruments=l%3A&instrument=${symbol}/USD&period=7&offerSide=BID&timezone=0&live=true&panLock=false&width=100%25&height=535&adv=popup`
    this.fetchTrades()
  },

  methods: {
    async transact(type) {
      const {uid} = auth.currentUser
      if (!uid) return

      if (!this.tradingAmount || !this.leverage || !this.time) return

      this.loading = true

      await addDoc(collection(db, 'trade_history'), {
        tradingAmount: this.tradingAmount,
        asset: this.$route.params?.symbol,
        tradeStatus: '',
        sendTradeHistory: false,
        time: this.time,
        date: serverTimestamp(),
        contract: type,
        profitOrLossPayout: 0,
        user: uid,
        timestamp: serverTimestamp()
      })

      this.loading = false

      alert('Trade placed')
    },

    async fetchTrades() {
      const {uid} = auth.currentUser
      if (!uid) return

      const q = query(
        collection(db, "trade_history"),
        where("user", "==", uid),
        where("sendTradeHistory", "==", true),
        orderBy('timestamp', 'desc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.allTradeTransactions = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      });

      return unsubscribe;
    }
  }
}
</script>


<style scoped>
#marketData {
  filter: invert(1) hue-rotate(180deg);
  width: 100%;
  border: none;
}
</style>
