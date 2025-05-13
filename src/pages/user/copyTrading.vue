<template>
  <v-container>
    <v-row>
      <v-col v-for="(trader, index) in copyTraders" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card rounded="xl" height="480">
          <v-img :src="trader.displayImage?.image" lazy-src="@/assets/images/avatar.png" height="100%" cover>
            <div class="glass rounded-xl d-flex flex-column align-center justify-center text-center px-10">
              <v-avatar size="100">
                <v-img :src="trader.displayImage?.image" lazy-src="@/assets/images/avatar.png" aspect-ratio="1"
                       position="center"
                />
              </v-avatar>

              <p class="text-center text-body-1 text-sm-h6 mt-5">
                {{ trader.name }}
                <v-icon color="green" size="30">mdi-check-circle</v-icon>
              </p>

              <v-btn
                :color="isCopied(index) ? 'amber' : 'teal'"
                prepend-icon="mdi-finance"
                variant="flat"
                rounded="lg"
                size="large"
                class="font-weight-light text-caption text-sm-body-2 mt-2"
                @click="selectTrader(trader, index)"
              >
                <!--                @click="isCopied(index) ? stopCopyingThisTrader(trader) : copyThisTrader(trader, index)"-->
                {{ isCopied(index) ? 'STOP COPYING' : 'COPY TRADER' }}
              </v-btn>

              <p class="text-center text-body-2 mt-4 font-weight-light">
                {{ trader.sub1 }}
              </p>
              <p class="text-center text-caption text-sm-body-2 text-md-body-1">
                {{ trader.sub2 }}
              </p>
              <p class="text-center text-body-2 my-5 font-weight-light">
                <v-icon size="20">mdi-finance</v-icon>
                : {{ trader.market }}
              </p>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="selectDate" width="400">
    <v-card rounded="lg">
      <v-card-text class="pa-0">
        <v-date-picker
          v-model="selectedDate"
          :min="today"
          show-adjacent-months
          class="w-100"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="copyThisTrader" variant="flat" color="indigo-accent-4" rounded="lg">Copy</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {useAppStore} from '@/stores/app'
import {useProfileStore} from '@/stores/user/profile'
import {setDoc, deleteDoc, doc, updateDoc, arrayRemove, serverTimestamp, addDoc} from 'firebase/firestore'
import {auth, db} from '@/firebase'
import {onMounted, ref} from "vue";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import {useCopyTradeStore} from '@/stores/user/copyTrade'
import {storeToRefs} from 'pinia'

const {snackbarObject} = useAppStore()
const profileStore = useProfileStore()
const copyTradersStore = useCopyTradeStore()

const {copyTraders} = storeToRefs(copyTradersStore)
const selectDate = ref(false)
const selectedDate = ref(null)
const selectedTrader = ref(null)
const today = new Date().toISOString().split('T')[0]

onMounted(() => {
  fetCopytraders()
})

const selectTrader =
  (trader, index) => {
    selectDate.value = true
    selectedTrader.value = {
      index,
      ...trader
    }
  }

const fetCopytraders = async () => {
  const q = query(collection(db, "leadway_copy_traders"), orderBy("timestamp", "asc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    copyTraders.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  });

  return unsubscribe;
}

const isCopied = (index) => {
  return profileStore.profile?.tradersCopied === index;
}

const assets = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'BTC/USD', 'ETH/USD']

const generateRandomTrade = (date: string, uid: string) => {
  const win = Math.random() < 0.6
  const amount = Math.floor(Math.random() * 90 + 10) // $10–$100
  const entryPrice = +(Math.random() * 100).toFixed(2)
  const exitPrice = win
    ? +(entryPrice + Math.random() * 5).toFixed(2)
    : +(entryPrice - Math.random() * 5).toFixed(2)

  return {
    uid,
    asset: assets[Math.floor(Math.random() * assets.length)],
    amount,
    currency: 'USD',
    result: win ? 'WIN' : 'LOSS',
    entryPrice,
    exitPrice,
    duration: `${Math.floor(Math.random() * 10 + 1)}m`,
    date: date, // store as string or convert to Firestore Timestamp if needed
    createdAt: new Date(),
  }
}

const copyThisTrader = async () => {
  const user = auth.currentUser
  if (!user || !selectedDate.value) return

  registerTrader()

  const uid = user.uid
  const formattedDate = selectedDate.value // ideally in YYYY-MM-DD or Timestamp

  const tradesToGenerate = 20
  const trades = Array.from({length: tradesToGenerate}, () =>
    generateRandomTrade(formattedDate, uid)
  )

  const tradesCollection = collection(db, 'leadway_users', uid, 'trades') // You can nest under users if needed

  try {
    const batchPromises = trades.map((trade) => addDoc(tradesCollection, trade))
    await Promise.all(batchPromises)
    console.log(`${trades.length} trades copied successfully for ${formattedDate}`)
    selectDate.value = false
  } catch (err) {
    console.error('Error generating trades:', err)
  }
}

const registerTrader = async () => {
  const {uid} = auth.currentUser

  await setDoc(doc(db, 'leadway_users', uid, 'copy traders', selectedTrader.value.name), {
    traderPosition: selectedTrader.value.index,
    ...selectedTrader.value,
    timestamp: serverTimestamp()
  })

  await updateDoc(doc(db, 'leadway_users', uid), {
    tradersCopied: selectedTrader.value.index
  })

  snackbarObject.show = true
  snackbarObject.message = `You are now copying ${selectedTrader.value.name}`
  snackbarObject.color = 'green'

  // Force reactivity update
  profileStore.profile.tradersCopied = selectedTrader.value.index
}

const stopCopyingThisTrader = async (trader) => {
  const {uid} = auth.currentUser

  await deleteDoc(doc(db, 'leadway_users', uid, 'copy traders', trader.name))

  await updateDoc(doc(db, 'leadway_users', uid), {
    tradersCopied: null
  })

  snackbarObject.show = true
  snackbarObject.message = `Successfully uncopied ${trader.name}`
  snackbarObject.color = 'green'
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
