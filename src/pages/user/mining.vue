<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="sm6" md="5">
        <v-row>
          <v-col cols="12">
            <v-img src="@/assets/images/hue.png" cover rounded="lg" height="200">
              <div class="d-flex justify-space-around align-center" style="height: 100%">
                <div class="d-flex flex-column justify-center align-center text-center">
                  <span class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-bold">${{
                      formatMoney(profile?.mining || 0)
                    }}</span>
                  <span class="text-uppercase text-caption text-sm-body-2 mt-2">MINING BALANCE</span>
                </div>

                <div class="d-flex flex-column justify-center align-center text-center">
                  <span class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-bold">${{
                      formatMoney(profile?.totalMined || 0)
                    }}</span>
                  <span class="text-uppercase text-caption text-sm-body-2 mt-2">TOTAL MINED</span>
                </div>
              </div>
            </v-img>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="sm6" md="7">
        <v-row>
          <v-col cols="12" v-for="mine in mining" :key="mine.id">
            <v-sheet class="d-flex justify-space-between align-center pa-2 pr-5" rounded="lg">
              <div class="d-flex justify-start align-center gc-5 gc-sm-10">
                <v-avatar :image="mine.image" rounded="lg" size="x-large"/>
                <div class="d-flex flex-column">
                  <span class="text-caption text-sm-body-2 text-md-body-1">${{ mine.price }}</span>
                  <span class="text-caption text-sm-body-2 text-md-body-1">0.000000000 {{ mine.currency }}</span>
                </div>
              </div>

              <span class="text-caption text-sm-body-2 text-md-body-1">0 TH/s</span>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {useMiningStore} from '@/stores/user/mining'
import {useProfileStore} from '@/stores/user/profile'
import {storeToRefs} from "pinia";

const {mining} = useMiningStore()
const profileStore = useProfileStore();
const {profile} = storeToRefs(profileStore);

const formatMoney = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
};
</script>
