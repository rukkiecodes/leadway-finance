<template>
  <v-container>
    <v-sheet rounded="lg" class="pa-2 d-flex flex-column flex-sm-row align-start justify-start ga-5" dark>
      <v-avatar size="x-large">
        <v-img v-if="profile?.displayImage" :src="profile?.displayImage?.image"/>
        <v-img v-else src="@/assets/images/avatar.png"/>
      </v-avatar>

      <div class="d-flex flex-column ">
        <p class="text-body-2 text-sm-body-1 text-md-h6">{{ profile?.firstName }} {{ profile?.lastName }}</p>
        <p class="text-caption text-sm-body-2">{{ referrals.length }} Referrals</p>

        <div class="d-flex align-center justify-start mt-4 ga-3">
          <v-btn @click="copyToClipboard" icon color="indigo-accent-4" size="40">
            <v-icon size="sm">mdi-content-copy</v-icon>
          </v-btn>

          <p class="text-caption text-sm-body-2">Me:{{ profile?.uid }}</p>
        </div>
      </div>
    </v-sheet>

    <v-row class="mt-3">
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(referral, index) in referrals" :key="index">
        <v-card rounded="lg">
          <v-card-text class="d-flex justify-start align-center ga-5">
            <v-avatar size="x-large">
              <v-img v-if="referral?.displayImage" :src="referral?.displayImage?.image"/>
              <v-img v-else src="@/assets/images/avatar.png"/>
            </v-avatar>

            <p class="text-body-2 text-sm-body-1 text-md-h6">{{ referral?.firstName }} {{ referral?.lastName }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {useProfileStore} from '@/stores/user/profile'
import {storeToRefs} from 'pinia'
import {useAppStore} from '@/stores/app'
import {onMounted, ref} from "vue";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import {db, auth} from '@/firebase'

const profileStore = useProfileStore()
const {profile} = storeToRefs(profileStore)
const {snackbarObject} = useAppStore()

const referrals = ref([])

const fetchReferrals = async () => {
  const q = query(collection(db, "leadway_users", auth.currentUser.uid, 'referrals'), orderBy("timestamp", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    referrals.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  });

  return unsubscribe;
}

function copyToClipboard() {
  navigator.clipboard.writeText(`https://leadway-54771.web.app/auth/${profile.value.uid}`)

  snackbarObject.show = true
  snackbarObject.message = "Copied";
  snackbarObject.color = "indigo"
}

onMounted(() => {
  fetchReferrals()
})
</script>
