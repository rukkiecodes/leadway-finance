<template>
  <v-card color="transparent" rounded="0" height="100vh" class="gradient mt-n1 mb-n16">
    <v-container class="d-flex flex-column justify-center align-center" style="height: 100%">
      <v-card class="mb-10 pt-16 mx-auto" width="450" max-width="100%" color="transparent" flat>
        <v-card-title class="text-center text-body-1 text-sm-h6 text-md-h5">BEST Bluezone Finance TRADERS</v-card-title>
        <v-card-text class="text-center text-caption text-sm-body-2">
          The best cryptocurrency developers works in our company. They have a wealth of experience and
          understanding of the crypto market behind them. They brought Bluezone Finance to the world level of
          development
        </v-card-text>
      </v-card>

      <v-card
        class="mx-auto"
        elevation="0"
        max-width="100vw"
        color="transparent"
      >
        <v-slide-group
          v-model="model"
          :show-arrow="false"
        >
          <v-slide-group-item>
            <v-card width="350" class="gradient2 card my-16 mx-5" rounded="xl" elevation="10" flat>
              <v-sheet width="100" height="100" class="d-flex justify-center align-center pa-5 head-sheet"
                       rounded="xl"
                       color="teal-accent-4" elevation="10">
                <v-icon size="50">mdi-chart-donut</v-icon>
              </v-sheet>
              <v-sheet class="head-sheet2" width="80" height="80" elevation="5" rounded="xl"/>
              <v-sheet class="head-sheet3" width="80" height="80" elevation="5" rounded="xl"/>

              <v-card height="300" class="d-flex flex-column justify-center align-center px-10" color="transparent">
                <p class="text-center text-body-1 text-sm-h6">UNIQUE TRADE BOT</p>
                <p class="text-center text-caption text-sm-body-2">
                  Bluezone Finance team of professionals has created a unique trading robot that makes profit at any
                  stage of the market: rise or fall
                </p>
              </v-card>
            </v-card>
          </v-slide-group-item>

          <v-slide-group-item>
            <v-card width="350" class="gradient2 card my-16 mx-5" rounded="xl" elevation="10" flat>
              <v-sheet width="100" height="100" class="d-flex justify-center align-center pa-5 head-sheet"
                       rounded="xl"
                       color="teal-accent-4" elevation="10">
                <v-icon size="50">mdi-sitemap-outline</v-icon>
              </v-sheet>
              <v-sheet class="head-sheet2" width="80" height="80" elevation="5" rounded="xl"/>
              <v-sheet class="head-sheet3" width="80" height="80" elevation="5" rounded="xl"/>

              <v-card height="300" class="d-flex flex-column justify-center align-center px-10" color="transparent">
                <p class="text-center text-body-1 text-sm-h6">COPY TRADING</p>
                <p class="text-center text-caption text-sm-body-2">
                  Having the opportunity to access the knowledge and strategies of experienced top traders.
                </p>
              </v-card>
            </v-card>
          </v-slide-group-item>

          <v-slide-group-item>
            <v-card width="350" class="gradient2 card my-16 mx-5" rounded="xl" elevation="10" flat>
              <v-sheet width="100" height="100" class="d-flex justify-center align-center pa-5 head-sheet"
                       rounded="xl"
                       color="teal-accent-4" elevation="10">
                <v-icon size="50">mdi-chart-donut</v-icon>
              </v-sheet>
              <v-sheet class="head-sheet2" width="80" height="80" elevation="5" rounded="xl"/>
              <v-sheet class="head-sheet3" width="80" height="80" elevation="5" rounded="xl"/>

              <v-card height="300" class="d-flex flex-column justify-center align-center px-10" color="transparent">
                <p class="text-center text-body-1 text-sm-h6">THE EXPERTS WILL DO EVERYTHING FOR YOU</p>
                <p class="text-center text-caption text-sm-body-2">
                  The highly professional Bluezone Finance team controls all the processes of the trading robot around
                  the clock. After investing, you will observe the growth of your capital in real time
                </p>
              </v-card>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-card>

      <v-btn
        rounded="xl"
        size="x-large"
        elevation="10"
        to="/auth/login"
        variant="outlined"
        color="teal-accent-3"
        class="text-caption text-sm-body-2 text-md-body-1"
      >
        INVEST WITH US AND GET STABLE INCOME
      </v-btn>
    </v-container>
  </v-card>
</template>

<script setup>
import {ref} from "vue"

const model = ref(null)
</script>

<style scoped>
.gradient {
  width: 100vw;
  background: linear-gradient(#182A26, #111C1810);
}

.gradient2 {
  background: linear-gradient(#182A26, #111C1810);
}

.card {
  position: relative;
  overflow: initial;
}

.head-sheet {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 2;
  background: linear-gradient(#6E9E9B, #0D2627);
}

.head-sheet2 {
  position: absolute;
  top: -15%;
  left: 43%;
  transform: translate(-40%, 0%);
  z-index: 1;
  background: linear-gradient(#6E9E9B, #0D2627);
}

.head-sheet3 {
  position: absolute;
  top: -15%;
  left: 54%;
  transform: translate(-40%, 0%);
  z-index: 1;
  background: linear-gradient(#6E9E9B, #0D2627);
}
</style>

<script setup lang="ts">
</script>
