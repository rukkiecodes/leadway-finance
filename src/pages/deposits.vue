<template>
  <v-container>
    <v-row>
      <v-col v-for="deposit in deposits" :key="deposit.id" cols="12" sm="6" md="4" lg="3">
        <v-card rounded="lg">
          <v-card-title class="d-flex justify-start">
            <div class="d-flex flex-column justify-center align-center">
              <span class="text-caption text-sm-body-2 text-indigo-lighten-1"
              >{{ monthsAbbr[new Date(deposit.timestamp.seconds * 1000).getMonth()] }}</span>
              <span class="text-h5 text-md-h4 text-indigo-lighten-1 font-weight-black"
              >{{ new Date(deposit.timestamp.seconds * 1000).getDate() }}</span>
            </div>
          </v-card-title>

          <v-card-text>
            <div class="d-flex flex-column">
              <p class="text-caption text-sm-body-2">FUND ${{ formatMoney(deposit.amount) }}</p>
              <p class="text-caption text-sm-body-2">{{ deposit.account }}</p>
            </div>
          </v-card-text>

          <v-divider/>

          <v-card-text>
            <v-chip class="text-caption text-sm-body-2" :color="deposit?.apprived ? 'green' : 'amber'">
              {{ deposit?.apprived ? 'Approved' : 'Pending' }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      @click="selectedPlan"
      position="fixed"
      location="bottom right"
      class="ma-5"
      icon
      color="indigo-accent-4"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>


  <v-dialog width="600" v-model="dialog.active" persistent>
    <v-card rounded="lg">
      <v-toolbar color="transparent" dark>
        <v-toolbar-title>{{ dialog?.use }} {{ dialog?.rank }}</v-toolbar-title>
        <v-spacer/>

        <v-btn @click="dialog.active = false" icon flat>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-0">
        <v-stepper elevation="0" :items="['Step 1', 'Step 2', 'Step 3', 'Step 4']">
          <template v-slot:item.1>
            <v-card flat>
              <v-card-title class="text-center">Fund Account</v-card-title>

              <v-card-text class="mt-5">
                <v-text-field
                  label="Amount"
                  variant="outlined"
                  density="compact"
                  v-model="amount"
                />

                <v-select
                  label="Account"
                  variant="outlined"
                  density="compact"
                  :items="['Trading Balance Deposit', 'Holding Balance', 'Staking Balance']"
                  v-model="account"
                />
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:item.2>
            <v-card flat>
              <v-card-title class="text-center text-body-2 text-sm-body-1">FUND TRADING BALANCE TOTAL</v-card-title>
              <v-card-subtitle class="text-center text-h6 text-md-h5 text-lg-h4">${{ formatMoney(amount) }}</v-card-subtitle>

              <v-card-text class="mt-5">
                <v-sheet color="black" class="d-flex flex-column justify-center align-center pa-5" rounded="lg">
                  <span class="text-indigo-accent-4 font-weight-bold">Send Crypto</span>
                  <span class="text-caption">Send supported crypto currencies</span>
                </v-sheet>
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:item.3>
            <v-card flat>
              <v-card-title class="text-center text-h6 text-md-h5 text-lg-h4">PAY ${{ formatMoney(amount) }}</v-card-title>
              <v-card-subtitle class="text-center">Send Crypto</v-card-subtitle>
              <v-card-subtitle class="text-center">{{ convertedRate }} ({{ paymentMethod.paymentMethod }})</v-card-subtitle>

              <v-card-text class="mt-5">
                <v-select
                  density="compact"
                  label="Payment Method"
                  variant="outlined"
                  v-model="paymentMethod"
                  @update:model-value="convertPrice"
                  item-title="paymentMethod"
                  return-object
                  :items="[
                    {paymentMethod: 'Ethereum (ETH)', code: 'ETH'},
                    {paymentMethod: 'Bitcoin (BTC)', code: 'BTC'},
                    {paymentMethod: 'Ripple (XRP)', code: 'XRP'},
                    {paymentMethod: 'BnB smart chain (BNB)', code: 'BNB'},
                    {paymentMethod: 'Litecoin (LTC)', code: 'LTC'},
                  ]"
                />
              </v-card-text>

              <v-card-text class="d-flex flex-column align-center justify-center mt-5">
                <span>{{ address }}</span>
                <qrcode-vue :value="address" :size="300" level="H" render-as="svg" />
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:item.4>
            <v-card flat>
              <v-card-title class="text-center text-h6 text-md-h5 text-lg-h4">PAY ${{ formatMoney(amount) }}</v-card-title>
              <v-card-subtitle class="text-center">Send Crypto</v-card-subtitle>
              <v-card-subtitle class="text-center">{{ convertedRate }} ({{ paymentMethod.paymentMethod }})</v-card-subtitle>

              <v-card-text class="mt-5">
                <v-sheet @click="selectProofOfPayment" class="cursor-pointer" color="black" rounded="lg">
                  <div v-if="!POPImage" class="d-flex justify-start align-center ga-2 pa-4">
                    <v-icon>mdi-image-outline</v-icon>

                    <span>Attached image of the Proof of Payment</span>
                  </div>
                  <v-img v-else :src="previewOPO" height="300" cover rounded="lg"/>
                </v-sheet>
              </v-card-text>

              <v-card-actions v-if="POPImage">
                <v-btn @click="submitPOP" :loading="loading" :disabled="loading" block variant="flat"
                       color="indigo-accent-4"
                >Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {useProfileStore} from '@/stores/profile'
