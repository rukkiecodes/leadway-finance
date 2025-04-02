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
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Email"
              inputmode="email"
              v-model="email"
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>

          <v-col cols="12" sm="6">
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

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Confirm Password"
              type="password"
              v-model="confirmPassword"
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="First Name"
              v-model="firstName"
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Last Name"
              v-model="lastName"
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Phone Number"
              v-model="phone"
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              variant="outlined"
              density="compact"
              label="Currency"
              :items="['USD', 'CAD', 'EUR', 'GBP', 'AUD']"
              v-model="currency"
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-autocomplete
              variant="outlined"
              density="compact"
              label="Country"
              :items="countries"
              v-model="country"
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="City"
              v-model="city"
              rounded="lg"
              color="indigo-accent-4"
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

<script lang="ts">
import {useCountryStore} from '@/stores/user/countries'
import {useAppStore} from '@/stores/app'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {updateDoc, doc, getDoc, setDoc, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '@/firebase'
import {ref} from "vue";
import router from '@/router'

export default {
  setup() {
    const {snackbarObject} = useAppStore()
    const {countries} = useCountryStore()

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

    return {
      checkbox,
      accountType,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phone,
      currency,
      country,
      city,

      countries,
      snackbarObject,
      loading
    }
  },

  methods: {
    async registerUser() {
      if (!this.checkbox || !this.accountType || !this.email || !this.password || !this.firstName || !this.lastName || !this.phone || !this.currency || !this.country || !this.city) {
        alert("Please fill in all fields")
        return
      } else {
        try {
          this.loading = true;

          const {user} = await createUserWithEmailAndPassword(auth, this.email, this.password);

          await setDoc(doc(db, "leadway_users", user.uid), {
            uid: user.uid,
            checkbox: this.checkbox,
            accountType: this.accountType,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            currency: this.currency,
            country: this.country,
            city: this.city,
            timestamp: serverTimestamp()
          });

          this.addReferrals(user)

          this.snackbarObject.show = true;
          this.snackbarObject.message = "Registration successful!";
          this.snackbarObject.color = "info";

          this.loading = false
          router.push('/app/overview')
        } catch (error) {
          this.snackbarObject.show = true;
          this.snackbarObject.message = `Error: ${error.message}`;
          this.snackbarObject.color = "error";
        } finally {
          this.loading = false;
        }
      }
    },

    async addReferrals(user) {
      const inviterProfile = await (await getDoc(doc(db, 'leadway_users', this.$route.params.user))).data()
      const new_totalBalance = parseFloat(inviterProfile.totalBalance) + 50

      await updateDoc(doc(db, 'leadway_users', this.$route.params.user), {
        totalBalance: new_totalBalance
      })

      const referredUser = await (await getDoc(doc(db, 'leadway_users', user?.uid))).data()

      await setDoc(doc(db, 'leadway_users', this.$route.params.user, 'referrals', user?.uid), {
        ...referredUser
      })
    }
  }
}
</script>
