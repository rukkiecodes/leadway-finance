<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <Sumary />
      </v-col>

      <v-col cols="12" sm="6" class="mt-10 mt-sm-0">
        <TradeTab />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import Sumary from "@/components/appComponents/home/Sumary.vue";
import TradeTab from "@/components/appComponents/home/TradeTab.vue";
</script>
