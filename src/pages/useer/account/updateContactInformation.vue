<template>
  <v-container>
    <p class="text-body-2 text-sm-body-1 text-md-h6 font-weight-bold text-center my-10">Update Contact Info</p>

    <v-card max-width="600" class="mx-auto">
      <v-card-text>
        <v-row>
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
            <v-text-field
              variant="outlined"
              density="compact"
              label="Address"
              v-model="address"
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="Zip Code"
              v-model="zip"
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

          <v-col cols="12" sm="6">
            <v-text-field
              variant="outlined"
              density="compact"
              label="State"
              v-model="state"
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              variant="outlined"
              density="compact"
              label="Country"
              :items="countries"
              v-model="country"
              rounded="lg"
              color="indigo-accent-4"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="updateContactInformation" :loading="loading" :disabled="loading" color="indigo-accent-4"
               variant="flat" block dark
        >Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useCountryStore} from '@/stores/user/countries'
import {useProfileStore} from '@/stores/user/profile'
import {useAppStore} from '@/stores/app'
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '@/firebase'

const {countries} = useCountryStore()
const profileStore = useProfileStore()
const {snackbarObject} = useAppStore()

const phone = ref('')
const address = ref('')
const zip = ref('')
const city = ref('')
const state = ref('')
const country = ref('Select Country')
const loading = ref(false)

const updateContactInformation = async () => {
  const uid = profileStore.profile?.uid
  if (!uid) return

  loading.value = true

  await updateDoc(doc(db, 'leadway_users', uid), {
    phone: phone.value || '',
    address: address.value || '',
    zip: zip.value || '',
    city: city.value || '',
    state: state.value || '',
    country: country.value || '',
  })

  loading.value = false
  snackbarObject.show = true
  snackbarObject.color = 'green'
  snackbarObject.message = 'Update Contact Information'
}

const autoFillInputs = () => {
  const {profile} = profileStore

  phone.value = profile?.phone || ''
  address.value = profile?.address || ''
  zip.value = profile?.zip || ''
  city.value = profile?.city || ''
  state.value = profile?.state || ''
  country.value = profile?.country || ''
}

onMounted(() => {
  if(profileStore.profile) autoFillInputs()
})
</script>
