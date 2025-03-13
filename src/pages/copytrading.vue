<template>
  <v-container>
    <v-row>
      <v-col v-for="(trader, index) in copyTraders" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card rounded="xl" height="470">
          <v-img :src="trader.image" lazy-src="@/assets/images/avatar.png" height="100%" cover>
            <div class="glass rounded-xl d-flex flex-column align-center justify-center text-center px-10">
              <v-avatar size="150">
                <v-img :src="trader.image" lazy-src="@/assets/images/avatar.png" aspect-ratio="1" position="center"/>
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
                @click="isCopied(index) ? stopCopyingThisTrader(trader, index) : copyThisTrader(trader, index)"
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
import {useCopyTradeStore} from '@/stores/copyTrade'
import {useAppStore} from '@/stores/app'
import {useProfileStore} from '@/stores/profile'
import {setDoc, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp} from 'firebase/firestore'
import {auth, db} from '@/firebase'

const {copyTraders} = useCopyTradeStore()
const {snackbarObject} = useAppStore()
const profileStore = useProfileStore()

const isCopied = (index) => {
  return profileStore.profile?.tradersCopied?.includes(index)
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
    tradersCopied: arrayUnion(index)
  })

  snackbarObject.show = true
  snackbarObject.message = `You are now copying ${trader.name}`
  snackbarObject.color = 'green'

  // Force reactivity update
  profileStore.profile.tradersCopied.push(index)
}

const stopCopyingThisTrader = async (trader, index) => {
  const {uid} = auth.currentUser

  await deleteDoc(doc(db, 'leadway_users', uid, 'copy traders', trader.name))

  await updateDoc(doc(db, 'leadway_users', uid), {
    tradersCopied: arrayRemove(index)
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
