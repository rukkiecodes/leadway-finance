<template>
  <div>
    <div class="video-container">
      <video autoplay muted loop class="background-video">
        <source src="@/assets/videos/bg1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <v-sheet class="content d-flex flex-column justify-center align-center text-center px-2" height="100%" width="100%" color="rgba(0, 0, 0, 0.5)">
        <h1 class="text-h6 text-sm-h5 text-md-h4 text-lg-h3">Welcome to LeadWay</h1>
        <p class="text-caption text-sm-body-2 text-md-body-1">Seamlessly merging complexity with ease, NexbitCapital offers top-notch security, 24/7 support, and an intuitive platform for your trading needs.</p>

        <div class="d-flex ga-2 mt-5">
          <v-btn to="/getStarted" color="indigo-accent-4" elevation="0" rounded="0" class="text-capitalize text-caption text-sm-body-2 text-md-body-1">Get Started</v-btn>
          <v-btn to="/login" color="white" variant="outlined" elevation="0" rounded="0" class="text-capitalize text-caption text-sm-body-2 text-md-body-1">Login</v-btn>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<style scoped>
.video-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: absolute;
}
</style>
<script setup lang="ts">
</script>
