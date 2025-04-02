<template>
  <v-img
    cover
    height="100vh"
    src="@/assets/images/robo_hand.jpg"
    gradient="to top right, rgba(34, 49, 34, 0.6), rgba(10, 25, 10, 0.9)"
    class="img-fluid d-flex justify-space-between align-center mt-n2 position-relative"
  >
    <div class="gradient">
      <v-container class="pt-sm-16">
        <v-sheet
          height="40vh"
          elevation="0"
          color="transparent"
          class="d-flex align-center"
        >
          <v-row>
            <v-col cols="0" sm="9" md="9">
              <h1 class="text-h5 text-sm-h4 text-md-h3 text-lg-h2 font-weight-light">
                RELIABLE INVESTMENT WITH <br>
                Leadway Finance
              </h1>
            </v-col>
          </v-row>
        </v-sheet>

        <v-sheet
          height="60vh"
          elevation="0"
          color="transparent"
          class="d-flex flex-column justify-start"
        >
          <v-card class="d-flex flex-column justify-start" elevation="0" color="transparent">
            <span class="text-h5 text-sm-h4 text-md-h3 text-lg-h2 font-weight-light text-teal-accent-3">
              ABOUT US
            </span>

            <span class="text-body-1 text-sm-h6 text-md-h5 text-lg-h4 font-weight-light text-teal-accent-3">
                GET LIFE INCOME
              </span>
          </v-card>

          <v-card elevation="0" color="transparent">
            <v-row class="pt-5 pt-sm-16">
              <v-col cols="12" class="d-flex flex-column justify-center align-sm-center">
                <p class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-light">
                  MexbitCapital- PROFESSIONAL TEAM
                </p>
                <p class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-light">
                  CRYPTO INDUSTRY DEVELOPERS
                </p>
              </v-col>

              <v-col cols="12">
                <v-row>
                  <v-col cols="1" class="d-flex justify-center align-center">
                    <div style="background-color: #1DE9B6; width: 1px; height: 100%"/>
                  </v-col>

                  <v-col cols="12" sm="5">
                    <p class="text-caption text-sm-body-2 text-md-body-1">
                      Our company has been developing stable cryptocurrency for years. Today MexbitCapital employees are
                      leaders in the field of IT technologies. They have created a unique robot that generates daily
                      profit and guesses the steps of the Bitcoin value. That is why the MexbitCapital robot is able to
                      benefit at any stage of the market: both growth and decline. This development is unique in that it
                      is the first
                    </p>
                  </v-col>

                  <v-col cols="12" sm="5">
                    <p class="text-caption text-sm-body-2 text-md-body-1">
                      in the world. Today, not many people know about this. That is why they are given the
                      chance to receive a stable income for the rest of their lives.
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-sheet>
      </v-container>
    </div>
  </v-img>
</template>

<style scoped>
.gradient {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
  background: linear-gradient(#111C1810, #182A26);
}
</style>
<script setup lang="ts">
</script>
