<template>
  <v-row>
    <v-col cols="6" sm="6" md="4" lg="3">
      <v-sheet rounded="lg"
               style="position: relative; background: linear-gradient(90deg, #0B1118, #0B111850); overflow: hidden;"
               height="150"
      >
        <v-sparkline
          :model-value="investment"
          :gradient="gradients[2]"
          height="100"
          padding="20"
          stroke-linecap="round"
          smooth="20"
          auto-draw
          style="opacity: 0.3;"
        />

        <div class="d-flex justify-space-between align-center rounded-lg pa-5"
             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0B111880"
        >
          <div class="d-flex flex-column">
            <p class="font-weight-bold text-body-1 text-sm-h6">${{ formatMoney(profile?.investment || 0) }}</p>
            <p class="text-caption text-sm-body-2 text-md-body-1 text-uppercase">INVESTMENT</p>
          </div>

          <v-icon size="40" class="opacity-60 d-none d-sm-inline">mdi-currency-usd</v-icon>
        </div>
      </v-sheet>
    </v-col>

    <v-col cols="6" sm="6" md="4" lg="3">
      <v-sheet rounded="lg"
               style="position: relative; background: linear-gradient(90deg, #0B1118, #0B111850); overflow: hidden;"
               height="150"
      >
        <v-sparkline
          :model-value="total"
          :gradient="gradients[4]"
          height="100"
          padding="20"
          stroke-linecap="round"
          smooth="20"
          auto-draw
          style="opacity: 0.3;"
        />

        <div class="d-flex justify-space-between align-center rounded-lg pa-5"
             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0B111880"
        >
          <div class="d-flex flex-column">
            <p class="font-weight-bold text-body-1 text-sm-h6">${{ formatMoney(profile?.totalBalance || 0) }}</p>
            <p class="text-caption text-sm-body-2 text-md-body-1 text-uppercase">TOTAL BALANCE</p>
          </div>

          <v-icon size="40" class="opacity-60 d-none d-sm-inline">mdi-chart-multiple</v-icon>
        </div>
      </v-sheet>
    </v-col>

    <v-col cols="6" sm="6" md="4" lg="3">
      <v-sheet rounded="lg"
               style="position: relative; background: linear-gradient(90deg, #0B1118, #0B111850); overflow: hidden;"
               height="150"
      >
        <div class="d-flex justify-space-between align-center rounded-lg pa-5"
             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0B111880"
        >
          <div class="d-flex flex-column">
            <p class="font-weight-bold text-body-1 text-sm-h6 blink">
              {{
                profile?.tradersCopied ? (truncateText((copyTraders[profile?.tradersCopied]?.name || 'NONE'), 20)) : 'None'
              }}
            </p>
            <p class="text-caption text-sm-body-2 text-md-body-1 text-uppercase">LINKED TO TRADER</p>
          </div>

          <v-icon size="40" class="opacity-60 d-none d-sm-inline">mdi-file-tree</v-icon>
        </div>
      </v-sheet>
    </v-col>

    <v-col cols="6" sm="6" md="4" lg="3">
      <v-sheet rounded="lg"
               style="position: relative; background: linear-gradient(90deg, #0B1118, #0B111850); overflow: hidden;"
               height="150"
      >
        <div class="d-flex justify-space-between align-center rounded-lg pa-5"
             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0B111880"
        >
          <div class="d-flex flex-column">
            <p class="font-weight-bold text-body-1 text-sm-h6 blink" :class="profile?.verified ? 'text-green' : 'text-red'">
              <v-icon :color="profile?.verified ? 'green' : 'red'">
                {{ profile?.verified ? 'mdi-check-circle' : 'mdi-close-circle' }}
              </v-icon>
               {{ profile?.verified ? 'VERIFIED' : 'NOT VERIFIED' }}
            </p>
            <p class="text-caption text-sm-body-2 text-md-body-1 text-uppercase">
              LINKED TO TRADER
            </p>
          </div>

          <v-icon size="40" class="opacity-60 d-none d-sm-inline">mdi-card-account-details</v-icon>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useCopyTradeStore} from '@/stores/user/copyTrade'
import {useProfileStore} from '@/stores/user/profile'
import {storeToRefs} from "pinia"

const copyTradersStore = useCopyTradeStore()
const profileStore = useProfileStore()
const {profile} = storeToRefs(profileStore)
const {copyTraders} = storeToRefs(copyTradersStore)


const investment = ref([]);
const total = ref([]);

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
];

// Function to generate random values
const generateRandomInvestment = () => {
  investment.value = Array.from({length: 15}, () => Math.floor(Math.random() * 20)); // Generates 15 random numbers (0-19)
};

const generateRandomTotal = () => {
  total.value = Array.from({length: 15}, () => Math.floor(Math.random() * 20)); // Generates 15 random numbers (0-19)
};

// Generate initial values on mount
generateRandomInvestment();
generateRandomTotal()

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const formatMoney = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
};
</script>


<style scoped>
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
}

.blink {
  animation: blink 1.5s infinite ease-in-out;
  text-transform: uppercase !important;
}
</style>
