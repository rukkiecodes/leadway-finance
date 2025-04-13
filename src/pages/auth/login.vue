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
          <v-card-title class="mb-5">Login</v-card-title>

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

              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  label="Password"
                  type="password"
                  v-model="password"
                  rounded="lg"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12" class="d-flex justify-end align-center">
                <router-link
                  to="/auth/forgotPassword"
                  class="text-caption text-sm-body-2 text-white"
                >
                  Forgot Password?
                </router-link>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn
              rounded="lg"
              :loading="loading"
              :disabled="loading"
              @click="signInUser"
              class="bg-indigo-accent-4 text-capitalize mr-4"
              style="flex: 1"
            >
              Login
            </v-btn>

            <v-btn
              rounded="lg"
              class="bg-white"
              :loading="loading"
              :disabled="loading"
              @click="googleSignIn"
            >
              <v-img
                src="@/assets/images/google.png"
                width="25"
                height="25"
              />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import {useAppStore} from '@/stores/app'
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {updateDoc, doc, query, collection, where, getDocs, setDoc, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '@/firebase'
import {computed, ref} from 'vue'
import {useDisplay} from 'vuetify'

const {name} = useDisplay()
import {useRouter} from "vue-router";

const router = useRouter()


const {snackbarObject} = useAppStore()

const email = ref("")
const password = ref("")
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

const signInUser = async () => {
  if (!email.value || !password.value) {
    alert("Please fill in all fields")
    return
  } else {
    try {
      loading.value = true;

      const {user} = await signInWithEmailAndPassword(auth, email.value, password.value);

      snackbarObject.show = true;
      snackbarObject.message = "Login successful!";
      snackbarObject.color = "info";

      router.push('/app/overview')
      verifyUser(user)

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

const verifyUser = async (user) => {
  if (!user?.emailVerified) return

  await updateDoc(doc(db, 'leadway_users', user?.uid), {
    verified: true
  })

  snackbarObject.show = true;
  snackbarObject.message = "Account verification successful!";
  snackbarObject.color = "green";
}

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  const {user} = await signInWithPopup(auth, provider)
  router.push('/app/overview')

  const q = query(collection(db, "leadway_users"), where("uid", "==", user.uid));
  const userSnapshot = await getDocs(q);

  if (userSnapshot.empty) {
    await setDoc(doc(db, "leadway_users", user.uid), {
      uid: user.uid,
      firstName: user.displayName,
      email: user.email,
      phone: user.phoneNumber,
      photoURL: user.photoURL,
      timestamp: serverTimestamp()
    });
  }
}
</script>
