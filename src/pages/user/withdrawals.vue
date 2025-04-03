<template>
  <v-container>
    <v-sheet rounded="lg">
      <v-toolbar density="compact" color="transparent" class="px-5">
        <template v-slot:prepend>
          <span class="text-body-2 text-sm-body-1 text-md-h6">Request Withdrawal</span>
        </template>

        <template v-slot:append>
          <div class="d-flex ga-2">
            <span class="text-body-2 text-sm-body-1 font-weight-bold">Balance:</span><span
            class="text-body-2 text-sm-body-1 text-green-darken-3 font-weight-bold"
          >${{ formatMoney(profile.totalBalance) }}</span>
          </div>
        </template>
      </v-toolbar>
      <v-divider/>

      <v-row class="mx-auto d-flex align-center justify-center mt-10">
        <v-col cols="1" class="d-flex align-center justify-center">
          <v-avatar @click="jumpToStep(1)" :color="step > 1 ? 'teal' : 'white'" :size="avatarSize" class="mx-auto"
                    :variant="step == 1 ? 'flat' : 'outlined'"
          >
            <v-icon>mdi-account-group</v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="4" class="d-flex align-center justify-center">
          <v-divider/>
        </v-col>

        <v-col cols="1" class="d-flex align-center justify-center">
          <v-avatar @click="jumpToStep(2)" :color="step > 2 ? 'teal' : 'white'" :size="avatarSize" class="mx-auto"
                    :variant="step == 2 ? 'flat' : 'outlined'"
          >
            <v-icon>mdi-credit-card-outline</v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="4" class="d-flex align-center justify-center">
          <v-divider/>
        </v-col>

        <v-col cols="1" class="d-flex align-center justify-center">
          <v-avatar @click="jumpToStep(3)" :color="verificationNumber.length ? 'teal' : 'white'" :size="avatarSize"
                    class="mx-auto"
                    :variant="step == 3 ? 'flat' : 'outlined'"
          >
            <v-icon>mdi-wallet</v-icon>
          </v-avatar>
        </v-col>
      </v-row>

      <v-row class="mx-auto d-none d-sm-flex align-center justify-center mt-n4 mt-md-n4">
        <v-col cols="2">
          <div class="d-flex flex-column justify-center align-center">
            <span class="text-body-2 text-sm-body-1 text-md-h6 text-center">STEP 1</span>
            <span class="d-none d-md-flex text-caption text-center">Personal Information</span>
          </div>
        </v-col>

        <v-col cols="3" class="d-flex align-center justify-center"/>

        <v-col cols="2">
          <div class="d-flex flex-column justify-center align-center">
            <span class="text-body-2 text-sm-body-1 text-md-h6 text-center">STEP 2</span>
            <span class="d-none d-md-flex text-caption text-center">Payment Detailes</span>
          </div>
        </v-col>

        <v-col cols="3" class="d-flex align-center justify-center"/>

        <v-col cols="2">
          <div class="d-flex flex-column justify-center align-center">
            <span class="text-body-2 text-sm-body-1 text-md-h6 text-center">STEP 3</span>
            <span class="d-none d-md-flex text-caption text-center">Verification</span>
          </div>
        </v-col>
      </v-row>

      <v-row class="pa-4">
        <v-col cols="12">
          <span class="text-body-2 text-sm-body-1 text-md-h6">{{
              step == 1 ? 'Personal Information' : step == 2 ? 'Payment Details' : 'Document Verification'
            }}</span>
        </v-col>
        <v-col cols="12" sm="5">
          <v-sheet v-if="step == 1" color="transparent" dark>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="fulName"
                  variant="outlined"
                  density="compact"
                  label="Full Name"
                  hide-details
                  rounded="lg"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  variant="outlined"
                  density="compact"
                  label="Email Address"
                  hide-details
                  inputmode="email"
                  type="email"
                  rounded="lg"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  variant="outlined"
                  density="compact"
                  label="Phone Number"
                  hide-details
                  inputmode="tel"
                  type="tel"
                  rounded="lg"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12">
                <v-autocomplete
                  v-model="country"
                  variant="outlined"
                  density="compact"
                  label="Country"
                  :items="countries"
                  hide-details
                  rounded="lg"
                  color="indigo-accent-4"
                />
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet v-if="step == 2" color="transparent" dark>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="withdrawalMethod"
                  variant="outlined"
                  density="compact"
                  label="Withdrawal Method"
                  :items="['Bitcoin', 'Ethereum', 'USDT(TRC20)']"
                  hide-details
                  rounded="lg"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="walletAddress"
                  variant="outlined"
                  density="compact"
                  label="Wallet Address"
                  hide-details
                  rounded="lg"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="amount"
                  variant="outlined"
                  density="compact"
                  label="Amount"
                  hide-details
                  rounded="lg"
                  color="indigo-accent-4"
                  type="number"
                />
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet v-if="step == 3" color="transparent" dark>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="documentType"
                  variant="outlined"
                  density="compact"
                  label="Document Type"
                  :items="['International Passport', 'National ID', 'Drivers License', 'Worker ID', 'Personal ID']"
                  hide-details
                  rounded="lg"
                  color="indigo-accent-4"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="verificationNumber"
                  variant="outlined"
                  density="compact"
                  label="Please enter a valid ID Number Document Number"
                  hide-details
                  rounded="lg"
                  color="indigo-accent-4"
                />
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="7">
          <p class="tet-caption tex-sm-body-2 text-sm-body-1 font-weight-black">Withdrawing Funds – How Does It
            Work?</p>
          <p class="tet-caption tex-sm-body-2 text-sm-body-1 font-weight-light">At our platform, we have designed our
            withdrawal process to be as easy and secured as our funding process. To begin the withdrawal process first
            fill your account information then select your preferred withdrawal method and then type in the amount you
            want to withdraw, verify your identity by uploading a valid ID and click "Request Withdrawal".</p>

          <p class="tet-caption tex-sm-body-2 text-sm-body-1 font-weight-black mt-5">What Methods Are There For
            Withdrawal Of Funds?</p>
          <p class="tet-caption tex-sm-body-2 text-sm-body-1 font-weight-light">We provide provide better withdrawal
            methods like (Bitcoin, Ethereum, USDT, Bank Transfer and more).</p>

          <p class="tet-caption tex-sm-body-2 text-sm-body-1 font-weight-black mt-5">Must Withdrawal Requests Only Be
            Made At Certain Times?</p>
          <p class="tet-caption tex-sm-body-2 text-sm-body-1 font-weight-light">Requests for withdrawals can be made
            at any time via our platform. The requests will be processed immediately, and during the relevant
            financial institutions’ business hours.</p>

          <p class="tet-caption tex-sm-body-2 text-sm-body-1 font-weight-black mt-5">Is There A Withdrawal Limit?</p>
          <p class="tet-caption tex-sm-body-2 text-sm-body-1 font-weight-light">Withdrawals are capped at the amount
            of funds that are currently in the account.</p>

          <p class="tet-caption tex-sm-body-2 text-sm-body-1 font-weight-black mt-5">How Long Does It Take To Get My
            Money?</p>
          <p class="tet-caption tex-sm-body-2 text-sm-body-1 font-weight-light">Withdrawal requests are addressed and
            handled as quickly as possible.</p>
        </v-col>
      </v-row>

      <v-divider class="mt-5"/>
      <v-progress-linear v-if="loading" indeterminate color="indigo-accent-4"/>

      <v-sheet color="transparent" class="pa-5 d-flex align-center justify-end">
        <v-btn @click="step < 3 ? next() : requestWithdrawal()" :loading="loading" :disabled="loading" variant="flat"
               color="indigo-accent-4" size="large"
               class="text-caption text-sm-body-2 text-md-body-1"
        >
          {{ step < 3 ? 'Next' : 'Request Withdrawal' }}
        </v-btn>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import {ref as vueRef, computed} from "vue";
