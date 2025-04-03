<template>
  <v-container>
    <v-card class="mt-16 mx-auto" max-width="1000" rounded="lg">
      <v-img src="@/assets/images/hue.png" min-height="300" cover>
        <v-sheet class="d-flex flex-column justify-space-between align-start pa-5" min-height="300"
                 color="transparent"
        >
          <div class="d-flex flex-column">
            <p class="text-caption text-sm-body-2 text-md-body-1">Total Balance</p>
            <p class="text-body-1 text-sm-h6 text-md-h5">${{ formatMoney(profile?.totalBalance || 0) }}</p>
          </div>

          <div class="d-flex flex-column">
            <p class="text-caption text-sm-body-2 font-weight-light">
              Upon Confirmation, our system will automatically convert your cryptocurrency to its live fiat value if
              you
              choose the cryptocurrency payment method. Please ensure that you deposit the exact amount of Crypto to
              the
              address provided on the payment page
            </p>
            <div class="d-flex">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-btn
                    v-bind="props"
                    @click="dialog = true"
                    elevation="0"
                    :variant="isHovering ? 'flat' : 'outlined'"
                    :color="isHovering ? 'indigo-accent-4' : 'white'"
                    rounded="0"
                    class="mt-4 text-caption text-sm-body-2"
                  >
                    Make a deposit
                  </v-btn>
                </template>
              </v-hover>
            </div>
          </div>
        </v-sheet>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card color="transparent" class="glass" rounded="lg">
                <v-card-title class="text-body-1 text-sm-h6">
                  <span class="text-capitalize">Trading</span>
                </v-card-title>
                <v-card-subtitle>Fund trading wallet</v-card-subtitle>

                <v-card-text style="min-height: 220px">
                  <v-text-field
                    v-model="trading"
                    label="Trading fund"
                    variant="outlined"
                    flat
                    density="compact"
                    rounded="lg"
                    color="indigo-accent-4"
                    type="number"
                    prepend-inner-icon="mdi-currency-usd"
                  />

                  <p class="text-caption">
                    Enter the amount you wish to add to your trading wallet. Ensure you have sufficient balance before
                    proceeding.
                    The minimum deposit amount is <strong>$10</strong>. Transactions below this amount will not be
                    processed.
                    Funds will be credited instantly, but in rare cases, processing may take up to <strong>5
                    minutes</strong>.
                    For security reasons, all deposits are final and cannot be reversed. Please double-check the amount
                    before confirming.
                  </p>
                </v-card-text>

                <v-card-actions>
                  <v-spacer/>
                  <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                      <v-btn
                        @click="fundAccount('trading', trading)"
                        v-bind="props"
                        class="text-caption text-sm-body-2 font-weight-light px-5"
                        rounded="sm"
                        :color="isHovering ? 'indigo-accent-4' : 'white'"
                        :variant="isHovering ? 'flat' : 'outlined'"
                        elevation="0"
                      >
                        Get Started
                      </v-btn>
                    </template>
                  </v-hover>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card color="transparent" class="glass" rounded="lg">
                <v-card-title class="text-body-1 text-sm-h6">
                  <span class="text-capitalize">signals</span>
                </v-card-title>
                <v-card-subtitle>Fund signals wallet</v-card-subtitle>

                <v-card-text style="min-height: 220px">
                  <v-text-field
                    v-model="signals"
                    label="Signals fund"
                    variant="outlined"
                    flat
                    density="compact"
                    rounded="lg"
                    color="indigo-accent-4"
                    type="number"
                    prepend-inner-icon="mdi-currency-usd"
                  />

                  <p class="text-caption">
                    Add funds to your signals wallet to access premium trading insights.
                    Ensure your balance is sufficient before proceeding. The minimum deposit is <strong>$5</strong>.
                    Funds are credited instantly, but in rare cases, processing may take up to <strong>5
                    minutes</strong>.
                    Deposits are non-refundable, so please verify the amount before confirming your transaction.
                  </p>
                </v-card-text>

                <v-card-actions>
                  <v-spacer/>
                  <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                      <v-btn
                        @click="fundAccount('signals', signals)"
                        v-bind="props"
                        class="text-caption text-sm-body-2 font-weight-light px-5"
                        rounded="sm"
                        :color="isHovering ? 'indigo-accent-4' : 'white'"
                        :variant="isHovering ? 'flat' : 'outlined'"
                        elevation="0"
                      >
                        Get Started
                      </v-btn>
                    </template>
                  </v-hover>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-img>
    </v-card>
  </v-container>

  <v-dialog v-model="dialog" width="600" persistent>
    <v-card rounded="lg" :loading="loading" :disabled="loading">
      <v-toolbar density="compact" color="transparent">
        <v-spacer/>

        <v-btn icon text @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-card color="white" rounded="xl" width="250" class="d-flex align-center justify-center mx-auto">
          <v-card-text>
            <qrcode-vue :value="address.wallet" :size="220" level="H" render-as="svg"/>
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-card-text>
        <p class="text-caption text-sm-body-2 text-center mb-8">{{ convertedRate }} {{ address?.code }}</p>

        <v-sheet class="d-flex justify-space-between align-center mb-8 pl-2" width="100%" color="white" rounded="lg">
          <p class="text-caption">{{ address.wallet }}</p>

          <v-btn @click="copyToClipboard(address.wallet)" prepend-icon="mdi-content-copy" rounded-lg
                 color="indigo-accent-4" class="text-caption text-sm-body-2"
          >
            Copy Address
          </v-btn>
        </v-sheet>

        <v-select
          density="compact"
          label="Payment Method"
          variant="outlined"
          v-model="address"
          @update:model-value="convertPrice"
          item-title="paymentMethod"
          return-object
          rounded="lg"
          color="indigo-accent-4"
          :items="addresses"
        />

        <v-text-field
          density="compact"
          label="Amount"
          type="number"
          variant="outlined"
          v-model="amount"
          rounded="lg"
          color="indigo-accent-4"
          @update:modelValue="convertPrice"
        />

        <v-file-input
          density="compact"
          label="Proof Of Payment"
          variant="outlined"
          rounded="lg"
          color="indigo-accent-4"
          @change="selectImage"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="submitPOP" :loading="loading" :disabled="loading" variant="flat" color="indigo-accent-4">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {useProfileStore} from '@/stores/user/profile'
