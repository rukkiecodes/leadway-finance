<template>
  <v-container>
    <div class="module-border-wrap rounded-xl" style="position: relative;">
      <v-row class="module rounded-xl px-5">
        <v-col class="d-flex align-center justify-center" cols="12" sm="5" md="6">
          <v-img src="@/assets/images/payment.png" />
        </v-col>

        <v-col cols="12" sm="7" md="5" class="d-flex align-center justify-center">
          <v-card color="transparent" width="400" flat>
            <v-card-text class="text-center d-flex flex-column justify-center align-center">
              <p class="text-center text-body-1 text-sm-h6 font-weight-bold">PAYMENT SYSTEMS</p>

              <p class="text-center text-body-2 text-sm-body-1 mt-5 mb-10 text-grey-darken-3">MexbitCapital supports a big number of payment systems</p>

              <p class="text-center text-body-2 text-sm-body-1">
                Our company does not charge commissions for opening a deposit, as well as withdrawing funds
                from the platform
              </p>

              <div class="d-flex mt-5">
                <div class="module-border-wrap rounded-lg" style="padding: 1.5px">
                  <v-btn to="/auth/login" class="module ma-0 px-10" rounded="lg" size="large">
                    INVEST
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>


<style scoped>
.module-border-wrap {
  position: relative;
  background: linear-gradient(90deg, #40efeb, #9ed163);
  padding: 0.86rem;
}

.module {
  background: #222;
  color: white;
  background: #000;
}

.line1 {
  position: absolute;
  width: 100%;
  height: 1px;
  top: 0;
  left: 0;
  background: linear-gradient(90deg, #40efeb, #9ed163)
}

.line2 {
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, #40efeb, #9ed163)
}
</style>
<script setup lang="ts">
</script>
