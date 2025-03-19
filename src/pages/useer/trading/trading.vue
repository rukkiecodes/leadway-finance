<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import {collection, doc, getDocs, query, serverTimestamp, setDoc, orderBy, where} from "firebase/firestore";
import {db} from '@/firebase'

const isLoading = ref(true);
const errorMessage = ref("");
const trades = ref([]);
const searchQuery = ref('')
const filter = ref('All')

const fetchCryptoData = async (symbol) => {
  try {
    const response = await axios.get(`http://localhost:3002/trade?symbol=${symbol}`);

    if (!response.status == 200) throw new Error("Failed to fetch data");

    console.log("Crypto Data:", response.data.data);
    saveToFirebase(response.data.data, symbol);
    return response.data;
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};

const saveToFirebase = async (data, symbol) => {
  await setDoc(doc(db, "trades", symbol), {
    ...data,
    market: 'indices',
    timestamp: serverTimestamp(),
  });
}

const fetchTrades = async () => {
  const convertFilterToLowerCase = filter.value.toLowerCase()

  const q1 = query(collection(db, "trades"), orderBy("timestamp", "desc"));
  const q2 = query(collection(db, "trades"), where('market', '==', convertFilterToLowerCase), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(convertFilterToLowerCase == 'all' ? q1 : convertFilterToLowerCase == '' ? q1 : q2);

  trades.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

onMounted(() => {
  // fetchCryptoData("TSX"); // Fetch Bitcoin data on mount
  fetchTrades()
});

const generateRandomCryptoValue = () => {
  return Math.random() * (2 - 0.00000001) + 0.00000001;
};

const shortenCryptoValue = (value) => {
  return parseFloat(value.toFixed(6));
};

const generateStockPercentage = () => {
  // Generate a random number between -5 and +5
  const randomValue = (Math.random() * 10 - 5).toFixed(2);

  // Convert to a number for accurate comparison
  const numericValue = parseFloat(randomValue);

  // Determine notation
  const notation = numericValue < 0 ? "negative" : "positive";

  // Format the value with a sign
  const value = `${numericValue >= 0 ? "+" : ""}${randomValue}%`;

  return {value, notation};
};

// Computed property for filtering trades based on search input
const filteredTrades = computed(() => {
  if (!searchQuery.value) return trades.value;
  return trades.value.filter(trade =>
    trade.symbol.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (trade.name && trade.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});
</script>

<template>
  <v-container>
    <v-sheet max-width="1000" class="mx-auto" color="transparent" dark>
      <iframe
        src="https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en#%7B%22symbol%22%3A%22BTCUSD%22%2C%22frameElementId%22%3A%22tradingview_7a4f3%22%2C%22interval%22%3A%221%22%2C%22range%22%3A%225D%22%2C%22save_image%22%3A%220%22%2C%22studies%22%3A%22%5B%5D%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%223%22%2C%22timezone%22%3A%22America%2FNew_York%22%2C%22studies_overrides%22%3A%22%7B%7D%22%2C%22utm_source%22%3A%22nexbitcapital.net%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22BTCUSD%22%2C%22page-uri%22%3A%22nexbitcapital.net%2Fuser%2Ftrading%3Fcurrent%3Dtrade%22%7D"
        width="100%"
        height="500"
        frameborder="0"
        allowfullscreen
      />
      <v-row class="mt-10">
        <v-col cols="12" sm="6">
          <v-text-field
            variant="outlined"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            v-model="searchQuery"
            rounded="lg"
            color="indigo-accent-4"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            variant="outlined"
            label="Filter"
            hide-details
            rounded="lg"
            color="indigo-accent-4"
            :items="['All', 'Cryptocurrencies', 'Meme', 'Stocks', 'Commodities', 'Forex', 'Indices', 'ETFs']"
            v-model="filter"
            @update:model-value="fetchTrades()"
          />
        </v-col>

        <v-col cols="12" v-for="trade in filteredTrades" :key="trade.id">
          <router-link :to="`/trading/${trade.symbol}`" class="text-decoration-none">
            <v-sheet rounded="lg" class="px-2 py-2 cursor-pointer">
              <v-row no-gutters>
                <v-col cols="12" sm="2">
                  <v-avatar
                    :image="trade?.logo"
                    rounded="lg"
                    size="70"
                  />
                </v-col>

                <v-divider class="my-2 d-sm-none"/>

                <v-col cols="12" sm="4" class="d-flex start align-center">
                  <div class="d-flex flex-column">
                    <p class="text-caption text-sm-body-2">{{ trade.symbol }}</p>
                    <p class="text-caption text-sm-body-2">{{ trade.name }} | {{ trade.market }}</p>
                    <p class="text-caption text-sm-body-2">{{
                        trade.price ? String(trade?.price).slice(0, 8) : shortenCryptoValue(generateRandomCryptoValue())
                      }}</p>
                  </div>
                </v-col>

                <v-divider class="my-2 d-sm-none"/>

                <v-col cols="4" sm="2" class="d-flex justify-start justify-sm-end align-center">
                  <p :class="generateStockPercentage().notation == 'negative' ? 'text-red' : 'text-green'">
                    {{ generateStockPercentage().value }}</p>
                </v-col>

                <v-col cols="4" sm="2" class="d-flex justify-center justify-sm-end align-center">
                  <p :class="generateStockPercentage().notation == 'negative' ? 'text-red' : 'text-green'">
                    {{ generateStockPercentage().value }}</p>
                </v-col>

                <v-col cols="4" sm="2" class="d-flex justify-end align-center">
                  <v-btn icon flat>
                    <v-icon color="indigo-lighten-2">mdi-star-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </router-link>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
