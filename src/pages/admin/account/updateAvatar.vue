<template>
  <v-container>
    <v-card max-width="600" class="mx-auto mt-16">
      <v-card-text class="d-flex flex-column justify-center align-center">
        <v-avatar v-if="!avatarPreview" image="@/assets/images/avatar.png" size="200"/>
        <v-avatar v-else :image="avatarPreview" size="200"/>

        <v-file-input
          density="compact"
          label="Select Avatar"
          accept="image/*"
          variant="outlined"
          class="mt-10"
          width="100%"
          @change="selectAnAvatar"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="updateContactInformation" :loading="loading" :disabled="loading" color="indigo-accent-4"
               variant="flat" block dark
        >Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {ref as vueRef, onMounted} from "vue";
import {useProfileStore} from '@/stores/user/profile'
import {useAppStore} from '@/stores/app'
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '@/firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject} from "firebase/storage";

const profileStore = useProfileStore()
const {snackbarObject} = useAppStore()

const loading = vueRef(false)
const avatarImage = vueRef(null)
const avatarPreview = vueRef(null)

const selectAnAvatar = (e) => {
  const file = e.target.files[0]

  if (file) {
    console.log(file);
    const reader = new FileReader();
    avatarImage.value = file;

    reader.onload = (e) => {
      avatarPreview.value = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}

const updateContactInformation = async () => {
  if (profileStore.profile?.displayImage) {
    // console.log(profileStore.profile?.displayImage.path);
    const storage = getStorage();
    const desertRef = ref(storage, profileStore.profile?.displayImage.path);

    loading.value = true;
    // Delete the file
    deleteObject(desertRef).then(() => {
      // File deleted successfully
      save()
    }).catch((error) => {
      // Uh-oh, an error occurred!
      loading.value = true;
      save()
      return error
    });
  } else save()
}

const save = async () => {
  if (!avatarImage.value) return

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  if (avatarImage.value.size > MAX_FILE_SIZE) {
    snackbarObject.show = true
    snackbarObject.message = 'File size exceeds the 2MB limit. Please select a smaller image.'
    snackbarObject.color = 'red'

    return
  }

  try {
    loading.value = true;
    const uid = profileStore.profile?.uid;

    const storage = getStorage()
    const storageRef = ref(
      storage,
      `leadway_avatar/${avatarImage.value.name}/${new Date()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, avatarImage.value);

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

        updateDoc(doc(db, 'leadway_users', uid), {
          displayImage: {
            image: downloadURL,
            path: uploadTask.snapshot.ref.fullPath
          }
        })

        loading.value = false;
        snackbarObject.show = true
        snackbarObject.message = "Avatar Successfully uploaded";
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

const autoFillAvatar = () => {
  avatarPreview.value = profileStore.profile?.displayImage?.image;
  console.log(profileStore.profile?.displayImage.image);
}

onMounted(() => {
  autoFillAvatar()
})
</script>
