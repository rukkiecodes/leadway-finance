<template>
  <v-tabs-window-item value="account">
    <v-toolbar density="compact" color="transparent">
      <template v-slot:prepend>
        <v-toolbar-title>Edit Account Records</v-toolbar-title>
      </template>
    </v-toolbar>
    <v-divider class="mb-10" />

    <v-row>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Investment"
              variant="outlined"
              v-model="investment"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hint="Press (ENTER) to save"
              @keyup.enter="updateField('investment', investment)"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Total Earnings"
              variant="outlined"
              v-model="totalEarnings"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hint="Press (ENTER) to save"
              @keyup.enter="updateField('totalEarnings', totalEarnings)"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Total Referrals"
              variant="outlined"
              v-model="totalReferrals"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hint="Press (ENTER) to save"
              @keyup.enter="updateField('totalReferrals', totalReferrals)"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Bonus"
              variant="outlined"
              v-model="bonus"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hint="Press (ENTER) to save"
              @keyup.enter="updateField('bonus', bonus)"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Total Balance"
              variant="outlined"
              v-model="totalBalance"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hint="Press (ENTER) to save"
              @keyup.enter="updateField('totalBalance', totalBalance)"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Pending Withdrawal"
              variant="outlined"
              v-model="pendingWithdrawal"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hint="Press (ENTER) to save"
              @keyup.enter="updateField('pendingWithdrawal', pendingWithdrawal)"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Total Deposit"
              variant="outlined"
              v-model="totalDeposit"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hint="Press (ENTER) to save"
              @keyup.enter="updateField('totalDeposit', totalDeposit)"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Total Withdrawal"
              variant="outlined"
              v-model="totalWithdrawal"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hint="Press (ENTER) to save"
              @keyup.enter="updateField('totalWithdrawal', totalWithdrawal)"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Last Deposit"
          variant="outlined"
          v-model="lastDeposit"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('lastDeposit', lastDeposit)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Minimum Withdrawal"
          variant="outlined"
          v-model="minimumWithdrawal"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('minimumWithdrawal', minimumWithdrawal)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Last Withdrawal"
          variant="outlined"
          v-model="lastWithdrawal"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('lastWithdrawal', lastWithdrawal)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          variant="outlined"
          density="compact"
          label="Currency"
          :items="['USD', 'CAD', 'EUR', 'GBP', 'AUD']"
          v-model="currency"
          rounded="lg"
          color="indigo-accent-4"
          @update:model-value="updateField('currency', currency)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          :items="[
            {name: 'Starter', value: 500, label: 'Starter $500.00'},
            {name: 'Premium', value: 10000, label: 'Premium $10,000.00'},
            {name: 'Gold', value: 20000, label: 'Gold $20,000.00'},
            {name: 'Vip', value: 50000, label: 'Vip $50,000.00'},
            {name: 'None', value: 0, label: 'None'},
          ]"
          return-object
          item-title="label"
          label="Package"
          variant="outlined"
          v-model="subscriptionPackage"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Select to save"
          @keyup.enter="updateField('subscriptionPackage', subscriptionPackage)"
          @update:model-value="updateField('subscriptionPackage', subscriptionPackage)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          :items="[
            {name: 'Momentum Signals', value: 2800, label: 'Momentum Signals $2,800'},
            {name: 'Breakout Signals', value: 6000, label: 'Breakout Signals $6,000'},
            {name: 'Buying Oversold', value: 12500, label: 'Buying Oversold $12,500'},
            {name: 'Trend Signal', value: 28000, label: 'Trend Signal $28,000'},
          ]"
          return-object
          item-title="label"
          label="Signal"
          variant="outlined"
          v-model="signal"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Select to save"
          @keyup.enter="updateField('signal', signal)"
          @update:model-value="updateField('signal', signal)"
        />
      </v-col>

      <v-col cols="12">
        <v-select
          :items="[
            {value: 8950, label: 'Junkrat Gallo Bot #68 $8,950.00'},
            {value: 13499, label: 'Adlersbrunn Articuno Bot #48 $13,499.00'},
            {value: 17999, label: 'Vignar Ziggs Bot #24 $17,999.00'},
            {value: 24850, label: 'Revelio Jayce(private) Bot #11 $24,850.00'},
            {value: 29269, label: 'Hunter Razzy Bot #35 $29,269.00'},
          ]"
          return-object
          item-title="label"
          label="Copy Bot Package"
          variant="outlined"
          v-model="copyBotPackage"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Select to save"
          @keyup.enter="updateField('copyBotPackage', copyBotPackage)"
          @update:model-value="updateField('copyBotPackage', copyBotPackage)"
        />
      </v-col>
    </v-row>
  </v-tabs-window-item>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { defineProps } from "vue";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAppStore } from '@/stores/app'

// Define props
const props = defineProps<{
  user: Record<string, any>;
}>();

const { snackbarObject } = useAppStore()

const investment = ref(props.user?.investment || "");
const totalEarnings = ref(props.user?.totalEarnings || "");
const totalReferrals = ref(props.user?.totalReferrals || "");
const bonus = ref(props.user?.bonus || "");

const totalBalance = ref(props.user?.totalBalance || "");
const pendingWithdrawal = ref(props.user?.pendingWithdrawal || "");
const totalDeposit = ref(props.user?.totalDeposit || "");
const totalWithdrawal = ref(props.user?.totalWithdrawal || "");

const lastDeposit = ref(props.user?.lastDeposit || "");
const minimumWithdrawal = ref(props.user?.minimumWithdrawal || "");
const lastWithdrawal = ref(props.user?.lastWithdrawal || "");
const currency = ref(props.user?.currency || "");
const subscriptionPackage = ref(props.user?.subscriptionPackage || {name: 'None', value: 0, label: 'None'});
const signal = ref(props.user?.signal || {name: 'None', value: 0, label: 'None'});
const copyBotPackage = ref(props.user?.copyBotPackage || {name: 'None', value: 0, label: 'None'});

// Function to update Firestore
const updateField = async (field: string, value: any) => {
  if (!props.user?.uid) {
    console.error("User UID is missing!");
    return;
  }

  try {
    await updateDoc(doc(db, "leadway_users", props.user?.uid), {
      [field]: value,
    });
    snackbarObject.show = true
    snackbarObject.message = `Updated Successfully`
    snackbarObject.color = "green"
  } catch (error) {
    console.error("Error updating field:", error);
  }
};
</script>
