<template>
  <AppBar v-if="!switchAccount"/>
  <LeftDrawer v-if="!switchAccount"/>
  <RightDrawer v-if="!switchAccount"/>
  <BottomDrawer v-if="!switchAccount" />

  <v-app>
    <v-main>
      <v-sheet v-if="!switchAccount" color="transparent" dark>
        <router-view/>
      </v-sheet>

      <v-sheet v-if="switchAccount" class="d-flex justify-center align-center" width="100%" height="100%"
               color="transparent">
        <v-sheet max-width="90%" width="1000" height="700" rounded="xl"
                 class="d-flex flex-column justify-center align-center">
          <v-progress-circular indeterminate size="200" color="indigo-accent-4">
            <v-avatar size="180">
              <v-img :src="profile?.displayImage?.image" lazy-src="@/assets/images/avatar.png"/>
            </v-avatar>
          </v-progress-circular>
          <p class="mt-5 text-body-2 text-sm-body-1 text-md-h6 font-weight-bold">Switching {{ profile?.firstName }}'s privileges</p>
        </v-sheet>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useProfileStore} from "@/stores/user/profile";
import {useAppStore} from "@/stores/app";
import AppBar from "@/components/appComponents/AppBar.vue";
import LeftDrawer from "@/components/appComponents/LeftDrawer.vue";
import RightDrawer from "@/components/appComponents/RightDrawer.vue";
import {storeToRefs} from 'pinia';
import BottomDrawer from "@/components/appComponents/BottomDrawer.vue";

const profileStore = useProfileStore();
const appStore = useAppStore();
const {switchAccount} = storeToRefs(appStore)
const {profile} = storeToRefs(profileStore)

onMounted(() => {
  profileStore.fetchUserProfile()
});
</script>
