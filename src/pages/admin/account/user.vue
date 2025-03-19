<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-sheet rounded="lg">
          <v-row class="d-flex align-center">
            <v-col cols="12" sm="3">
              <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-img :src="user?.displayImage?.image" v-bind="activatorProps" cover width="200" height="200" rounded="lg" class="cursor-pointer" />
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card rounded="lg">
                    <v-card-text class="pa-0">
                      <v-img :src="user?.displayImage?.image" cover width="100%" rounded="lg" class="cursor-pointer" />
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        text="Close"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>

            <v-col cols="12" sm="3">
              <div class="d-flex flex-column justify-center">
                <div class="d-flex ga-3 justify-start align-center blink">
                  <v-icon size="25" :color="user?.verified ? 'green' : 'red'">{{user?.verified ? 'mdi-check-circle' : 'mdi-close-circle'}}</v-icon>
                  <p class="text-body-1 text-sm-h6 text-md-h5" :class="user?.verified ? 'text-green' : 'text-red'">{{user?.verified ? 'VERIFIED' : 'NOT VERIFIED'}}</p>
                </div>

                <p class="text-body-1 text-sm-h6 text-md-h5 text-lg-h4">{{user?.firstName}} {{user?.lastName}}</p>
                <p class="text-caption text-sm-body-1">{{user?.email}}</p>
              </div>
            </v-col>

            <v-col cols="12" sm="2">
              <p class="text-caption text-sm-body-2 text-md-body-1">Investment</p>
              <p class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5">${{formatMoney(user?.investment || 0)}}</p>
            </v-col>

            <v-col cols="12" sm="2">
              <p class="text-caption text-sm-body-2 text-md-body-1">Total Balance</p>
              <p class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5">${{formatMoney(user?.totalBalance || 0)}}</p>
            </v-col>

            <v-col cols="12" sm="2">
              <p class="text-caption text-sm-body-2 text-md-body-1">Earning</p>
              <p class="text-body-2 text-sm-body-1 text-md-h6 text-lg-h5">${{formatMoney(user?.totalEarnings || 0)}}</p>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-tabs
            v-model="tab"
            bg-color="transparent"
          >
            <v-tab value="profile">Profile</v-tab>
            <v-tab value="account">Account</v-tab>
            <v-tab value="history">History</v-tab>
            <v-tab value="tansactions">Tansactions</v-tab>
            <v-tab value="support">Support</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <ProfileTab v-if="user" :user="user" />
              <AccountTab v-if="user" :user="user" />
              <HistoryTab v-if="user" :user="user" />
              <TransactionTab v-if="user" :user="user" />
              <SupportTab v-if="user" :user="user" />
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { doc, onSnapshot } from "firebase/firestore";
import {db} from '@/firebase'
import ProfileTab from "@/components/admin/user/ProfileTab.vue";
import AccountTab from "@/components/admin/user/AccountTab.vue";
import HistoryTab from "@/components/admin/user/HistoryTab.vue";
import TransactionTab from "@/components/admin/user/TransactionTab.vue";
import SupportTab from "@/components/admin/user/SupportTab.vue";

export default {
  components: {SupportTab, TransactionTab, HistoryTab, AccountTab, ProfileTab},
  data: () => ({
    user: null,
    tab: null,
  }),

  setup() {
    const formatMoney = (amount, currency = 'USD') => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount).replace(/\$/g, ''); // Removes the currency symbol if needed
    };

    return {
      formatMoney
    }
  },

  mounted() {
    this.fetchUserProfile(this.$route.params.user)
  },

  methods: {
    fetchUserProfile(uid) {
      const unsub = onSnapshot(doc(db, "leadway_users", uid), (doc) => {
        this.user = doc.data();
      });

      return unsub;
    }
  }
}
</script>


<style scoped>
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.1; }
  100% { opacity: 1; }
}

.blink {
  animation: blink 1.5s infinite ease-in-out;
  text-transform: uppercase !important;
}
</style>
