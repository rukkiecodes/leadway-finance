<template>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
    >
      <v-tab value="Open" color="indigo-accent-4">
        <v-icon icon="mdi-chart-arc"></v-icon>

        <span class="text-capitalize text-caption text-sm-body-2 text-md-body-1 ml-2">Open</span>
      </v-tab>

      <v-tab value="Closed" color="indigo-accent-4">
        <v-icon icon="mdi-chart-donut-variant"></v-icon>

        <span class="text-capitalize text-caption text-sm-body-2 text-md-body-1 ml-2">Closed</span>
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="Open">
        <v-card>
          <v-card-text class="text-center text-grey-darken-2">No Open Trades</v-card-text>
        </v-card>
      </v-tabs-window-item>

      <v-tabs-window-item value="Closed">
        <v-card>
          <v-card-text class="text-center text-grey-darken-2">No Closed Trades</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup lang="ts">
import {ref} from "vue";

const tab = ref(null)

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
</script>
