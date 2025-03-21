<template>
  <v-container>
    <v-sheet max-width="1000" class="mt-16 mx-auto" rounded="lg">
      <v-row>
        <v-col cols="12" class="d-flex justify-start align-center py-5 px-8">
          <p class="text-body-1 text-sm-h6">Bank(1) Payment Details</p>
        </v-col>

        <v-col cols="12" class="py-0">
          <v-divider/>
        </v-col>

        <v-col cols="12" class="py-5 px-8">
          <p class="text-caption text-sm-body-2">To hide Bank Payment Details from users, please change the Bank Name to
            None</p>
        </v-col>

        <v-col cols="12" class="py-5 px-8">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Bank Name"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="bankName1"
                @keyup.enter="updateField('bankName1', bankName1)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Beneficiary Name"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="beneficiaryName1"
                @keyup.enter="updateField('beneficiaryName1', beneficiaryName1)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Account Number"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="accountNumber1"
                @keyup.enter="updateField('accountNumber1', accountNumber1)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Account Type"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="accountType1"
                @keyup.enter="updateField('accountType1', accountType1)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Branch Code"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="branchCode1"
                @keyup.enter="updateField('branchCode1', branchCode1)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Reference"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="reference1"
                @keyup.enter="updateField('reference1', reference1)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet max-width="1000" class="mt-16 mx-auto" rounded="lg">
      <v-row>
        <v-col cols="12" class="d-flex justify-start align-center py-5 px-8">
          <p class="text-body-1 text-sm-h6">Bank(2) Payment Details</p>
        </v-col>

        <v-col cols="12" class="py-0">
          <v-divider/>
        </v-col>

        <v-col cols="12" class="py-5 px-8">
          <p class="text-caption text-sm-body-2">To hide Bank Payment Details from users, please change the Bank Name to
            None</p>
        </v-col>

        <v-col cols="12" class="py-5 px-8">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Bank Name"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="bankName2"
                @keyup.enter="updateField('bankName2', bankName2)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Beneficiary Name"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="beneficiaryName2"
                @keyup.enter="updateField('beneficiaryName2', beneficiaryName2)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Account Number"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="accountNumber2"
                @keyup.enter="updateField('accountNumber2', accountNumber2)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Account Type"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="accountType2"
                @keyup.enter="updateField('accountType2', accountType2)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Branch Code"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="branchCode2"
                @keyup.enter="updateField('branchCode2', branchCode2)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Reference"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="reference2"
                @keyup.enter="updateField('reference2', reference2)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet max-width="1000" class="mt-16 mx-auto" rounded="lg">
      <v-row>
        <v-col cols="12" class="d-flex justify-start align-center py-5 px-8">
          <p class="text-body-1 text-sm-h6">Bank(3) Payment Details</p>
        </v-col>

        <v-col cols="12" class="py-0">
          <v-divider/>
        </v-col>

        <v-col cols="12" class="py-5 px-8">
          <p class="text-caption text-sm-body-2">To hide Bank Payment Details from users, please change the Bank Name to
            None</p>
        </v-col>

        <v-col cols="12" class="py-5 px-8">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Bank Name"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="bankName3"
                @keyup.enter="updateField('bankName3', bankName3)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Beneficiary Name"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="beneficiaryName3"
                @keyup.enter="updateField('beneficiaryName3', beneficiaryName3)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Account Number"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="accountNumber3"
                @keyup.enter="updateField('accountNumber3', accountNumber3)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Account Type"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="accountType3"
                @keyup.enter="updateField('accountType3', accountType3)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Branch Code"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="branchCode3"
                @keyup.enter="updateField('branchCode3', branchCode3)"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Reference"
                rounded="lg"
                color="indigo-accent-4"
                hint="Press (ENTER) to save"
                v-model="reference3"
                @keyup.enter="updateField('reference3', reference3)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet max-width="1000" class="mt-16 mx-auto" color="transparent">
      <v-row>
        <v-col cols="12" class="d-flex justify-start align-center py-5">
          <p class="text-body-1 text-sm-h6">Contact and Wallet addresses</p>
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="12" sm="6">
              <v-card rounded="lg">
                <v-card-text>
                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="Phone"
                    rounded="lg"
                    color="indigo-accent-4"
                    hint="Press (ENTER) to save"
                    v-model="phone"
                    @keyup.enter="updateField('phone', phone)"
                  />

                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="WhatsApp Phone"
                    rounded="lg"
                    color="indigo-accent-4"
                    hint="Press (ENTER) to save"
                    v-model="whatsAppPhone"
                    @keyup.enter="updateField('whatsAppPhone', whatsAppPhone)"
                  />

                  <v-switch
                    inset
                    label="Show Whatsapp"
                    color="indigo-accent-4"
                    hide-details
                    v-model="showWhatsapp"
                    @update:modelValue="updateField('showWhatsapp', showWhatsapp)"
                  />
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6">
              <v-card rounded="lg">
                <v-card-text>
                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="Bitcoin Wallet"
                    rounded="lg"
                    color="indigo-accent-4"
                    hint="Press (ENTER) to save"
                    v-model="bitcoinWallet"
                    @keyup.enter="updateField('bitcoinWallet', bitcoinWallet)"
                  />

                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="Ethereum(ERC20) Wallet"
                    rounded="lg"
                    color="indigo-accent-4"
                    hint="Press (ENTER) to save"
                    v-model="ethereum"
                    @keyup.enter="updateField('ethereum', ethereum)"
                  />

                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="USDT(TRC20) Wallet"
                    rounded="lg"
                    color="indigo-accent-4"
                    hint="Press (ENTER) to save"
                    v-model="USDT"
                    @keyup.enter="updateField('USDT', USDT)"
                  />

                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="LTC Wallet"
                    rounded="lg"
                    color="indigo-accent-4"
                    hint="Press (ENTER) to save"
                    v-model="LTC"
                    @keyup.enter="updateField('LTC', LTC)"
                  />

                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="XRP Wallet"
                    rounded="lg"
                    color="indigo-accent-4"
                    hint="Press (ENTER) to save"
                    v-model="XRP"
                    @keyup.enter="updateField('XRP', XRP)"
                  />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>


