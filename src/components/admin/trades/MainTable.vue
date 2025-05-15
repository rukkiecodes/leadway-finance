<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import {defineProps} from "vue";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc
} from "firebase/firestore";
import {db} from "@/firebase";

// Define props
const props = defineProps<{
  user: Record<string, any>;
}>();

const search = ref('')
const trades = ref([])
const flippedTrade = ref(null)
const assets = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'BTC/USD', 'ETH/USD']

const headers = computed(() => [
  {title: "Sent to client", key: "isVisible", sortable: true},
  {title: "", key: "actions", sortable: false},
  {title: "Asset", key: "asset", sortable: true},
  {title: "Currency", key: "currency"},
  {title: "Amount", key: "amount"},
  {title: "Duration", key: "duration"},
  {title: "Entry Price", key: "entryPrice"},
  {title: "Exit Price", key: "exitPrice"},
  {title: "Result", key: "result"},
  {title: "Date", key: "date"},
  {title: "Created At", key: "createdAt"}
]);

const fetchTrades = async () => {
  const q = query(collection(db, "leadway_users", props.user?.uid, 'trades'), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    trades.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  });

  return unsubscribe;
}

const flipTrade = (trade: {
  result: 'WIN' | 'LOSS'
  entryPrice: number
  exitPrice: number
  [key: string]: any
}) => {
  const flipped = {...trade}

  const priceDiff = Math.abs(trade.exitPrice - trade.entryPrice)

  // Flip result
  flipped.result = trade.result === 'WIN' ? 'LOSS' : 'WIN'

  // Adjust exitPrice to flip outcome
  if (flipped.result === 'WIN') {
    flipped.exitPrice = +(trade.entryPrice + priceDiff || 1).toFixed(2)
  } else {
    flipped.exitPrice = +(trade.entryPrice - priceDiff || 1).toFixed(2)
  }

  flippedTrade.value = flipped
}

const saveFlipTrade = async (trade: {
  result: 'WIN' | 'LOSS'
  entryPrice: number
  exitPrice: number
  [key: string]: any
}) => {
  await updateDoc(doc(db, "leadway_users", props.user?.uid, 'trades', trade.id), {
    ...flippedTrade.value,
    flippedAt: new Date()
  })
}

const showTradeToClient = async (trade: {
  result: 'WIN' | 'LOSS'
  entryPrice: number
  exitPrice: number
  [key: string]: any
}, value) => {
  await updateDoc(doc(db, "leadway_users", props.user?.uid, 'trades', trade.id), {
    isVisible: value
  })

  recalculateFunds(trade, value)
}

const calculateFunds = (trade, value) => {
  const totalAmount = parseFloat(props.user?.totalAmount)
  const totalBalance = parseFloat(props.user?.totalBalance)
  const totalEarnings = parseFloat(props.user?.totalEarnings)
  const trading = parseFloat(props.user?.trading)
  const investment = parseFloat(props.user?.investment)

  const tradeAmount = parseFloat(trade?.amount)

  const positiveValues = {
    totalAmount: totalAmount + tradeAmount,
    totalBalance: totalBalance + tradeAmount,
    totalEarnings: totalEarnings + tradeAmount,
    trading: trading + tradeAmount,
    investment: investment + tradeAmount,
  }

  const negativeValues = {
    totalAmount: totalAmount - tradeAmount,
    totalBalance: totalBalance - tradeAmount,
    totalEarnings: totalEarnings - tradeAmount,
    trading: trading - tradeAmount,
    investment: investment - tradeAmount,
  }

  if (value) {
    if (trade.result === 'WIN') return positiveValues
    else return negativeValues
  } else {
    return negativeValues
  }
}

const recalculateFunds = async (trade, value) => {
  try {
    console.log(calculateFunds(trade, value))
    await updateDoc(doc(db, "leadway_users", props.user?.uid), calculateFunds(trade, value))
  } catch (error) {
    console.log('Error recalculating user ballance: ', error)
  }
}

onMounted(() => {
  fetchTrades()
})
</script>

