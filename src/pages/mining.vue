<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="sm6" md="5">
        <v-row>
          <v-col cols="12">
            <v-img src="@/assets/images/hue.png" cover rounded="lg" height="200">
              <div class="d-flex justify-space-around align-center" style="height: 100%">
                <div class="d-flex flex-column justify-center align-center text-center">
                  <span class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-bold">$0.00</span>
                  <span class="text-uppercase text-caption text-sm-body-2 mt-2">MINING BALANCE</span>
                </div>

                <div class="d-flex flex-column justify-center align-center text-center">
                  <span class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-bold">$0.00</span>
                  <span class="text-uppercase text-caption text-sm-body-2 mt-2">TOTAL MINED</span>
                </div>
              </div>
            </v-img>
          </v-col>

          <v-col cols="12">
            <v-btn to="/plans/mining" block variant="outlined" color="indigo-accent-4" rounded="0" size="x-large">
              MINING PLANS
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="sm6" md="7">
        <v-row>
          <v-col cols="12" v-for="mine in mining" :key="mine.id">
            <router-link to="/plans/mining" class="text-decoration-none">
              <v-sheet class="d-flex justify-space-between align-center pa-2 pr-5 cursor-pointer" rounded="lg">
                <div class="d-flex justify-start align-center gc-5 gc-sm-10">
                  <v-avatar :image="mine.image" rounded="lg" size="x-large"/>
                  <div class="d-flex flex-column">
                    <span class="text-caption text-sm-body-2 text-md-body-1">${{ mine.price }}</span>
                    <span class="text-caption text-sm-body-2 text-md-body-1">0.000000000 {{ mine.currency }}</span>
                  </div>
                </div>

                <span class="text-caption text-sm-body-2 text-md-body-1">0 TH/s</span>
              </v-sheet>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {useMiningStore} from '@/stores/mining'

const {mining} = useMiningStore()
</script>