import {useAppStore} from '@/stores/app'
import {storeToRefs} from "pinia"
import {ref as vueRef, onMounted} from 'vue'
import QrcodeVue from 'qrcode.vue'
import {db, auth} from '@/firebase'
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  setDoc, updateDoc,
} from 'firebase/firestore'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const profieStore = useProfileStore()
const {profile} = storeToRefs(profieStore)
const dialog = vueRef(false)
const {snackbarObject} = useAppStore()

const address = vueRef({paymentMethod: 'Bitcoin (BTC)', code: 'BTC', wallet: 'jnljvnui2h4v892h4of78h34o9h3gqhglqwrj'})
const addresses = vueRef([])
const amount = vueRef('')
const convertedRate = vueRef('')
const POPImage = vueRef(null)
const loading = vueRef(false)

const trading = vueRef('')
const signals = vueRef('')


const formatMoney = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
};

const fetchAddresses = async () => {
  const admin = import.meta.env.VITE_ADMIN1

  const adminProfile = (await getDoc(doc(db, 'leadway_users', admin))).data()
  // console.log(adminProfile)
  addresses.value = [
    {paymentMethod: 'Ethereum (ETH)', code: 'ETH', wallet: adminProfile?.ethereum},
    {paymentMethod: 'Bitcoin (BTC)', code: 'BTC', wallet: adminProfile?.bitcoinWallet},
    {paymentMethod: 'Ripple (XRP)', code: 'XRP', wallet: adminProfile?.XRP},
    {paymentMethod: 'Litecoin (LTC)', code: 'LTC', wallet: adminProfile?.LTC},
    {paymentMethod: 'USDT', code: 'USDT', wallet: adminProfile?.USDT},
  ]
}

