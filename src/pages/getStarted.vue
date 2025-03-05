<template>
  <v-container class="d-flex justify-center align-center" style="height: 100%">
    <v-card rounded="lg" flat width="800">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              variant="outlined"
              density="compact"
              label="Account Type"
              :items="['Demo', 'Live']"
              v-model="accountType"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Email"
              inputmode="email"
              v-model="email"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Password"
              type="password"
              v-model="password"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Confirm Password"
              type="password"
              v-model="confirmPassword"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="First Name"
              v-model="firstName"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Last Name"
              v-model="lastName"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Phone Number"
              v-model="phone"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              variant="outlined"
              density="compact"
              label="Currency"
              :items="['USD', 'CAD', 'EUR', 'GBP', 'AUD']"
              v-model="currency"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-autocomplete
              variant="outlined"
              density="compact"
              label="Country"
              :items="countries"
              v-model="country"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="City"
              v-model="city"
            />
          </v-col>

          <v-col cols="12" class="d-flex justify-center align-center text-center">
            <v-checkbox v-model="checkbox" hide-details/>
            <span>I declare that the information provided is correct and accept all terms of service</span>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="registerUser" block :loading="loading" :disabled="!checkbox || loading"
               class="bg-indigo-accent-4 text-capitalize"
        >Sign up
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {useCountryStore} from '@/stores/countries'
import {useAppStore} from '@/stores/app'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '../firebase'

import {ref} from "vue";

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

const registerUser = async () => {
  if (!checkbox.value || !accountType.value || !email.value || !password.value || !firstName.value || !lastName.value || !phone.value || !currency.value || !country.value || !city.value) {
    alert("Please fill in all fields")
    return
  } else {
    try {
      loading.value = true;

      const {user} = await createUserWithEmailAndPassword(auth, email.value, password.value);
      localStorage.setItem("LeadWayUser", JSON.stringify(user))

      await setDoc(doc(db, "users", user.uid), {
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
