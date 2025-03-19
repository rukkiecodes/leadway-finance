<template>
  <v-tabs-window-item value="profile">
    <v-toolbar density="compact" color="transparent">
      <template v-slot:prepend>
        <v-toolbar-title>Personal Profile Info</v-toolbar-title>
      </template>
    </v-toolbar>
    <v-divider class="mb-10" />

    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          label="First Name"
          variant="outlined"
          v-model="firstName"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('firstName', firstName)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Last Name"
          variant="outlined"
          v-model="lastName"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('lastName', lastName)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Email"
          variant="outlined"
          v-model="email"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('email', email)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Phone"
          variant="outlined"
          v-model="phone"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('phone', phone)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          :items="countries"
          label="Country"
          variant="outlined"
          v-model="country"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Select to save"
          @keyup.enter="updateField('country', country)"
          @update:model-value="updateField('country', country)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="State"
          variant="outlined"
          v-model="state"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('state', state)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="City"
          variant="outlined"
          v-model="city"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('city', city)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Zip"
          variant="outlined"
          v-model="zip"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('zip', zip)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Address"
          variant="outlined"
          v-model="address"
          density="compact"
          color="indigo-accent-4"
          rounded="lg"
          hint="Press (ENTER) to save"
          @keyup.enter="updateField('address', address)"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-switch
          :label="disabled ? 'Account Disabled' : 'Account is not disabled'"
          inset
          color="red-accent-4"
          v-model="disabled"
          @update:modelValue="updateField('disabled', disabled)"
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
import { useCountryStore } from '@/stores/user/countries'

// Define props
const props = defineProps<{
  user: Record<string, any>;
}>();

const { snackbarObject } = useAppStore()
const { countries } = useCountryStore()
// Local state for firstName (since props are readonly)
const firstName = ref(props.user?.firstName || "");
const lastName = ref(props.user?.lastName || "");
const email = ref(props.user?.email || "");
const phone = ref(props.user?.phone || "");
const country = ref(props.user?.country || "");
const state = ref(props.user?.state || "");
const city = ref(props.user?.city || "");
const zip = ref(props.user?.zip || "");
const address = ref(props.user?.address || "");
const disabled = ref(props.user?.disabled || false);

// Sync changes when props update
watch(() => props.user?.firstName, (newVal) => {
  firstName.value = newVal;
});

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
