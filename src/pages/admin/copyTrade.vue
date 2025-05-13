<template>
  <v-container>
    <div class="d-flex justify-end align-center my-16">
      <v-btn
        rounded="lg"
        @click="dialog = true"
        prepend-icon="mdi-plus"
        color="indigo-accent-4"
        class="m-10 text-body-2 text-sm-body-1"
      >
        Add Trader
      </v-btn>
    </div>

    <CopyTrade/>
  </v-container>

  <v-dialog v-model="dialog" width="500">
    <v-card
      rounded="lg"
      title="Add Copy Trader"
      :loading="loading"
      :disabled="loading"
    >
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-file-input
              label="Copy Trader Image"
              @change="selectCopyTraderImage"
              variant="outlined"
              density="compact"
              accept="image/*"
              color="indigo-accent-4"
              rounded="lg"
              hide-details
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Copy Trader Name"
              variant="outlined"
              density="compact"
              accept="image/*"
              color="indigo-accent-4"
              rounded="lg"
              hide-details
              v-model="name"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              label="Lowest percent"
              variant="outlined"
              density="compact"
              accept="image/*"
              color="indigo-accent-4"
              rounded="lg"
              hide-details
              v-model="sub1"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              label="Highest percent"
              variant="outlined"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hide-details
              v-model="sub2"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              label="Select trader assets"
              :items="['Forex', 'Stock', 'Crypto Currency', 'Commodities', 'Mining', 'Indices', 'Bonds', 'Random']"
              variant="outlined"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hide-details
              v-model="market"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>

        <v-btn
          @click="saveTrader"
          text="Save Trader"
          color="indigo-accent-4"
          variant="flat"
          class="text-caption text-sm-body-2 text-md-body-1"
          :loading="loading"
          :disabled="loading"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import CopyTrade from "@/components/admin/CopyTrade.vue";
import {ref as vueRef} from 'vue'
import {db} from '@/firebase'
import {useAppStore} from '@/stores/app'

const {snackbarObject} = useAppStore()
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const dialog = vueRef(false)
const name = vueRef('')
const sub1 = vueRef('')
const sub2 = vueRef('')
const market = vueRef('')
const copyTraderImage = vueRef(null)
const loading = vueRef(false)

const selectCopyTraderImage = (e) => {
  const file = e.target.files[0]

  if (file) copyTraderImage.value = file
}

const saveTrader = async () => {
  if (!copyTraderImage.value) return

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  if (copyTraderImage.value.size > MAX_FILE_SIZE) {
    snackbarObject.show = true
    snackbarObject.message = 'File size exceeds the 2MB limit. Please select a smaller image.'
    snackbarObject.color = 'red'

    return
  }

  try {
    const storage = getStorage()
    const storageRef = ref(
      storage,
      `leadway_copy_traders/${copyTraderImage.value.name}/${new Date()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, copyTraderImage.value);

    loading.value = true;
    // Monitor the upload process
    uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        loading.value = false;
      },
      async () => {
        // Upload completed, get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at:", downloadURL);
        console.log("Path:", uploadTask.snapshot.ref.fullPath);

        await addDoc(collection(db, 'leadway_copy_traders'), {
          displayImage: {
            image: downloadURL,
            path: uploadTask.snapshot.ref.fullPath
          },
          name: name.value,
          sub1: sub1.value,
          sub2: sub2.value,
          market: market.value,
          timestamp: serverTimestamp(),
        })

        loading.value = false;
        dialog.value = false;

        snackbarObject.show = true
        snackbarObject.message = "Trader Successfully uploaded";
        snackbarObject.color = "green"
      }
    )
  } catch (error) {
    console.log(error)
    loading.value = false;
    snackbarObject.show = true
    snackbarObject.message = "There was an error uploading Avatar";
    snackbarObject.color = "green"
  }
}
</script>