import {useDisplay} from 'vuetify';
import {useCountryStore} from '@/stores/user/countries'
import {useAppStore} from '@/stores/app'
import {useProfileStore} from '@/stores/user/profile'
import {db, auth} from '@/firebase'
import {collection, addDoc, serverTimestamp, setDoc, doc} from 'firebase/firestore'
import {storeToRefs} from "pinia"

const {snackbarObject} = useAppStore()
const profileStore = useProfileStore()
const {countries} = useCountryStore()
const {profile} = storeToRefs(profileStore)

const {name} = useDisplay()

const step = vueRef(1)
const loading = vueRef(false)

// step 1
const fulName = vueRef('')
const email = vueRef('')
const phone = vueRef('')
const country = vueRef(countries[0])

// step 2
const amount = vueRef('')
const withdrawalMethod = vueRef('Select withdrawal method')
const walletAddress = vueRef('')

// step 3
const documentType = vueRef('International Passport')
const verificationNumber = vueRef('')

const avatarSize = computed(() => {
  // Compute app bar visibility based on screen size
  switch (name.value) {
    case 'xs':
      return 40
    case 'sm':
      return 50
    case 'md':
      return 'x-large'
    case 'lg':
    case 'xl':
    case 'xxl':
      return 'x-large';
    default:
      return 'x-large';
  }
});

const next = () => {
  if (step.value == 1) {
    if (!fulName.value || !email.value || !phone.value || country.value == 'Select Country') return
    else step.value = 2;
  }

  if (step.value == 2) {
    if (!withdrawalMethod.value || withdrawalMethod.value == 'Select withdrawal method' || !amount.value) return
    else {
      if (!walletAddress.value) return;
      else step.value = 3
    }
  }
}

const jumpToStep = (prop) => {
  step.value = prop;
}

const requestWithdrawal = async () => {
  if (!documentType.value || !verificationNumber.value) return

  const {uid} = auth.currentUser;

  loading.value = true;

  const dataToSave = {
    fulName: fulName.value,
    email: email.value,
    phone: phone.value,
    country: country.value,
    amount: amount.value,
    withdrawalMethod: withdrawalMethod.value,
    walletAddress: walletAddress.value || '',
    documentType: documentType.value,
    verificationNumber: verificationNumber.value,
    type: 'withdraw',
    status: 'pending',

    timestamp: serverTimestamp()
  }

  const withdraweRequest = await addDoc(collection(db, 'leadway_users', uid, 'payments'), {
    ...dataToSave
  })

  await setDoc(doc(db, 'leadway_payments', withdraweRequest.id), {
    request: dataToSave,
    user: uid,
    timestamp: serverTimestamp()
  })

  loading.value = false;
  snackbarObject.show = true
  snackbarObject.message = 'Withdraw requested successfully'
  snackbarObject.color = 'green'
  step.value = 1
}

const formatMoney = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
};
</script>
