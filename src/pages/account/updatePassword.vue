<template>
  <v-container>
    <v-card max-width="600" class="mx-auto mt-10">
      <v-card-text>
        <v-text-field
          variant="outlined"
          label="Password"
          density="compact"
          type="password"
          v-model="password"
          rounded="lg"
          color="indigo-accent-4"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="sendmail" block color="indigo-accent-4" variant="flat">Change Pasword</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {signOut, updatePassword} from "firebase/auth";
import {useAppStore} from "@/stores/app";
import {auth} from '@/firebase'
import {ref} from "vue";
import {useRouter} from "vue-router";

const {snackbarObject} = useAppStore()
const password = ref('')
const user = auth.currentUser;
const router = useRouter()

const sendmail = async () => {
  if (!password.value) return

  const newPassword = password.value;

  updatePassword(user, newPassword).then(() => {
    snackbarObject.show = true
    snackbarObject.message = 'Password updated successfully.'
    snackbarObject.color = 'green'
    signOutUser()
  }).catch((error) => {
    console.log(error.message);
    snackbarObject.show = true;
    snackbarObject.message = error.message;
    snackbarObject.color = 'red';
  });
}


const signOutUser = async () => {
  signOut(auth)
  localStorage.removeItem('LeadWayUser');
  router.push('/auth/login');
}
</script>