<template>
  <!--  {{props.user.uid}}-->
  <v-toolbar density="compact" color="transparent">
    <template v-slot:prepend>
      <v-toolbar-title>Edit Account Trades</v-toolbar-title>
    </template>
  </v-toolbar>
  <v-divider class="mb-5"/>

  <v-card rounded="xl">
    <v-card-text>
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
      <v-data-table
        v-model:search="search"
        :items="trades"
        density="comfortable"
        :headers="headers"
        class="mt-10"
        :filter-keys="['currency', 'result', 'entryPrice', 'exitPrice', 'asset', 'amount', 'duration']"
      >
        <template v-slot:item.asset="{ item }">
          <p class="text-caption">{{ item?.asset }}</p>
        </template>

        <template v-slot:item.currency="{ item }">
          <p class="text-caption">{{ item?.currency }}</p>
        </template>

        <template v-slot:item.amount="{ item }">
          <p class="text-caption">{{ item?.amount }}</p>
        </template>

        <template v-slot:item.duration="{ item }">
          <p class="text-caption">{{ item?.duration }}</p>
        </template>

        <template v-slot:item.entryPrice="{ item }">
          <p class="text-caption">{{ item?.entryPrice }}</p>
        </template>

        <template v-slot:item.exitPrice="{ item }">
          <p class="text-caption">{{ item?.exitPrice }}</p>
        </template>

        <template v-slot:item.result="{ item }">
          <p class="text-caption" :class="item.result == 'LOSS' ? 'text-red' : 'text-green'">
            {{ item?.result }}</p>
        </template>

        <template v-slot:item.date="{ item }">
          <p class="text-caption">{{ new Date(item?.date.seconds * 1000).toDateString() }}</p>
        </template>

        <template v-slot:item.createdAt="{ item }">
          <p class="text-caption">{{ new Date(item?.createdAt.seconds * 1000).toDateString() }}</p>
        </template>

        <template v-slot:item.actions="{ internalItem, isExpanded, toggleExpand, item }">
          <v-btn
            class="text-none"
            color="medium-emphasis"
            size="small"
            icon
            elevation="0"
            @click="() => {toggleExpand(internalItem)}"
          >
            <v-icon>{{ isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </template>

        <template v-slot:item.isVisible="{ item }">
          <v-switch
            inset
            hide-details
            density="compact"
            v-model="item.isVisible"
            @update:modelValue="showTradeToClient(item, item.isVisible)"
            :color="item.isVisible ? 'indigo-accent-4' : ''"
          />
        </template>

        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length" class="mx-0 px-0">
              <v-row class="py-5">
                <v-col cols="12" sm="4">
                  <v-card color="transparent" flat width="500">
                    <v-card-text>
                      <v-list density="compact">
                        <v-list-item density="compact">
                          <div class="d-flex">
                            <span class="text-caption text--sm-body-2" style="width: 100px">Asset:</span>
                            <span class="text-caption text--sm-body-2">{{ item.asset }}</span>
                          </div>
                        </v-list-item>

                        <v-list-item density="compact">
                          <div class="d-flex">
                            <span class="text-caption text--sm-body-2" style="width: 100px">Currency:</span>
                            <span class="text-caption text--sm-body-2">{{ item.currency }}</span>
                          </div>
                        </v-list-item>

                        <v-list-item density="compact">
                          <div class="d-flex">
                            <span class="text-caption text--sm-body-2" style="width: 100px">Amount:</span>
                            <span class="text-caption text--sm-body-2">{{ item.amount }}</span>
                          </div>
                        </v-list-item>

                        <v-list-item density="compact">
                          <div class="d-flex">
                            <span class="text-caption text--sm-body-2" style="width: 100px">Duration:</span>
                            <span class="text-caption text--sm-body-2">{{ item.duration }}</span>
                          </div>
                        </v-list-item>

                        <v-list-item density="compact">
                          <div class="d-flex">
                            <span class="text-caption text--sm-body-2" style="width: 100px">Entry Price:</span>
                            <span class="text-caption text--sm-body-2">{{ item.entryPrice }}</span>
                          </div>
                        </v-list-item>

                        <v-list-item density="compact">
                          <div class="d-flex">
                            <span class="text-caption text--sm-body-2" style="width: 100px">Exit Price:</span>
                            <span class="text-caption text--sm-body-2">{{ item.exitPrice }}</span>
                          </div>
                        </v-list-item>

                        <v-list-item density="compact">
                          <div class="d-flex">
                            <span class="text-caption text--sm-body-2" style="width: 100px">Result:</span>
                            <span class="text-caption text--sm-body-2"
                                  :class="item.result == 'LOSS' ? 'text-red' : 'text-green'"
                            >{{ item.result }}</span>
                          </div>
                        </v-list-item>

                        <v-list-item density="compact">
                          <div class="d-flex">
                            <span class="text-caption text--sm-body-2" style="width: 100px">Date:</span>
                            <span class="text-caption text--sm-body-2">{{
                                new Date(item.date.seconds * 1000).toDateString()
                              }}</span>
                          </div>
                        </v-list-item>
                      </v-list>

                      <v-btn
                        color="indigo-accent-4"
                        rounded="lg"
                        elevation="0"
                        class="text-caption"
                        @click="flipTrade(item)"
                      >
                        Flip Trade
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col>
                  <v-card
                    v-if="flippedTrade"
                    title="Flipped result"
                    subtitle="Flipped results will be replaced with the original result"
                    elevation="0"
                    :color="flippedTrade.result == 'WIN' ? 'green' : 'red'"
                    variant="outlined"
                    rounded="xl"
                  >
                    <v-card-text class="mt-5">
                      <v-select
                        :items="assets"
                        variant="outlined"
                        rounded="lg"
                        density="compact"
                        label="Asset"
                        v-model="flippedTrade.asset"
                      />
                      <v-text-field
                        variant="outlined"
                        rounded="lg"
                        density="compact"
                        label="Amount"
                        v-model="flippedTrade.amount"
                      />
                      <v-text-field
                        variant="outlined"
                        rounded="lg"
                        density="compact"
                        label="Duration"
                        v-model="flippedTrade.duration"
                      />
                      <v-text-field
                        variant="outlined"
                        rounded="lg"
                        density="compact"
                        label="Entry Price"
                        v-model="flippedTrade.entryPrice"
                      />
                      <v-text-field
                        variant="outlined"
                        rounded="lg"
                        density="compact"
                        label="Exit Price"
                        v-model="flippedTrade.exitPrice"
                      />
                      <v-select
                        :items="['WIN', 'LOSS']"
                        variant="outlined"
                        rounded="lg"
                        density="compact"
                        label="Result"
                        :color="flippedTrade.result == 'WIN' ? 'green' : 'red'"
                        v-model="flippedTrade.result"
                      />
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                        :color="flippedTrade.result == 'WIN' ? 'green' : 'red'"
                        variant="flat"
                        rounded="xl"
                        elevation="0"
                        class="text-caption"
                        @click="saveFlipTrade(item)"
                      >
                        Save Flip Trade
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>

                <v-col cols="12">
                  <v-card elevation="0">
                    <v-card-text>
                      <p>Trades generated will not be seen by client until the admin allows it</p>
                      <v-btn
                        color="indigo-accent-4"
                        variant="flat"
                        rounded="xl"
                        elevation="0"
                        class="text-caption mt-2"
                        @click="showTradeToClient(item, true)"
                      >
                        Show Trade
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
