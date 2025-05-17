<template>
  <v-footer color="transparent">
    <v-container>
      <v-row>
        <v-col cols="12">
          <iframe
            src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no"
            width="100%"
            height="36px"
            scrolling="auto"
            marginwidth="0"
            marginHeight="0"
            frameborder="0"
            border="0"
            style="border:0;margin:0;padding:0;"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-row no-gutters>
            <v-col cols="6">
              <p class="text-body-2 text-sm-body-1 text-grey-darken-3 font-weight-bold">Menu</p>

              <div class="d-flex flex-column mt-5 ga-3 opacity-90">
                <router-link
                  to="/"
                  v-for="(link, index) in links1" :key="index"
                  class="text-caption text-sm-body-2 text-teal-accent-3 text-decoration-none"
                >
                  {{ link.name }}
                </router-link>
              </div>
            </v-col>

            <v-col cols="6">
              <p class="text-body-2 text-sm-body-1 text-grey-darken-3 font-weight-bold">Actions</p>

              <div class="d-flex flex-column mt-5 ga-3 opacity-90">
                <router-link
                  to="/"
                  v-for="(link, index) in links2" :key="index"
                  class="text-caption text-sm-body-2 text-teal-accent-3 text-decoration-none"
                >
                  {{ link.name }}
                </router-link>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="6">
          <p class="text-body-2 text-sm-body-1 text-grey-darken-3 font-weight-bold">Actions</p>

          <div class="d-flex justify-start align-center ga-5 mt-5 opacity-90">
            <v-icon color="teal-accent-3" size="18">mdi-email</v-icon>
            <a
              href="mailto:support@bluezonefinance.com"
              class="text-caption text-sm-body-2 text-teal-accent-3 text-decoration-none"
            >
              Email: support@bluezonefinance.com
            </a>
          </div>

          <div class="d-flex justify-start align-center ga-5 mt-3 opacity-90">
            <v-icon color="teal-accent-3" size="18">mdi-map-marker</v-icon>
            <p class="text-caption text-sm-body-2 text-teal-accent-3 text-decoration-none">Address : California, MD
              USA</p>
          </div>

          <div class="d-flex justify-start align-center ga-5 mt-3 opacity-90">
            <v-icon color="teal-accent-3" size="18">mdi-whatsapp</v-icon>
            <p class="text-caption text-sm-body-2 text-teal-accent-3 text-decoration-none">Whatsapp : +18163269799</p>
          </div>

          <v-row class="mt-5">
            <v-col cols="12" class="d-flex flex-column justify-center align-center">
              <p class="text-body-2 text-sm-body-1 text-grey-darken-3 font-weight-bold">Follow us on social media:</p>

              <div class="d-flex ga-5 mt-2">
                <v-btn icon elevation="0">
                  <v-icon color="teal-accent-3">mdi-instagram</v-icon>
                </v-btn>

                <v-btn icon elevation="0">
                  <v-icon color="teal-accent-3">mdi-facebook</v-icon>
                </v-btn>

                <v-btn icon elevation="0">
                  <v-icon color="teal-accent-3">mdi-twitter</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>


<script setup lang="ts">
import {ref} from "vue";

const links1 = ref([
  {name: "About Us", link: "/"},
  {name: "Investments", link: "/"},
  {name: "FAQ", link: "/"},
  {name: "Contacts", link: "/"},
  {name: "Mail Us", link: "/"},
])

const links2 = ref([
  {name: "Make a Deposit", link: "/"},
  {name: "Statistics", link: "/"},
  {name: "Copy Trading", link: "/"},
  {name: "Register", link: "/"},
  {name: "Login", link: "/"},
])
</script>
