<template>
  <v-container>
    <v-card max-width="600" class="mx-auto mt-10">
      <v-card-text>
        <v-text-field
          variant="outlined"
          label="New Email"
          density="compact"
          inputmode="email"
          v-model="email"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="sendmail" :loading="loading" :disabled="loading" block color="indigo-accent-4" variant="flat">
          Update Email
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {signOut, updateEmail} from "firebase/auth";
import {useAppStore} from "@/stores/app";
import {auth} from '@/firebase'
import {ref} from "vue";
import {useRouter} from "vue-router";

const {snackbarObject} = useAppStore()
const email = ref('')
const loading = ref(false);
const router = useRouter()

const sendmail = async () => {
  if (!email.value) return
  const newEmail = email.value;

  loading.value = true;

  updateEmail(auth.currentUser, newEmail)
    .then(() => {
      snackbarObject.show = true
      snackbarObject.message = 'Email updated successfully.'
      snackbarObject.color = 'green'

      loading.value = false;
      signOutUser()
    }).catch((error) => {
    console.log(error.message);
    loading.value = false;

    snackbarObject.show = true;
    snackbarObject.message = error.message;
    snackbarObject.color = 'red';
    signOutUser()
  });
}

const signOutUser = async () => {
  signOut(auth)
  localStorage.removeItem('LeadWayUser');
  router.push('/auth/login');
}
</script>
