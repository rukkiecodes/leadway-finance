<script setup lang="ts">
import {computed, defineProps, onMounted, ref} from "vue";
import {db} from '@/firebase'
import {collection, doc, onSnapshot, orderBy, query, updateDoc} from "firebase/firestore";

const props = defineProps<{
  user: Record<string, any>;
}>();

const search = ref('')
const trades = ref([])

const headers = computed(() => [
  {title: "Approve", key: "isVisible", sortable: true},
  {title: "Asset", key: "asset", sortable: true},
  {title: "Currency", key: "currency"},
  {title: "Amount", key: "amount"},
  {title: "Duration", key: "duration"},
  {title: "Entry", key: "entryPrice"},
  {title: "Exit", key: "exitPrice"},
  {title: "Result", key: "result"},
]);

const fetchTrades = async () => {
  const q = query(collection(db, "leadway_users", props.user?.id, 'trades'), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    trades.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  });

  return unsubscribe;
}

const showTradeToClient = async (trade: {
  result: 'WIN' | 'LOSS'
  entryPrice: number
  exitPrice: number
  [key: string]: any
}, value) => {
  await updateDoc(doc(db, "leadway_users", props.user?.id, 'trades', trade.id), {
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
    await updateDoc(doc(db, "leadway_users", props.user?.id), calculateFunds(trade, value))
  } catch (error) {
    console.log('Error recalculating user ballance: ', error)
  }
}

onMounted(() => {
  fetchTrades()
})
</script>

<template>
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
  </v-data-table>
</template>
