<template>
  <v-container>
    <v-sheet max-width="1200" class="mx-auto" color="transparent" dark>
      <v-row>
        <v-col cols="12" sm="4">
          <v-card flat color="transparent" dark>
            <v-card-text class="d-flex flex-column justify-center">
              <v-avatar size="200" class="mx-auto mb-5">
                <v-img :src="profileStore.profile?.displayImage?.image" lazy-src="@/assets/images/avatar.png"/>
              </v-avatar>
              <p class="text-body-2 text-md-body-1 text-lg-h6 text-center">{{ profileStore.profile?.firstName }}
                {{ profileStore.profile?.lastName }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="signOutUser" prepend-icon="mdi-logout" dark variant="text" color="red" class="mx-auto">
                Logout
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" sm="8" class="mt-sm-16">
          <v-row>
            <v-col cols="12" sm="6">
              <router-link to="/account/updateContactInformation" class="text-decoration-none">
                <v-sheet rounded="lg" class="pa-2 d-flex align-center ga-4">
                  <v-sheet width="50" height="50" color="teal" class="d-flex justify-center align-center" dark
                           rounded="lg"
                  >
                    <v-icon>mdi-phone</v-icon>
                  </v-sheet>

                  <p class="text-caption text-sm-body-2 text-md-body-1">Update Contact Information</p>
                </v-sheet>
              </router-link>
            </v-col>

            <v-col cols="12" sm="6">
              <router-link to="/account/updateAvatar" class="text-decoration-none">
                <v-sheet rounded="lg" class="pa-2 d-flex align-center ga-4">
                  <v-sheet width="50" height="50" color="purple" class="d-flex justify-center align-center" dark
                           rounded="lg"
                  >
                    <v-icon>mdi-account-circle</v-icon>
                  </v-sheet>

                  <p class="text-caption text-sm-body-2 text-md-body-1">Update Avatar</p>
                </v-sheet>
              </router-link>
            </v-col>

            <v-col cols="12" sm="6">
              <router-link to="/account/updatePassword" class="text-decoration-none">
                <v-sheet rounded="lg" class="pa-2 d-flex align-center ga-4">
                  <v-sheet width="50" height="50" color="indigo" class="d-flex justify-center align-center" dark
                           rounded="lg"
                  >
                    <v-icon>mdi-shield-account</v-icon>
                  </v-sheet>

                  <p class="text-caption text-sm-body-2 text-md-body-1">Update Password</p>
                </v-sheet>
              </router-link>
            </v-col>

            <v-col cols="12" sm="6">
              <router-link to="/account/updateEmail" class="text-decoration-none">
                <v-sheet rounded="lg" class="pa-2 d-flex align-center ga-4">
                  <v-sheet width="50" height="50" color="indigo" class="d-flex justify-center align-center" dark
                           rounded="lg"
                  >
                    <v-icon>mdi-email</v-icon>
                  </v-sheet>

                  <p class="text-caption text-sm-body-2 text-md-body-1">Update Email</p>
                </v-sheet>
              </router-link>
            </v-col>

            <v-col cols="12" sm="6">
              <router-link to="/account/viewNotifications" class="text-decoration-none">
                <v-sheet rounded="lg" class="pa-2 d-flex align-center ga-4">
                  <v-sheet width="50" height="50" color="indigo" class="d-flex justify-center align-center" dark
                           rounded="lg"
                  >
                    <v-icon>mdi-bell</v-icon>
                  </v-sheet>

                  <p class="text-caption text-sm-body-2 text-md-body-1">Notifications</p>
                </v-sheet>
              </router-link>
            </v-col>

            <v-col cols="12" sm="6">
              <v-sheet rounded="lg" class="pa-2 d-flex align-center ga-4">
                <v-sheet width="50" height="50" color="indigo" class="d-flex justify-center align-center" dark
                         rounded="lg"
                >
                  <v-icon>mdi-account-multiple</v-icon>
                </v-sheet>

                <p class="text-caption text-sm-body-2 text-md-body-1">Referals</p>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import {useProfileStore} from '@/stores/user/profile'
import {useRouter} from "vue-router";
import {signOut} from "firebase/auth";
import {auth} from "@/firebase";

const profileStore = useProfileStore()
const router = useRouter()

const signOutUser = async () => {
  await signOut(auth)
  router.push('/auth/login');
}
</script>
