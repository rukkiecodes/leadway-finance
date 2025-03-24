<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Sumary />
      </v-col>

      <v-col cols="12" class="mt-10">
        <LiveChart />
      </v-col>

      <v-col cols="12" class="mt-10">
        <MarketData />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import Sumary from "@/components/appComponents/home/Sumary.vue";
import LiveChart from "@/components/appComponents/home/LiveChart.vue";
import MarketData from "@/components/appComponents/home/MarketData.vue";
</script>
