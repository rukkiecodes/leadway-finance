<template>
  <v-sheet height="100vh" class="overflow-hidden">
    <v-row style="height: 100%">
      <v-col cols="12" md="7">
        <v-img
          cover
          :height="height"
          src="@/assets/images/bg.jpg"
          gradient="to top right, rgba(100,115,201,.10), rgba(25,32,72,.9)"
        >

        </v-img>
      </v-col>

      <v-col cols="12" md="5" class="d-flex justify-center align-center">
        <v-card rounded="lg" flat class="mx-auto" max-width="800">
          <v-card-title class="mb-5">Register</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  rounded="lg"
                  hide-details
                  variant="outlined"
                  density="compact"
                  label="Account Type"
                  v-model="accountType"
                  color="indigo-accent-4"
                  :items="['Demo', 'Live']"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  hide-details
                  rounded="lg"
                  label="Email"
                  v-model="email"
                  density="compact"
                  inputmode="email"
                  variant="outlined"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  hide-details
                  rounded="lg"
                  type="password"
                  label="Password"
                  density="compact"
                  variant="outlined"
                  v-model="password"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  hide-details
                  rounded="lg"
                  type="password"
                  density="compact"
                  variant="outlined"
                  color="indigo-accent-4"
                  label="Confirm Password"
                  v-model="confirmPassword"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  hide-details
                  rounded="lg"
                  density="compact"
                  variant="outlined"
                  label="First Name"
                  v-model="firstName"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  hide-details
                  rounded="lg"
                  density="compact"
                  label="Last Name"
                  variant="outlined"
                  v-model="lastName"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  hide-details
                  rounded="lg"
                  v-model="phone"
                  density="compact"
                  variant="outlined"
                  label="Phone Number"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  hide-details
                  rounded="lg"
                  label="Currency"
                  density="compact"
                  variant="outlined"
                  v-model="currency"
                  color="indigo-accent-4"
                  :items="['USD', 'CAD', 'EUR', 'GBP', 'AUD']"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-autocomplete
                  hide-details
                  rounded="lg"
                  label="Country"
                  density="compact"
                  v-model="country"
                  variant="outlined"
                  :items="countries"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  hide-details
                  label="City"
                  rounded="lg"
                  v-model="city"
                  density="compact"
                  variant="outlined"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12" class="d-flex justify-center align-center text-center">
                <v-checkbox v-model="checkbox" hide-details/>
                <router-link
                  to="/terms"
                  class="text-caption text-sm-body-2 text-decoration-none"
                >
                  I declare that the information provided is correct and accept all terms of service
                </router-link>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn
              block
              rounded="lg"
              :loading="loading"
              @click="registerUser"
              :disabled="!checkbox || loading"
              class="bg-indigo-accent-4 text-capitalize"
            >
              Sign up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import {useCountryStore} from '@/stores/user/countries'
import {useAppStore} from '@/stores/app'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '@/firebase'
import {useRouter} from "vue-router";
import {computed, ref} from 'vue'
import {useDisplay} from 'vuetify'

const {name} = useDisplay()
const router = useRouter()

const {countries} = useCountryStore()
const {snackbarObject} = useAppStore()

const checkbox = ref(false)
const accountType = ref("Demo")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const firstName = ref("")
const lastName = ref("")
const phone = ref("")
const currency = ref("")
const country = ref("Afghanistan")
const city = ref("")
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

const registerUser = async () => {
  if (!checkbox.value || !accountType.value || !email.value || !password.value || !firstName.value || !lastName.value || !phone.value || !currency.value || !country.value || !city.value) {
    alert("Please fill in all fields")
    return
  } else {
    try {
      loading.value = true;

      const {user} = await createUserWithEmailAndPassword(auth, email.value, password.value);

      await setDoc(doc(db, "leadway_users", user.uid), {
        uid: user.uid,
        checkbox: checkbox.value,
        accountType: accountType.value,
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value,
        currency: currency.value,
        country: country.value,
        city: city.value,
        timestamp: serverTimestamp()
      });

      snackbarObject.show = true;
      snackbarObject.message = "Registration successful!";
      snackbarObject.color = "info";

      loading.value = false
      router.push('/app/overview')
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
