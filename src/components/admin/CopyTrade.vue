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

    <v-divider/>
    <v-data-table
      v-model:search="search"
      :filter-keys="['name', 'market']"
      :headers="headers"
      :items="copyTrades"
    >
      <template v-slot:item.displayImage="{ item }">
        <v-avatar size="50" class="my-2">
          <v-img :src="item?.displayImage?.image || '@/assets/images/avatar.png'" cover/>
        </v-avatar>
      </template>

      <template v-slot:item.sub1="{ item }">
        <p>%{{ item?.sub1 }}</p>
      </template>

      <template v-slot:item.sub2="{ item }">
        <p>%{{ item?.sub2 }}</p>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn @click="openEditDialog(item)" size="small" variant="text" class="text-caption text-sm-body-2">
          View Trader
        </v-btn>
      </template>
    </v-data-table>
  </v-card>

  <!--  Edit Trader Dialog Start-->
  <v-dialog v-model="editTraderDialog" max-width="500">
    <v-card title="Add Copy Trader" :loading="loading" :disabled="loading" rounded="lg">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-file-input
              label="Copy Trader Image"
              @change="updateTraderImage"
              variant="outlined"
              density="compact"
              accept="image/*"
              color="indigo-accent-4"
              rounded="lg"
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
              v-model="selectedUser.name"
              hint="Press (ENTER) to save"
              @keyup.enter="updateField('name', selectedUser.name)"
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
              v-model="selectedUser.sub1"
              hint="Press (ENTER) to save"
              @keyup.enter="updateField('sub1', selectedUser.sub1)"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              label="Highest percent"
              variant="outlined"
              density="compact"
              color="indigo-accent-4"
              rounded="lg"
              hint="Press (ENTER) to save"
              v-model="selectedUser.sub2"
              @keyup.enter="updateField('sub2', selectedUser.sub2)"
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
              hint="Press (ENTER) to save"
              v-model="selectedUser.market"
              @update:model-value="updateField('market', selectedUser.market)"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="deleteTrader" color="red" class="text-caption text-sm-body-2 text-md-body-1">Delete Trader</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!--  Edit Trader Dialog end-->
</template>

<script lang="ts" setup>
import {computed, onMounted, ref as vueRef} from 'vue'
import {collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc} from "firebase/firestore";
import {db} from '@/firebase'
import {useAppStore} from '@/stores/app'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const search = vueRef('')
const copyTrades = vueRef([])

const loading = vueRef(false)
const {snackbarObject} = useAppStore()

const editTraderDialog = vueRef(false)
const selectedUser = vueRef({
  copyTraderImage: null,
  name: '',
  sub1: '',
  sub2: '',
  market: ''
})

const headers = computed(() => [
  {title: "Photo", key: "displayImage", sortable: false},
  {title: "Name", key: "name"},
  {title: "Asset", key: "market"},
  {title: "", key: "sub1"},
  {title: "", key: "sub2"},
  {title: "", key: "actions", sortable: false}
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

const openEditDialog = (item) => {
  selectedUser.value = item;
  editTraderDialog.value = true;
}

const updateField = async (field: string, value: any) => {
  const uid = selectedUser.value.id
  if (!uid) {
    console.error("User UID is missing!");
    return;
  }

  try {
    await updateDoc(doc(db, "leadway_copy_traders", uid), {
      [field]: value,
    });
    snackbarObject.show = true
    snackbarObject.message = `Updated Successfully`
    snackbarObject.color = "green"
  } catch (error) {
    console.error("Error updating field:", error);
  }
};

const updateTraderImage = async (e) => {
  const file = e.target.files[0]

  if (!file) return

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  if (file.size > MAX_FILE_SIZE) {
    snackbarObject.show = true
    snackbarObject.message = 'File size exceeds the 2MB limit. Please select a smaller image.'
    snackbarObject.color = 'red'

    return
  }

  try {
    loading.value = true;
    const uid = selectedUser.value.id

    const storage = getStorage()
    const storageRef = ref(
      storage,
      `leadway_avatar/${file.name}/${new Date()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

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

        updateDoc(doc(db, 'leadway_copy_traders', uid), {
          displayImage: {
            image: downloadURL,
            path: uploadTask.snapshot.ref.fullPath
          }
        })

        editTraderDialog.value = false;
        loading.value = false;
        snackbarObject.show = true
        snackbarObject.message = "Avatar Successfully uploaded";
        snackbarObject.color = "green"
      }
    )
  } catch (error) {
    console.log(error)
    editTraderDialog.value = false;
    loading.value = false;
    snackbarObject.show = true
    snackbarObject.message = "There was an error uploading Avatar";
    snackbarObject.color = "green"
  }
}

const deleteTrader = async () => {
  await deleteDoc(doc(db, 'leadway_copy_traders', selectedUser.value.id))

  editTraderDialog.value = false;
  loading.value = false;
  snackbarObject.show = true
  snackbarObject.message = "Avatar Successfully deleted";
  snackbarObject.color = "green"
}
</script>
