<template>
  <v-bottom-navigation>
    <v-btn
      value="home"
      to="/app/overview"
    >
      <v-icon>mdi-home</v-icon>

      <span>Home</span>
    </v-btn>

    <v-btn
      value="favorites"
      to="/app/copyTrading"
    >
      <v-icon>mdi-file-tree</v-icon>

      <span>Copy Trade</span>
    </v-btn>

    <v-btn
      value="nearby"
      to="/app/history"
    >
      <v-icon>mdi-swap-horizontal</v-icon>

      <span>History</span>
    </v-btn>

    <v-btn
      value="nearby"
      to="/app/transactions"
    >
      <v-icon>mdi-swap-horizontal</v-icon>

      <span>Transactions</span>
    </v-btn>
  </v-bottom-navigation>
</template>
