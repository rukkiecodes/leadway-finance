<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <v-container>
    <v-card width="400" class="mx-auto mt-16" color="transparent">
      <v-card-text>
        <v-btn variant="flat" color="indigo-accent-4" block @click="navigateTo('/app/overview')">
          Login as Client
        </v-btn>

        <v-btn variant="flat" color="black" block @click="navigateTo('/admin')">
          Login as Admin
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
