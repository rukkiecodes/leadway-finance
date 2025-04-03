<template>
  <v-sheet height="100vh" class="overflow-hidden">
    <v-row style="height: 100%">
      <v-col cols="12" md="7">
        <v-img
          cover
          :height="height"
          src="@/assets/images/bg.jpg"
          gradient="to top right, rgba(100,115,201,.10), rgba(25,32,72,.9)"
        />
      </v-col>

      <v-col cols="12" md="5" class="d-sm-flex justify-md-center align-md-center">
        <v-card flat class="mx-auto" width="400" elevation="0">
          <v-card-title class="mb-5">Send Password reset Email</v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  rounded="lg"
                  label="Email"
                  v-model="email"
                  density="compact"
                  inputmode="email"
                  variant="outlined"
                  color="indigo-accent-4"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn
              block
              rounded="lg"
              :loading="loading"
              :disabled="loading"
              @click="resetPassword"
              class="bg-indigo-accent-4 text-capitalize"
            >
              Get Email
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import {useAppStore} from '@/stores/app'
import { sendPasswordResetEmail} from 'firebase/auth'
import {auth, db} from '@/firebase'
import {computed, ref} from 'vue'
import {useDisplay} from 'vuetify'

const {name} = useDisplay()

const {snackbarObject} = useAppStore()

const email = ref("")
const loading = ref(false)

const height = computed(() => {
  switch (name.value) {
    case 'xs':
      return 50
    case 'sm':
      return 50
    case 'md':
      return '100vh'
    case 'lg':
      return '100vh'
    case 'xl':
      return '100vh'
    case 'xxl':
      return '100vh'
  }

  return undefined
})

const resetPassword = async () => {
  if (!email.value) {
    alert("Please fill in all fields")
    return
  } else {
    try {
      loading.value = true;

      await sendPasswordResetEmail(auth, email.value)

      snackbarObject.show = true;
      snackbarObject.message = "Email Sent!";
      snackbarObject.color = "info";

      loading.value = false
    } catch (error) {
      snackbarObject.show = true;
      snackbarObject.message = `Error: ${error.message}`;
      snackbarObject.color = "error";
    } finally {
      loading.value = false;
    }
  }
}
</script>
