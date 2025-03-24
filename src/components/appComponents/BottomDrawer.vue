<template>
  <v-navigation-drawer order="1" v-model="bottomDrawer" location="right" border="none" width="350">

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {useAppStore} from '@/stores/app'
import {storeToRefs} from 'pinia';

const appStore = useAppStore();
const {bottomDrawer} = storeToRefs(appStore);
</script>
