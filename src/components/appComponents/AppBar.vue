<template>
  <v-app-bar :elevation="0" order="1">
    <template v-slot:prepend>
      <router-link to="/overview">
        <v-img
          src="@/assets/images/logo.png"
          width="80"
        />
      </router-link>
    </template>

    <template v-slot:append>
      <v-chip size="x-large" class="pl-1">
        <v-avatar size="40">
          <v-img src="@/assets/images/avatar.png"/>
        </v-avatar>

        <span class="ml-2 text-caption text-sm-body-2 text-md-body-1">{{ profile.profile?.firstName }}</span>
      </v-chip>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import {useProfileStore} from "@/stores/profile";

const profile = useProfileStore();
</script>
