<template>
  <v-app>
    <v-main>
      <router-view/>

      <v-snackbar v-model="snackbarObject.show" color="snackbarObject.color">
        {{ snackbarObject.message }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import {useAppStore} from '@/stores/app'

const {snackbarObject} = useAppStore()
</script>