<script setup lang="ts">
import {doc, updateDoc} from "firebase/firestore";
import {db, auth} from '@/firebase'
import {onMounted, ref} from 'vue'
import {useAppStore} from '@/stores/app'
import { useProfileStore } from '@/stores/user/profile'
import {storeToRefs} from 'pinia';

const {snackbarObject} = useAppStore()
const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore);

const bankName1 = ref('')
const beneficiaryName1 = ref('')
const accountNumber1 = ref('')
const accountType1 = ref('')
const branchCode1 = ref('')
const reference1 = ref('')

const bankName2 = ref('')
const beneficiaryName2 = ref('')
const accountNumber2 = ref('')
const accountType2 = ref('')
const branchCode2 = ref('')
const reference2 = ref('')

const bankName3 = ref('')
const beneficiaryName3 = ref('')
const accountNumber3 = ref('')
const accountType3 = ref('')
const branchCode3 = ref('')
const reference3 = ref('')

const phone = ref('')
const whatsAppPhone = ref('')
const showWhatsapp = ref(false)

const bitcoinWallet = ref('')
const ethereum = ref('')
const USDT = ref('')
const LTC = ref('')
const XRP = ref('')


onMounted(() => {
  autoFillFields()
})



const autoFillFields = () => {
  bankName1.value = profile.value.bankName1
  beneficiaryName1.value = profile.value.beneficiaryName1
  accountNumber1.value = profile.value.accountNumber1
  accountType1.value = profile.value.accountType1
  branchCode1.value = profile.value.branchCode1
  reference1.value = profile.value.reference1

  bankName2.value = profile.value.bankName2
  beneficiaryName2.value = profile.value.beneficiaryName2
  accountNumber2.value = profile.value.accountNumber2
  accountType2.value = profile.value.accountType2
  branchCode2.value = profile.value.branchCode2
  reference2.value = profile.value.reference2

  bankName3.value = profile.value.bankName3
  beneficiaryName3.value = profile.value.beneficiaryName3
  accountNumber3.value = profile.value.accountNumber3
  accountType3.value = profile.value.accountType3
  branchCode3.value = profile.value.branchCode3
  reference3.value = profile.value.reference3

  phone.value = profile.value.phone
  whatsAppPhone.value = profile.value.whatsAppPhone
  showWhatsapp.value = profile.value.showWhatsapp

  bitcoinWallet.value = profile.value.bitcoinWallet
  ethereum.value = profile.value.ethereum
  USDT.value = profile.value.USDT
  LTC.value = profile.value.LTC
  XRP.value = profile.value.XRP
}

const updateField = async (field: string, value: any) => {
  const {uid} = auth.currentUser

  if (!uid) {
    console.error("User UID is missing!");
    return;
  }

  try {
    await updateDoc(doc(db, "leadway_users", uid), {
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
