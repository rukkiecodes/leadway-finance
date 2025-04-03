<template>
  <v-container>
    <v-row>
      <v-col v-for="(trader, index) in copyTraders" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card rounded="xl" height="470">
          <v-img :src="trader.displayImage?.image" lazy-src="@/assets/images/avatar.png" height="100%" cover>
            <div class="glass rounded-xl d-flex flex-column align-center justify-center text-center px-10">
              <v-avatar size="150">
                <v-img :src="trader.displayImage?.image" lazy-src="@/assets/images/avatar.png" aspect-ratio="1"
                       position="center"
                />
              </v-avatar>

              <p class="text-center text-body-1 text-sm-h6 text-md-h5 mt-5">
                {{ trader.name }}
                <v-icon color="green" size="30">mdi-check-circle</v-icon>
              </p>

              <v-btn
                :color="isCopied(index) ? 'amber' : 'teal'"
                prepend-icon="mdi-finance"
                variant="flat"
                size="large"
                class="font-weight-light text-body-2 text-sm-body-1 mt-2"
                @click="isCopied(index) ? stopCopyingThisTrader(trader) : copyThisTrader(trader, index)"
              >
                {{ isCopied(index) ? 'STOP COPYING' : 'COPY TRADER' }}
              </v-btn>

              <p class="text-center text-body-2 text-sm-body-1 text-md-h6 mt-2 font-weight-light">
                {{ trader.sub1 }}
              </p>
              <p class="text-center text-caption text-sm-body-2 text-md-body-1">
                {{ trader.sub2 }}
              </p>
              <p class="text-center text-body-2 text-sm-body-1 text-md-h6 my-5 font-weight-light">
                <v-icon size="20">mdi-finance</v-icon>
                : {{ trader.market }}
              </p>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {useAppStore} from '@/stores/app'
import {useProfileStore} from '@/stores/user/profile'
import {setDoc, deleteDoc, doc, updateDoc, arrayRemove, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '@/firebase'
import {onMounted, ref} from "vue";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import {useCopyTradeStore} from '@/stores/user/copyTrade'
import {storeToRefs} from 'pinia'

const {snackbarObject} = useAppStore()
const profileStore = useProfileStore()
const copyTradersStore = useCopyTradeStore()

const { copyTraders } = storeToRefs(copyTradersStore)

onMounted(() => {
  fetCopytraders()
})

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

const copyThisTrader = async (trader, index) => {
  if (isCopied(index)) return

  const {uid} = auth.currentUser

  await setDoc(doc(db, 'leadway_users', uid, 'copy traders', trader.name), {
    traderPosition: index,
    ...trader,
    timestamp: serverTimestamp()
  })

  await updateDoc(doc(db, 'leadway_users', uid), {
    tradersCopied: index
  })

  snackbarObject.show = true
  snackbarObject.message = `You are now copying ${trader.name}`
  snackbarObject.color = 'green'

  // Force reactivity update
  profileStore.profile.tradersCopied = index
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
