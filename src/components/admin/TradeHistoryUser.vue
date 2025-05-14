<template>
  <div class="d-flex justify-start align-center ga-5">
    <v-avatar v-if="profile?.displayImage" :image="profile?.displayImage?.image" />
    <v-avatar v-else image="@/assets/images/avatar.png" />
    <p class="text-caption text--sm-body-2">{{ profile?.firstName }} {{ profile?.lastName }}</p>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref} from "vue";
import {getDoc, doc} from 'firebase/firestore'
import {db} from '@/firebase'

// Define props
const props = defineProps<{
  user: string;
}>();

const profile = ref(null)

const fetchUsersProfile = async () => {
  const _profile = (await getDoc(doc(db, 'leadway_users', props.user))).data();

  profile.value = _profile;
}

onMounted(() => {
  fetchUsersProfile()
})
</script>
