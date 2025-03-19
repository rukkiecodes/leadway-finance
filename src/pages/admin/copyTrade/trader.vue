<template>
  <v-container>
    <v-card :loading="loading" :disabled="loading" width="600" class="mx-auto mt-16" flat rounded="lg">
      <v-card-text class="py-10">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-avatar
              :image="traderInfo?.displayImage?.image"
              size="150"
            />
          </v-col>

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
              color="indigo-accent-4"
              rounded="lg"
              hide-details
              v-model="lowestPercent"
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
              v-model="highestPercent"
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
              v-model="traderAsset"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              label="Comment"
              variant="outlined"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              rows="2"
              :rules="rules"
              v-model="comment"
              counter
              maxlength="100"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="d-flex justify-end">
        <v-btn @click="saveChanges" :loading="loading" :disabled="loading" variant="flat" color="indigo-accent-4"
               rounded="lg" class="text-caption text-sm-body-2 text-md-body-1"
        >Save Changes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {doc, onSnapshot, updateDoc,} from 'firebase/firestore'
import {db} from '@/firebase'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

export default {
  data: () => ({
    traderInfo: null,

    copyTraderImage: null,

    name: '',
    lowestPercent: '',
    highestPercent: '',
    traderAsset: '',
    comment: '',

    rules: [v => v.length <= 100 || 'Max 100 characters'],

    loading: false
  }),

  mounted() {
    this.fetchTraderInfo(this.$route.params.trader)
  },

  methods: {
    async fetchTraderInfo(uid) {
      const unsub = onSnapshot(doc(db, "leadway_copy_traders", uid), (doc) => {
        this.traderInfo = doc.data();

        this.name = doc.data().name
        this.lowestPercent = doc.data().lowestPercent
        this.highestPercent = doc.data().highestPercent
        this.traderAsset = doc.data().traderAsset
        this.comment = doc.data().comment
      });

      return unsub;
    },

    selectCopyTraderImage(e) {
      const file = e.target.files[0]

      if (file) this.copyTraderImage = file
    },

    async saveChanges() {
      if (!this.copyTraderImage) return

      const MAX_FILE_SIZE = 2 * 1024 * 1024;

      if (this.copyTraderImage.size > MAX_FILE_SIZE) {
        this.copyTraderImage.show = true
        this.copyTraderImage.message = 'File size exceeds the 2MB limit. Please select a smaller image.'
        this.copyTraderImage.color = 'red'

        return
      }

      try {
        const storage = getStorage()
        const storageRef = ref(
          storage,
          `leadway_avatar/${this.copyTraderImage.name}/${new Date()}`
        );
        const uploadTask = uploadBytesResumable(storageRef, this.copyTraderImage);

        this.loading = true;

        // Monitor the upload process
        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Upload failed:", error);
            this.loading = false;
          },
          async () => {
            // Upload completed, get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at:", downloadURL);
            console.log("Path:", uploadTask.snapshot.ref.fullPath);

            await updateDoc(doc(db, 'leadway_copy_traders', this.$route.params.trader), {
              name: this.name,
              lowestPercent: this.lowestPercent,
              highestPercent: this.highestPercent,
              traderAsset: this.traderAsset,
              comment: this.comment
            })

            this.loading = false;
            this.snackbarObject.show = true
            this.snackbarObject.message = "Trader Successfully uploaded";
            this.snackbarObject.color = "green"
          }
        )
      } catch (error) {
        console.log(error)
        // loading.value = false;
        // snackbarObject.show = true
        // snackbarObject.message = "There was an error uploading Avatar";
        // snackbarObject.color = "green"
      }
    }
  }
}
</script>
