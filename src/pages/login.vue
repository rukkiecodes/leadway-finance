<template>
  <v-container class="d-flex justify-center align-center" style="height: 100%">
    <v-card rounded="lg" flat width="400">
      <v-card-text>
        <v-text-field
          variant="outlined"
          density="compact"
          label="Email"
          inputmode="email"
          v-model="email"
        />

        <v-text-field
          variant="outlined"
          density="compact"
          label="Password"
          type="password"
          v-model="password"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="signInUser" block :loading="loading" :disabled="loading"
               class="bg-indigo-accent-4 text-capitalize"
        >Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {useAppStore} from '@/stores/app'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase'

import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()


const {snackbarObject} = useAppStore()

const email = ref("")
const password = ref("")
const loading = ref(false)

const signInUser = async () => {
  if (!email.value || !password.value) {
    alert("Please fill in all fields")
    return
  } else {
    try {
      loading.value = true;

      const {user} = await signInWithEmailAndPassword(auth, email.value, password.value);
      localStorage.setItem("LeadWayUser", JSON.stringify(user))
      router.push('/overview')

      snackbarObject.show = true;
      snackbarObject.message = "Login successful!";
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
