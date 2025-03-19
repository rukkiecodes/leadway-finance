<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Sumary />
      </v-col>

      <v-col cols="12">
        <Clients />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import Sumary from "@/components/admin/home/Sumary.vue";
import Clients from "@/components/admin/home/Clients.vue";
</script>
