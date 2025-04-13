<template>
  <v-tabs-window-item value="tansactions">
    <v-toolbar density="compact" color="transparent">
      <template v-slot:prepend>
        <v-toolbar-title>Edit Account Records</v-toolbar-title>
      </template>
    </v-toolbar>
    <v-divider class="mb-10"/>

    <v-row>
      <v-col cols="12" sm="5">
        <v-card rounded="lg" min-height="300">
          <v-img src="@/assets/images/hue.png" min-height="200" cover>
            <v-sheet class="d-flex flex-column justify-space-between align-start pa-5" min-height="300"
                     color="transparent">
              <div class="d-flex flex-column">
                <p class="text-caption text-sm-body-2 text-md-body-1">Total Balance</p>
                <p class="text-body-1 text-sm-h6 text-md-h5">${{ formatMoney(user?.totalBalance || 0) }}</p>
              </div>

              <div class="d-flex flex-column">
                <p class="text-caption font-weight-light">
                  Upon Confirmation, the system will automatically convert your cryptocurrency to its live fiat value if
                  you
                  choose the cryptocurrency payment method. Please ensure that you deposit the exact amount of Crypto to
                  the
                  address provided on the payment page
                </p>
              </div>
            </v-sheet>
          </v-img>
        </v-card>
      </v-col>

      <v-col cols="12" sm="7">
        <v-card rounded="lg" :loading="loading" :disabled="loading">
          <v-card-text>
            <v-card color="white" rounded="xl" width="250" class="d-flex align-center justify-center mx-auto">
              <v-card-text>
                <qrcode-vue :value="address.wallet" :size="220" level="H" render-as="svg"/>
              </v-card-text>
            </v-card>
          </v-card-text>

          <v-card-text>
            <p class="text-caption text-sm-body-2 text-center mb-8">{{ convertedRate }} {{ address?.code }}</p>

            <v-sheet class="d-flex justify-space-between align-center mb-8 pl-2" width="100%" color="white"
                     rounded="lg">
              <p class="text-caption">{{ address.wallet }}</p>

              <v-btn @click="copyToClipboard(address.wallet)" prepend-icon="mdi-content-copy" rounded-lg
                     color="indigo-accent-4" class="text-caption text-sm-body-2">
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

          <v-card-actions class="d-flex justify-end">
            <v-btn @click="submitPOP" :loading="loading" :disabled="loading" variant="flat" color="indigo-accent-4">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-divider/>
      </v-col>

      <v-col cols="12">
        <p class="text-center text-body-1 text-sm-h6 text-md-h5 font-weight-bold">{{ user.firstName }} {{
            user.lastName
          }} Transaction History</p>
      </v-col>

      <v-col cols="12">
        <v-card flat>
          <v-tabs v-model="tab">
            <v-tab value="deposit" class="text-caption text-sm-body-2 text-md-body-1">Deposits</v-tab>
            <v-tab value="withdraw" class="text-caption text-sm-body-2 text-md-body-1">Withdrawals</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="deposit">
                <v-card-title class="d-flex align-center">
                  <v-spacer/>

                  <v-text-field
                    v-model="search"
                    density="compact"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="solo-filled"
                    flat
                    hide-details
                    single-line
                    rounded="lg"
                  />
                </v-card-title>

                <v-data-table
                  v-model:search="search"
                  :headers="headers"
                  :items="deposits"
                  :filter-keys="['status', 'id']"
                  show-expand
                  item-value="id"
                >
                  <template v-slot:item.id="{ item }">
                    <p class="text-caption text--sm-body-2">{{ item?.id }}</p>
                  </template>

                  <template v-slot:item.amount="{ item }">
                    <p class="text-caption text--sm-body-2">${{ formatMoney(item?.amount) }}</p>
                  </template>

                  <template v-slot:item.convertedRate="{ item }">
                    <p class="text-caption text--sm-body-2">{{ item?.convertedRate }} {{ item?.address?.code }}</p>
                  </template>

                  <template v-slot:item.type="{ item }">
                    <v-chip>
                      <v-icon v-if="item?.type == 'deposit'">mdi-arrow-up</v-icon>
                      <v-icon v-if="item?.type == 'withdraw'">mdi-arrow-down</v-icon>
                      <span class="text-caption text--sm-body-2 text-capitalize ml-2">{{ item?.type }}</span>
                    </v-chip>
                  </template>

                  <template v-slot:item.status="{ item }">
                    <v-chip
                      class="text-caption text--sm-body-2 text-capitalize"
                      :color="item?.status == 'Completed' ? 'green' : item?.status == 'Canceled' ? 'red' : 'amber'"
                    >
                      {{ item?.status }}
                    </v-chip>
                  </template>

                  <template v-slot:item.timestamp="{ item }">
                    <p class="text-caption text--sm-body-2">{{ new Date(item?.timestamp?.seconds * 1000).toDateString() }}</p>
                  </template>


                  <template v-slot:expanded-row="{ columns, item }">
                    <tr>
                      <td :colspan="columns.length" class="mx-0 px-0">
                        <v-card color="transparent" flat width="500">
                          <v-card-text>
                            <v-dialog max-width="800">
                              <template v-slot:activator="{ props: activatorProps }">
                                <v-avatar :image="item?.POP?.pop" v-bind="activatorProps" size="100"
                                          class="cursor-pointer"/>
                              </template>

                              <template v-slot:default="{ isActive }">
                                <v-card rounded="lg">
                                  <v-img :src="item?.POP?.pop" cover/>
                                </v-card>
                              </template>
                            </v-dialog>

                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span style="width: 150px">Payment ID</span>
                              <span>{{ item?.id }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-2">
                              <span style="width: 150px">Amount</span>
                              <span>${{ formatMoney(item?.amount) }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-2">
                              <span style="width: 150px">Converted amount</span>
                              <span>{{ item?.convertedRate }} {{ item?.address?.code }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-2">
                              <span style="width: 150px">Transaction Type</span>
                              <span>{{ item?.type }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-2">
                              <span style="width: 150px">Transaction Status</span>
                              <v-chip
                                :color="item?.status == 'Completed' ? 'green' : item?.status == 'Canceled' ? 'red' : 'amber'">
                                {{
                                  item?.status
                                }}
                              </v-chip>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-2">
                              <span style="width: 150px">Transaction Date</span>
                              <p>{{ new Date(item?.timestamp?.seconds * 1000).toDateString() }}}</p>
                            </div>
                          </v-card-text>

                          <v-divider class="my-5"/>

                          <v-card-text>
                            <span class="text-caption text-sm-body-2">
                              Upon transaction Completion, the transaction amount will automatically be added to the client's total amount
                            </span>

                            <v-select
                              density="compact"
                              label="Transaction Status"
                              variant="outlined"
                              v-model="status"
                              rounded="lg"
                              color="indigo-accent-4"
                              :items="['Completed', 'Processing', 'Pending', 'Canceled']"
                              class="mt-5"
                              @update:modelValue="updateStatus(status, item)"
                            />
                          </v-card-text>
                        </v-card>
                      </td>
                    </tr>
                  </template>

                  <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand, item }">
                    <v-btn
                      class="text-none"
                      color="medium-emphasis"
                      size="small"
                      icon
                      @click="() => {toggleExpand(internalItem); autoCompleteStatus(item?.status)}"
                    >
                      <v-icon>{{isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-tabs-window-item>

              <v-tabs-window-item value="withdraw">
                <v-card-title class="d-flex align-center">
                  <v-spacer/>

                  <v-text-field
                    v-model="search"
                    density="compact"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="solo-filled"
                    flat
                    hide-details
                    single-line
                    rounded="lg"
                  />
                </v-card-title>

                <v-data-table
                  v-model:search="search"
                  :headers="withdrawHeaders"
                  :items="withdrawals"
                  :filter-keys="['status', 'id']"
                  show-expand
                  item-value="id"
                >
                  <template v-slot:item.id="{ item }">
                    <p class="text-caption text--sm-body-2">{{ item?.id }}</p>
                  </template>

                  <template v-slot:item.user="{ item }">
                    <TradeHistoryUser :user="user?.uid"/>
                  </template>

                  <template v-slot:item.amount="{ item }">
                    <p class="text-caption text--sm-body-2">${{ formatMoney(item?.amount) }}</p>
                  </template>

                  <template v-slot:item.type="{ item }">
                    <v-chip>
                      <v-icon v-if="item?.type == 'deposit'">mdi-arrow-up</v-icon>
                      <v-icon v-if="item?.type == 'withdraw'">mdi-arrow-down</v-icon>
                      <span class="text-caption text--sm-body-2 text-capitalize ml-2">{{ item?.type }}</span>
                    </v-chip>
                  </template>

                  <template v-slot:item.status="{ item }">
                    <v-chip
                      class="text-caption text--sm-body-2 text-capitalize"
                      :color="item?.status == 'Completed' ? 'green' : item?.status == 'Canceled' ? 'red' : 'amber'"
                    >
                      {{ item?.status }}
                    </v-chip>
                  </template>

                  <template v-slot:item.timestamp="{ item }">
                    <p class="text-caption text--sm-body-2">{{ new Date(item?.timestamp?.seconds * 1000).toDateString() }}</p>
                  </template>


                  <template v-slot:expanded-row="{ columns, item }">
                    <tr>
                      <td :colspan="columns.length" class="mx-0 px-0">
                        <v-card color="transparent" flat width="500">
                          <v-card-text>
                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Full Name</span>
                              <span class="text-caption text--sm-body-2">{{ item?.fulName }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Email</span>
                              <span class="text-caption text--sm-body-2">{{ item?.email }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Phone</span>
                              <span class="text-caption text--sm-body-2">{{ item?.phone }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Country</span>
                              <span class="text-caption text--sm-body-2">{{ item?.country }}</span>
                            </div>

                            <v-divider class="mt-5"/>

                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Amount</span>
                              <span class="text-caption text--sm-body-2">${{ formatMoney(item?.amount) }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Withdrawal Method</span>
                              <span class="text-caption text--sm-body-2">{{ item?.withdrawalMethod }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Wallet Address</span>
                              <span class="text-caption text--sm-body-2">{{ item?.walletAddress }}</span>
                            </div>

                            <v-divider class="mt-5"/>

                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Document Type</span>
                              <span class="text-caption text--sm-body-2">{{ item?.documentType }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Verification Number</span>
                              <span class="text-caption text--sm-body-2">{{ item?.verificationNumber }}</span>
                            </div>

                            <v-divider class="mt-5"/>

                            <div class="d-flex justify-start align-center ga-5 mt-5">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Request ID</span>
                              <span class="text-caption text--sm-body-2">{{ item?.id }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-2">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Transaction Type</span>
                              <span class="text-caption text--sm-body-2">{{ item?.type }}</span>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-2">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Transaction Status</span>
                              <v-chip
                                class="text-caption text--sm-body-2 text-capitalize"
                                :color="item?.status == 'Completed' ? 'green' : item?.status == 'Canceled' ? 'red' : 'amber'"
                              >
                                {{ item?.status }}
                              </v-chip>
                            </div>

                            <div class="d-flex justify-start align-center ga-5 mt-2">
                              <span class="text-caption text--sm-body-2" style="width: 150px">Transaction Date</span>
                              <p class="text-caption text--sm-body-2">
                                {{ new Date(item?.timestamp.seconds * 1000).toDateString() }}}</p>
                            </div>
                          </v-card-text>

                          <v-divider class="my-5"/>

                          <v-card-text>
                            <span class="text-caption text-sm-body-2">
                              Upon transaction Completion, the transaction amount will automatically be added to the client's total amount
                            </span>

                            <v-select
                              density="compact"
                              label="Transaction Status"
                              variant="outlined"
                              v-model="status"
                              rounded="lg"
                              color="indigo-accent-4"
                              :items="['Completed', 'Processing', 'Pending', 'Canceled']"
                              class="mt-5"
                              @update:modelValue="updateStatusWithdrawStatus(status, item)"
                            />
                          </v-card-text>
                        </v-card>
                      </td>
                    </tr>
                  </template>

                  <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand, item }">
                    <v-btn
                      class="text-none"
                      color="medium-emphasis"
                      size="small"
                      icon
                      @click="() => {toggleExpand(internalItem); autoCompleteStatus(item?.status)}"
                    >
                      <v-icon>{{isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-tabs-window-item>
</template>

<script setup lang="ts">
import {ref, onMounted, ref as vueRef} from "vue";
import {defineProps} from "vue";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  doc,
  updateDoc, getDoc, where
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref as fbRef,
  uploadBytesResumable,
} from "firebase/storage";
import {db} from "@/firebase";
import {useAppStore} from '@/stores/app'
import QrcodeVue from "qrcode.vue";
import TradeHistoryUser from "@/components/admin/TradeHistoryUser.vue";
import axios from "axios";
import user from "@/pages/admin/account/user.vue";

// Define props
const props = defineProps<{
  user: Record<string, any>;
}>();

const {snackbarObject} = useAppStore()

const search = ref('')
const status = ref('Completed');

const address = vueRef({paymentMethod: 'Bitcoin (BTC)', code: 'BTC', wallet: 'jnljvnui2h4v892h4of78h34o9h3gqhglqwrj'})
const addresses = vueRef([])
const amount = ref("");
const convertedRate = vueRef(0)
const POPImage = vueRef(null)

const tab = vueRef(null)

const loading = ref(false)

const deposits = ref([])
const withdrawals = ref([])

const headers = [
  {key: 'id', title: 'Payment ID'},
  {key: 'amount', title: 'Amount'},
  {key: 'convertedRate', title: 'Rate'},
  {key: 'type', title: 'Type'},
  {key: 'status', title: 'Status'},
  {key: 'timestamp', title: 'Date'}
]

const withdrawHeaders = [
    {key: 'id', title: 'Payment ID'},
    {key: 'user', title: 'User'},
    {key: 'amount', title: 'Amount'},
    {key: 'withdrawalMethod', title: 'Method'},
    {key: 'type', title: 'Type'},
    {key: 'status', title: 'Status'},
    {key: 'timestamp', title: 'Date'}
  ]

const fetchDeposits = async () => {
  const q = query(collection(db, "leadway_users", props.user?.uid, 'payments'), where('type', '==', 'deposit'), orderBy("timestamp", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    deposits.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  });

  return unsubscribe;
}

const fetchWithdrawals = async () => {
  const q = query(collection(db, "leadway_users", props.user?.uid, 'payments'), where('type', '==', 'withdraw'), orderBy("timestamp", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    withdrawals.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  });

  return unsubscribe;
}

onMounted(() => {
  fetchDeposits();
  fetchWithdrawals();

  fetchAddresses()
})

const formatMoney = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
}

const updateStatus = async (status, item) => {
  await updateDoc(doc(db, "leadway_payments", item.id), {
    'payment.status': status
  });

  await updateDoc(doc(db, "leadway_users", props.user?.uid, 'payments', item.id), {
    status: status
  })

  if (status === 'Completed') {
    const clientProfile = (await getDoc(doc(db, 'leadway_users', props.user?.uid))).data()
    const totalAmount = parseFloat(clientProfile?.totalBalance) + parseFloat(item?.amount)
    const totalDeposit = parseFloat(clientProfile?.totalDeposit) + parseFloat(item?.amount)
    const totalBalance = parseFloat(clientProfile?.totalBalance) + parseFloat(item?.amount)

    await updateDoc(doc(db, 'leadway_users', props.user?.uid), {
      totalAmount,
      totalDeposit,
      totalBalance
    })

    await axios.post('https://mailservice-e4b2cc7b9ef8.herokuapp.com/leadway/depositCompleted', {
      email: props.user?.email,
      name: `${props.user?.firstName} ${props.user?.lastName}`,
      amount: `$${formatMoney(item?.amount)}`
    });
  }
  if (status === 'Canceled') {
    await axios.post('https://mailservice-e4b2cc7b9ef8.herokuapp.com/leadway/depositCancelled', {
      email: props.user?.email,
      name: `${props.user?.firstName} ${props.user?.lastName}`,
      amount: `$${formatMoney(item?.amount)}`
    });
  }
}

const updateStatusWithdrawStatus = async (status, item) => {
  await updateDoc(doc(db, "leadway_payments", item.id), {
    'payment.status': status
  });

  await updateDoc(doc(db, "leadway_users", props.user?.uid, 'payments', item.id), {
    status: status
  })

  if (status === 'Completed') {
    const clientProfile = (await getDoc(doc(db, 'leadway_users', props.user?.uid))).data()
    const totalAmount = parseFloat(clientProfile?.totalBalance) - parseFloat(item?.amount)
    const totalDeposit = parseFloat(clientProfile?.totalDeposit) - parseFloat(item?.amount)
    const totalBalance = parseFloat(clientProfile?.totalBalance) - parseFloat(item?.amount)

    await updateDoc(doc(db, 'leadway_users', props.user?.uid), {
      totalAmount,
      totalDeposit,
      totalBalance
    })

    await axios.post('https://mailservice-e4b2cc7b9ef8.herokuapp.com/leadway/withdrawCompleted', {
      email: props.user?.email,
      name: `${props.user?.firstName} ${props.user?.lastName}`,
      amount: `$${formatMoney(item?.amount)}`
    });
  }

  if (status === 'Canceled') {
    await axios.post('https://mailservice-e4b2cc7b9ef8.herokuapp.com/leadway/withdrawCancelled', {
      email: props.user?.email,
      name: `${props.user?.firstName} ${props.user?.lastName}`,
      amount: `$${formatMoney(item?.amount)}`
    });
  }
}

const autoCompleteStatus = (_status) => {
  status.value = _status;
}

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

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)

  snackbarObject.show = true
  snackbarObject.message = "Copied";
  snackbarObject.color = "indigo"
}

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
    const {uid} = props.user;
    if (!uid) return

    const storage = getStorage()
    const storageRef = fbRef(
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
      }
    )
  } catch (error) {
    console.error("Error uploading image:", error);
    loading.value = false;
  }
}
</script>
