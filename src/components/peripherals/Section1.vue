<template>
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
  <v-img
    cover
    height="100vh"
    src="@/assets/images/bg.jpg"
    gradient="to top right, rgba(100,115,201,.10), rgba(25,32,72,.9)"
    class="img-fluid d-flex justify-space-between align-center mt-n2"
  >
    <v-container>
      <v-row>
        <v-col cols="0" sm="2" md="6" lg="8"/>

        <v-col cols="12" sm="10" md="6" lg="4">
          <h1 class="text-h5 text-sm-h4 text-md-h3 text-lg-h2 font-weight-light text-right text-md-left">Secure Your
            Future with Bluezone Finance</h1>
          <p class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6 text-right text-md-left">Enjoy lifetime
            returns and grow your wealth with confidence.</p>

          <v-sheet class="d-flex justify-end justify-md-start" color="transparent">
            <v-btn
              rounded="lg"
              size="x-large"
              to="/auth/login"
              color="indigo-accent-4"
              class="mt-5 text-caption text-sm-body-2 tet-md-body-1 font-weight-light px-10"
            >
              Get Started
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>
<script setup lang="ts">
</script>
