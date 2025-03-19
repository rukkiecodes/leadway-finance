<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="3">
      <v-sheet rounded="lg" style="position: relative; background: linear-gradient(90deg, #0B1118, #0B111850); overflow: hidden;" height="150">
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

        <div class="d-flex justify-space-between align-center rounded-lg pa-5" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0B111880">
          <div class="d-flex flex-column">
            <p class="font-weight-bold text-body-1 text-sm-h6">$100,500.00</p>
            <p class="text-caption text-sm-body-2 text-md-body-1 text-uppercase">INVESTMENT</p>
          </div>

          <v-icon size="40" class="opacity-60">mdi-currency-usd</v-icon>
        </div>
      </v-sheet>
    </v-col>

    <v-col cols="12" sm="6" md="4" lg="3">
      <v-sheet rounded="lg" style="position: relative; background: linear-gradient(90deg, #0B1118, #0B111850); overflow: hidden;" height="150">
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

        <div class="d-flex justify-space-between align-center rounded-lg pa-5" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0B111880">
          <div class="d-flex flex-column">
            <p class="font-weight-bold text-body-1 text-sm-h6">$316,895.00</p>
            <p class="text-caption text-sm-body-2 text-md-body-1 text-uppercase">TOTAL BALANCE</p>
          </div>

          <v-icon size="40" class="opacity-60">mdi-chart-multiple</v-icon>
        </div>
      </v-sheet>
    </v-col>

    <v-col cols="12" sm="6" md="4" lg="3" class="d-none d-md-inline">
      <v-sheet rounded="lg" style="position: relative; background: linear-gradient(90deg, #0B1118, #0B111850); overflow: hidden;" height="150">
        <div class="d-flex justify-space-between align-center rounded-lg pa-5" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0B111880">
          <div class="d-flex flex-column">
            <p class="font-weight-bold text-body-1 text-sm-h6 blink">
              {{ truncateText((copyTraders[profileStore.profile?.tradersCopied[0]]?.name || 'NONE'), 20) }}
            </p>
            <p class="text-caption text-sm-body-2 text-md-body-1 text-uppercase">LINKED TO TRADER</p>
          </div>

          <v-icon size="40" class="opacity-60">mdi-file-tree</v-icon>
        </div>
      </v-sheet>
    </v-col>

    <v-col cols="12" sm="6" md="4" lg="3" class="d-none d-lg-inline">
      <v-sheet rounded="lg" style="position: relative; background: line ar-gradient(90deg, #0B1118, #0B111850); overflow: hidden;" height="150">
        <div class="d-flex justify-space-between align-center rounded-lg pa-5" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0B111880">
          <div class="d-flex flex-column">
            <p class="font-weight-bold text-body-1 text-sm-h6 blink">
              <v-icon>mdi-check-circle</v-icon> VERIFIED
            </p>
            <p class="text-caption text-sm-body-2 text-md-body-1 text-uppercase">LINKED TO TRADER</p>
          </div>

          <v-icon size="40" class="opacity-60">mdi-card-account-details</v-icon>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCopyTradeStore } from '@/stores/user/copyTrade'
import { useProfileStore } from '@/stores/user/profile'

const {copyTraders} = useCopyTradeStore()
const profileStore = useProfileStore()


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
  investment.value = Array.from({ length: 15 }, () => Math.floor(Math.random() * 20)); // Generates 15 random numbers (0-19)
};

const generateRandomTotal = () => {
  total.value = Array.from({ length: 15 }, () => Math.floor(Math.random() * 20)); // Generates 15 random numbers (0-19)
};

// Generate initial values on mount
generateRandomInvestment();
generateRandomTotal()

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
</script>


<style scoped>
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.1; }
  100% { opacity: 1; }
}

.blink {
  animation: blink 1.5s infinite ease-in-out;
  text-transform: uppercase !important;
}
</style>
