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

  <v-dialog v-model="dialog" width="600" persistent>
    <v-card rounded="lg" :loading="loading" :disabled="loading">
      <v-toolbar density="compact" color="transparent">
        <v-spacer/>

        <v-btn icon text @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-text-field
          label="Name"
          rounded="lg"
          v-model="name"
          density="compact"
          variant="outlined"
          color="indigo-accent-4"
        />

        <v-text-field
          label="Sub1"
          rounded="lg"
          v-model="sub1"
          density="compact"
          variant="outlined"
          color="indigo-accent-4"
        />

        <v-text-field
          label="Sub2"
          rounded="lg"
          v-model="sub2"
          density="compact"
          variant="outlined"
          color="indigo-accent-4"
        />

        <v-text-field
          label="Market"
          rounded="lg"
          v-model="market"
          density="compact"
          variant="outlined"
          color="indigo-accent-4"
        />

        <v-file-input
          density="compact"
          label="Proof Of Payment"
          variant="outlined"
          rounded="lg"
          color="indigo-accent-4"
          @change="selectImage"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="submitPOP" :loading="loading" :disabled="loading" variant="flat" color="indigo-accent-4">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import CopyTrade from "@/components/admin/CopyTrade.vue";
import {ref as vueRef, onMounted} from 'vue'
import {db, auth} from '@/firebase'
import {useAppStore} from '@/stores/app'

const {snackbarObject} = useAppStore()
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  setDoc, updateDoc,
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
const POPImage = vueRef(null)
const loading = vueRef(false)

const selectImage = (event) => {
  const file = event.target.files[0];

  if (file) POPImage.value = file
}

const submitPOP = async () => {
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  if (POPImage.value.size > MAX_FILE_SIZE) {
    alert(
      "File size exceeds the 2MB limit. Please select a smaller image."
    );
    return;
  }

  try {
    // Initialize Firebase Storage
    loading.value = true;
    const {uid} = auth.currentUser;
    if (!uid) return

    const storage = getStorage()
    const storageRef = ref(
      storage,
      `leadway_copy_traders/${POPImage.value.name}/${new Date()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, POPImage.value);

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

        await setDoc(doc(db, 'leadway_copy_traders', name.value), {
          name: name.value,
          sub1: sub1.value,
          sub2: sub2.value,
          market: market.value,
          displayImage: {image: downloadURL, path: uploadTask.snapshot.ref.fullPath},
          timestamp: serverTimestamp()
        })

        loading.value = false;
        snackbarObject.show = true
        snackbarObject.message = "Successfully uploaded";
        snackbarObject.color = "green"
        dialog.value = false
      }
    )
  } catch (error) {
    console.error("Error uploading image:", error);
    loading.value = false;
  }
}
</script>
