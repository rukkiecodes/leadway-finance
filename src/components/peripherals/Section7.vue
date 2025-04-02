<template>
  <v-container class="my-16">
    <v-row>
      <v-col cols="12" md="5" lg="5" xl="4">
        <v-card color="transparent">
          <v-card-title>REFERRAL PROGRAM</v-card-title>
          <v-card-text class="text-caption text-sm-body-2 font-weight-light">
            Anyone can take part in the affiliate program. It allows you to receive generous rewards by
            inviting new members
          </v-card-text>
        </v-card>

        <v-divider class="my-5" inset/>

        <v-row>
          <v-col cols="8">
            <v-card color="transparent">
              <v-card-title>4 LEVELS OF REFERRAL PROGRAM</v-card-title>
              <v-card-text class="text-caption text-sm-body-2 font-weight-light">
                Get extra profit when people in your structure invite new investors to the company
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="4">
            <div class="d-flex flex-column align-end">
              <p class="text-h6 text-md-h5 text-lg-h4 text-teal-accent-3">5<span
                class="text-body-1 text-md-h6 text-lg-h5"
              >%</span> - 4 <span class="text-body-1 text-md-h6 text-lg-h5">%</span></p>
              <p class="text-h6 text-md-h5 text-lg-h4 text-teal-accent-3">2<span
                class="text-body-1 text-md-h6 text-lg-h5"
              >%</span> - 1 <span class="text-body-1 text-md-h6 text-lg-h5">%</span></p>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="7" lg="7" xl="8">
        <v-row>
          <v-col cols="12" sm="6" lg="6" xl="3">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card v-bind="props" rounded="xl" class="d-flex flex-column justify-center align-center pa-10">
                  <v-card-text>
                    <v-sheet
                      width="80"
                      height="80"
                      elevation="10"
                      rounded="xl"
                      class="d-flex justify-center align-center"
                      style="border: 1px solid #1BDCAB"
                    >
                      <v-img
                        src="@/assets/images/247.png"
                        width="50"
                        height="50"
                        :class="isHovering ? 'blue-tint' : 'grey-tint'"
                      />
                    </v-sheet>
                  </v-card-text>

                  <v-card-text
                    :class="isHovering ? 'text-white' : 'text-grey-darken-2'"
                    class="text-center text-body-2 text-sm-body-1 font-weight-bold"
                  >
                    ROBOT TRADING WITHOUT WEEKENDS AND HOLIDAYS
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </v-col>

          <v-col cols="12" sm="6" lg="6" xl="3">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card v-bind="props" min-height="320" rounded="xl" class="d-flex flex-column justify-center align-center pa-10">
                  <v-card-text>
                    <v-sheet
                      width="80"
                      height="80"
                      elevation="10"
                      rounded="xl"
                      class="d-flex justify-center align-center"
                      style="border: 1px solid #1BDCAB"
                    >
                      <v-img
                        src="@/assets/images/transfer.png"
                        width="50"
                        height="50"
                        :class="isHovering ? 'blue-tint' : 'grey-tint'"
                      />
                    </v-sheet>
                  </v-card-text>

                  <v-card-text
                    :class="isHovering ? 'text-white' : 'text-grey-darken-2'"
                    class="text-center text-body-2 text-sm-body-1 font-weight-bold"
                  >
                    SWIFT AND SMOOTH WITHDRAWAL 24/7 CARRIED OUT DAILY
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </v-col>

          <v-col cols="12" sm="6" lg="6" xl="3">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card v-bind="props" min-height="320" rounded="xl" class="d-flex flex-column justify-center align-center pa-10">
                  <v-card-text>
                    <v-sheet
                      width="80"
                      height="80"
                      elevation="10"
                      rounded="xl"
                      class="d-flex justify-center align-center"
                      style="border: 1px solid #1BDCAB"
                    >
                      <v-img
                        src="@/assets/images/wallet.png"
                        width="50"
                        height="50"
                        :class="isHovering ? 'blue-tint' : 'grey-tint'"
                      />
                    </v-sheet>
                  </v-card-text>

                  <v-card-text
                    :class="isHovering ? 'text-white' : 'text-grey-darken-2'"
                    class="text-center text-body-2 text-sm-body-1 font-weight-bold"
                  >
                    BIG NUMBER OF PAYMENT FROM OUR SYSTEMS EVERY DAY
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </v-col>

          <v-col cols="12" sm="6" lg="6" xl="3">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card v-bind="props" min-height="320" rounded="xl" class="d-flex flex-column justify-center align-center pa-10">
                  <v-card-text>
                    <v-sheet
                      width="80"
                      height="80"
                      elevation="10"
                      rounded="xl"
                      class="d-flex justify-center align-center"
                      style="border: 1px solid #1BDCAB"
                    >
                      <v-img
                        src="@/assets/images/hierarchical-structure.png"
                        width="50"
                        height="50"
                        :class="isHovering ? 'blue-tint' : 'grey-tint'"
                      />
                    </v-sheet>
                  </v-card-text>

                  <v-card-text
                    :class="isHovering ? 'text-white' : 'text-grey-darken-2'"
                    class="text-center text-body-2 text-sm-body-1 font-weight-bold"
                  >
                    BIG NUMBER OF PAYMENT FROM OUR SYSTEMS EVERY DAY
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
</script>

<style scoped>
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
