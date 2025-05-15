<script lang="ts">
import {doc, onSnapshot} from "firebase/firestore";
import {db} from '@/firebase'
import MainTable from "@/components/admin/trades/MainTable.vue";

export default {
  components: {MainTable},
  data: () => ({
    user: null,
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
        this.user = {
          uid: uid,
          ...doc.data()
        };
      });

      return unsub;
    }
  }
}
</script>

<template>
  <v-container>
    <v-card color="transparent">
      <v-card-text>
        <div class="d-flex ga-5 align-center flex-1-0">
          <v-avatar v-if="user?.displayImage" :image="user?.displayImage?.image" size="60"/>
          <v-avatar v-else image="@/assets/images/avatar.png" size="60"/>

          <div>
            <p class="text-body-2 font-weight-bold">{{ user?.firstName }} {{ user?.lastName }}</p>
            <p class="text-caption font-weight-light">{{ user?.email }}</p>
          </div>
        </div>
      </v-card-text>

      <v-card-text>
        <MainTable v-if="user" :user="user" />
      </v-card-text>
    </v-card>
  </v-container>
</template>
