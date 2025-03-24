<template>
  <v-app-bar density="compact">
    <template v-slot:prepend>
      <router-link to="/auth">
        <v-img
          src="@/assets/images/logo.png"
          width="80"
        />
      </router-link>
    </template>

    <v-app-bar-title>Leadway Finance</v-app-bar-title>

    <template v-slot:append>
      <div class="d-flex ga-2">
        <v-btn to="/auth/getStarted" variant="text" class="text-capitalize">Register</v-btn>
        <v-btn to="/auth/login" variant="text" class="text-capitalize">Login</v-btn>
      </div>
    </template>
  </v-app-bar>

  <router-view />
</template>