import {useAppStore} from '@/stores/app'
import {onMounted, ref as vueRef} from "vue";
import {db} from '@/firebase';
import QrcodeVue from 'qrcode.vue'
import {collection, getDocs, query, addDoc, doc, serverTimestamp, setDoc} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const profileStore = useProfileStore();
const {snackbarObject} = useAppStore()
const totalDeposits = vueRef('0.00')
const deposits = vueRef([])
const dialog = vueRef({active: false})

const amount = vueRef(0)
const account = vueRef('Sellect Account')
const paymentMethod = vueRef('Select Payment Method')
const convertedRate = vueRef(0)
const address = 'https://rukkiecodes.netlify.app'
const POPImage = vueRef(null)
const previewOPO = vueRef(null)
const loading = vueRef(false)
const monthsAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const fetchDeposits = async () => {
  const profile = profileStore.profile;
  if (!profile) return

  try {
    const paymentsRef = collection(db, "leadway_users", profile.uid, 'payments');
    const q = query(paymentsRef);
    const querySnapshot = await getDocs(q);

    deposits.value = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }))

    // Calculate total amount
    const totalAmount = querySnapshot.docs.reduce((sum, doc) => {
      const data = doc.data();
      return sum + (data.amount || 0); // Ensure 'amount' exists and is a number
    }, 0);

    // Format totalAmount as currency
    totalDeposits.value = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalAmount);
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  fetchDeposits();
});

const selectedPlan = async () => {
  dialog.value = {
    active: true,
    use: 'trading'
  }
  convertPrice()
}

const convertPrice = async () => {
  const usdAmount = amount.value;
  let cryptoSymbol = paymentMethod.value.code

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

const selectProofOfPayment = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log(file);
      const reader = new FileReader();
      POPImage.value = file;

      reader.onload = (e) => {
        previewOPO.value = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  };

  input.click()
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
    const {uid} = profileStore.profile;

    const storage = getStorage();
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
          amount: convertAmountToNumber,
          account: account.value,
          paymentMethod: paymentMethod.value,
          convertedRate: convertedRate.value,
          address: address,
          priceProps: dialog.value,
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
        dialog.value.active = false
      }
    )
  } catch (error) {
    console.error("Error uploading image:", error);
    loading.value = false;
  }
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
