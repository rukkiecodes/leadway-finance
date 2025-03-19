<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-file-tree"></v-icon>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      />
    </v-card-title>

    <v-divider />
    <v-data-table
      v-model:search="search"
      :filter-keys="['name', 'traderAsset']"
      :headers="headers"
      :items="copyTrades"
    >
      <template v-slot:item.displayImage="{ item }">
        <v-avatar size="50" class="my-2">
          <v-img :src="item?.displayImage?.image" cover />
        </v-avatar>
      </template>

      <template v-slot:item.lowestPercent="{ item }">
        <p>%{{ item?.lowestPercent }}</p>
      </template>

      <template v-slot:item.highestPercent="{ item }">
        <p>%{{ item?.highestPercent }}</p>
      </template>

      <template v-slot:item.comment="{ item }">
        <p>{{ item?.comment || 'No comment' }}</p>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn :to="`/admin/copyTrading/${item.id}`" size="small" variant="text" class="text-caption text-sm-body-2">View Trader</v-btn>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        position="fixed"
        location="bottom right"
        class="ma-5 text-caption text-sm-body-2 text-md-body-1"
        variant="flat"
        color="indigo-accent-4"
        prepend-icon="mdi-plus"
      >
        Add Copy Trader
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Add Copy Trader" :loading="loading" :disabled="loading" rounded="lg">
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
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref as vueRef} from 'vue'
import {collection, query, orderBy, onSnapshot, addDoc, serverTimestamp} from "firebase/firestore";
import {db} from '@/firebase'
import {useAppStore} from '@/stores/app'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const search = vueRef('')
const copyTrades = vueRef([])

const copyTraderImage = vueRef(null)
const name = vueRef('')
const lowestPercent = vueRef('')
const highestPercent = vueRef('')
const traderAsset = vueRef('None')
const comment = vueRef('')

const loading = vueRef(false)
const {snackbarObject} = useAppStore()

const rules = [v => v.length <= 100 || 'Max 100 characters']

const headers = computed(() => [
  { title: "Photo", key: "displayImage", sortable: false },
  { title: "Name", key: "name" },
  { title: "Asset", key: "traderAsset" },
  { title: "Lowest Percent", key: "lowestPercent" },
  { title: "Highest Percent", key: "highestPercent" },
  { title: "Comment", key: "comment" },
  { title: "", key: "actions", sortable: false }
]);

const fetchCopyTrades = async () => {
  const q = query(collection(db, "leadway_copy_traders"), orderBy("name", 'asc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    copyTrades.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  });

  return unsubscribe;
}
onMounted(() => {
  fetchCopyTrades()
})

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
      `leadway_avatar/${copyTraderImage.value.name}/${new Date()}`
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

        await  addDoc(collection(db, 'leadway_copy_traders'), {
          displayImage: {
            image: downloadURL,
            path: uploadTask.snapshot.ref.fullPath
          },
          name: name.value,
          lowestPercent: lowestPercent.value,
          highestPercent: highestPercent.value,
          comment: comment.value,
          traderAsset: traderAsset.value,
          timestamp: serverTimestamp(),
        })

        loading.value = false;
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
