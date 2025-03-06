<template>
  <v-sheet rounded="lg" class="pa-5">
    <div class="d-flex justify-space-around mb-5">
      <div class="d-flex flex-column justify-center align-center text-center">
        <span class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-bold">$0.00</span>
        <span class="text-uppercase text-caption text-sm-body-2 mt-2">Deposit</span>
      </div>

      <div class="d-flex flex-column justify-center align-center text-center">
        <span class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-bold">$0.00</span>
        <span class="text-uppercase text-caption text-sm-body-2 mt-2">Profit</span>
      </div>

      <div class="d-flex flex-column justify-center align-center text-center">
        <span class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-bold">$0.00</span>
        <span class="text-uppercase text-caption text-sm-body-2 mt-2">Total</span>
      </div>
    </div>

    <v-progress-linear model-value="20" :height="5" rounded></v-progress-linear>
    <span>TRADING PERIOD (20%)</span>
  </v-sheet>

  <div class="d-flex justify-space-around mt-10">
    <div class="d-flex flex-column justify-center align-center text-center">
      <v-icon color="indigo-accent-4">mdi-piggy-bank</v-icon>
      <span class="text-uppercase text-caption text-sm-body-2 mt-2 text-indigo-accent-4">Deposit</span>
    </div>

    <div class="d-flex flex-column justify-center align-center text-center">
      <v-icon color="indigo-accent-4">mdi-account-multiple</v-icon>
      <span class="text-uppercase text-caption text-sm-body-2 mt-2 text-indigo-accent-4">Traders</span>
    </div>

    <div class="d-flex flex-column justify-center align-center text-center">
      <v-icon color="indigo-accent-4">mdi-grid</v-icon>
      <span class="text-uppercase text-caption text-sm-body-2 mt-2 text-indigo-accent-4">Assets</span>
    </div>
  </div>
</template>