onMounted(() => {
  fetchAddresses()
})

const convertPrice = async () => {
  const usdAmount = amount.value;
  let cryptoSymbol = address.value.code || 'ETH'

  try {
    const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/USD/${cryptoSymbol}`, {
      headers: {
        'X-CoinAPI-Key': '2faaadda-74ff-4fbe-a1a7-2944820d4ebb' // Replace with your API Key
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }

    const data = await response.json();

    const usdToCryptoRate = data.rate; // Correct rate from CoinAPI
    if (!usdToCryptoRate || isNaN(usdToCryptoRate)) {
      console.error("Invalid exchange rate:", cryptoSymbol);
      return null;
    }

    const cryptoAmount = usdToCryptoRate * usdAmount; // USD to Crypto conversion

    convertedRate.value = cryptoAmount;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
};

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)

  snackbarObject.show = true
  snackbarObject.message = "Copied";
  snackbarObject.color = "indigo"
}

const selectImage = (event) => {
  const file = event.target.files[0];

  if (file) POPImage.value = file
}

const submitPOP = async () => {
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  if (POPImage.value.size > MAX_FILE_SIZE) {
    alert(
      "File size exceeds the 2MB limit. Please select a smaller image."
    );
    return;
  }

  try {
    // Initialize Firebase Storage
    loading.value = true;
    const {uid} = auth.currentUser;
    if (!uid) return

    const storage = getStorage()
    const storageRef = ref(
      storage,
      `leadway_proof_of_payment/${POPImage.value.name}/${new Date()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, POPImage.value);

    // Monitor the upload process
    uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        loading.value = false;
      },
      async () => {
        // Upload completed, get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at:", downloadURL);
        console.log("Path:", uploadTask.snapshot.ref.fullPath);

        const convertAmountToNumber = parseFloat(String(amount.value))

        const paymentData = {
          address: address.value,
          type: 'deposit',
          status: 'pending',
          amount: convertAmountToNumber,
          convertedRate: convertedRate.value,
          POP: {pop: downloadURL, path: uploadTask.snapshot.ref.fullPath}
        }

        const payment = await addDoc(collection(db, 'leadway_users', uid, 'payments'), {
          ...paymentData,
          timestamp: serverTimestamp()
        })

        await setDoc(doc(db, 'leadway_payments', payment.id), {
          payment: {
            ...paymentData,
            paymentID: payment.id,
          },
          user: uid,
          timestamp: serverTimestamp()
        })

        loading.value = false;
        snackbarObject.show = true
        snackbarObject.message = "Successfully uploaded";
        snackbarObject.color = "green"
        dialog.value = false
      }
    )
  } catch (error) {
    console.error("Error uploading image:", error);
    loading.value = false;
  }
}

const fundAccount = async (account, amount) => {
  if (!amount || amount < 10) return

  const {uid} = auth.currentUser;
  if (!uid) return

  const balance = profile.value?.[account] ? profile.value?.[account] : 0;
  const newBalance = parseFloat(balance) + parseFloat(amount);

  const subtractTotalBalance = parseFloat(profile.value?.totalBalance) - amount

  await updateDoc(doc(db, 'leadway_users', uid), {
    [account]: newBalance
  })

  await updateDoc(doc(db, 'leadway_users', uid), {
    totalBalance: subtractTotalBalance
  })

  snackbarObject.show = true
  snackbarObject.message = `$${formatMoney(amount)} successfully added to ${account} account`;
  snackbarObject.color = "green"
}
</script>

<style scoped>
.glass {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
}
</style>
