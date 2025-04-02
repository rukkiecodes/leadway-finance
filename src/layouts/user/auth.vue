<template>
  <AppBar />
  <Drawer />

  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>

  <Footer />
</template>


<script setup lang="ts">
import Footer from "@/components/peripherals/Footer.vue";
import AppBar from "@/components/peripherals/AppBar.vue";
import Drawer from "@/components/peripherals/Drawer.vue";
</script>
