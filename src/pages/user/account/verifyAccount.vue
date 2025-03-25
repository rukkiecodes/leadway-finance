<template>
  <v-container>
    <v-card max-width="600" class="mx-auto mt-10">
      <v-card-text>
        <v-text-field
          variant="outlined"
          label="Email"
          density="compact"
          inputmode="email"
          v-model="auth.currentUser.email"
          rounded="lg"
          color="indigo-accent-4"
          disabled
          hide-details
        />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="sendmail" :loading="loading" :disabled="loading" block color="indigo-accent-4" variant="flat">
          Verify Account
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {signOut, sendEmailVerification} from "firebase/auth";
import {useAppStore} from "@/stores/app";
import {auth} from '@/firebase'
import {ref} from "vue";
import {useRouter} from "vue-router";

const {snackbarObject} = useAppStore()
const loading = ref(false);
const router = useRouter()

const sendmail = async () => {
  await sendEmailVerification(auth.currentUser)

  snackbarObject.show = true
  snackbarObject.message = 'Email has been sent'
  snackbarObject.color = 'green'

  await signOut(auth)
  router.push('/auth/login');
}
</script>
