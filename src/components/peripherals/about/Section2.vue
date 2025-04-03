<template>
  <v-sheet color="transparent" rounded="0" height="100vh" class="gradient mt-n1 mb-n16">
    <v-container class="d-flex flex-column justify-center align-center" style="height: 100%">
      <v-card width="100%" color="transparent" elevation="0">
        <v-card-text class="pa-0">
          <v-row>
            <v-col cols="12" sm="6">
              <v-row>
                <v-col cols="6" lg="3">
                  <p class="text-caption text-sm-body-2">Reg name:</p>
                </v-col>
                <v-col cols="6" lg="3">
                  <p class="text-caption text-sm-body-2 opacity-50">Leadway Finance LTD</p>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" lg="3">
                  <p class="text-caption text-sm-body-2">Whatsapp Number:</p>
                </v-col>
                <v-col cols="6" lg="3">
                  <p class="text-caption text-sm-body-2 text-teal-accent-4">+18163269799</p>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" lg="3">
                  <p class="text-caption text-sm-body-2">Official address:</p>
                </v-col>
                <v-col cols="6" lg="3">
                  <p class="text-caption text-sm-body-2 opacity-50">California, MD USA</p>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" sm="6" class="mt-10 mt-sm-0">
              <p class="text-h5 text-sm-h4 text-md-h3 text-lg-h2 font-weight-light">Officially registered <br> <span
                class="font-weight-bold"
              >company</span></p>
              <p class="mt-5 text-body-2 text-sm-body-1">Leadway Finance Limited</p>
              <p class="text-caption text-sm-body-2 mt-5">
                The unique development of our company has an official legal registration. You can check this
                information by clicking on the registration number.
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card width="100%" color="transparent" elevation="0">
        <v-row class="pt-5 pt-sm-16">
          <v-col cols="12" class="d-flex flex-column justify-center align-sm-center">
            <p class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-light text-teal-accent-4"
               style="text-transform: uppercase !important;"
            >
              Leadway Finance Stats
            </p>
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-col cols="1" class="d-flex justify-center align-center">
                <div style="background-color: #1DE9B6; width: 1px; height: 100%"/>
              </v-col>

              <v-col cols="12" sm="5">
                <p class="text-caption text-sm-body-2 text-md-body-1">
                  Here are online statistics of our company. Competent distribution of investments in the
                  Leadway Finance robot allows you to maximize profits at all stages of the market. Gradual development is
                  a guarantee of world recognition
                </p>
              </v-col>

              <v-col cols="12" sm="5">
                <p class="text-caption text-sm-body-2 text-md-body-1">
                  in the market. It is important for us to ensure the protection of our
                  investors, as well as the stability and uninterrupted operation of the platform. The Leadway Finance
                  robot is fully automated to operate without user intervention.
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <v-card width="100%" color="transparent" elevation="0" class="mt-10">
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card v-bind="props" rounded="xl" color="transparent"
                        class="d-flex flex-column justify-center align-center pa-10"
                >
                  <v-card-text>
                    <v-sheet
                      width="80"
                      height="80"
                      rounded="xl"
                      elevation="10"
                      style="border: 1px solid #1BDCAB"
                      class="d-flex justify-center align-center"
                    >
                      <v-img
                        src="@/assets/images/group.png"
                        width="50"
                        height="50"
                        :class="isHovering ? 'blue-tint' : 'grey-tint'"
                      />
                    </v-sheet>
                  </v-card-text>

                  <v-card-text class="text-center text-body-2 text-sm-body-1 font-weight-bold text-grey-darken-2">
                    <p class="text-body-1 text-sm-h6 text-md-h5 text-teal-accent-4">18,200+</p>
                    <p>Total Members</p>
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card v-bind="props" rounded="xl" color="transparent"
                        class="d-flex flex-column justify-center align-center pa-10"
                >
                  <v-card-text>
                    <v-sheet
                      width="80"
                      height="80"
                      rounded="xl"
                      elevation="10"
                      style="border: 1px solid #1BDCAB"
                      class="d-flex justify-center align-center"
                    >
                      <v-img
                        src="@/assets/images/dollar.png"
                        width="50"
                        height="50"
                        :class="isHovering ? 'blue-tint' : 'grey-tint'"
                      />
                    </v-sheet>
                  </v-card-text>

                  <v-card-text class="text-center text-body-2 text-sm-body-1 font-weight-bold text-grey-darken-2">
                    <p class="text-body-1 text-sm-h6 text-md-h5 text-teal-accent-4">$32,362,000+</p>
                    <p>Total Invested</p>
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card v-bind="props" rounded="xl" color="transparent"
                        class="d-flex flex-column justify-center align-center pa-10"
                >
                  <v-card-text>
                    <v-sheet
                      width="80"
                      height="80"
                      rounded="xl"
                      elevation="10"
                      style="border: 1px solid #1BDCAB"
                      class="d-flex justify-center align-center"
                    >
                      <v-img
                        src="@/assets/images/money-withdraw.png"
                        width="50"
                        height="50"
                        :class="isHovering ? 'blue-tint' : 'grey-tint'"
                      />
                    </v-sheet>
                  </v-card-text>

                  <v-card-text class="text-center text-body-2 text-sm-body-1 font-weight-bold text-grey-darken-2">
                    <p class="text-body-1 text-sm-h6 text-md-h5 text-teal-accent-4">$58,200,000+</p>
                    <p>Total Paid</p>
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<style scoped>
.gradient {
  width: 100vw;
  background: linear-gradient(#182A26, #111C1810);
}

* {
  transition: .2s all ease-in-out;
}

.blue-tint {
  filter: brightness(0) saturate(100%) invert(80%) sepia(22%) saturate(500%) hue-rotate(120deg) brightness(105%) contrast(95%);;
}

.grey-tint {
  filter: brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) brightness(90%) contrast(100%)
}
</style>

<script setup lang="ts">
</script>
