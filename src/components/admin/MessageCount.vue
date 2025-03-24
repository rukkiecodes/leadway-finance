<template>
  <span class="text-caption text-sm-body-2 text-caption">{{ count }} Messages</span>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref} from "vue";
import {db} from '@/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

const props = defineProps<{
  user: string;
}>();

const count = ref(0)


const countMessages = async () => {
  const q = query(collection(db, "leadway_users", props.user, 'messages'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    count.value = querySnapshot.docs.length;
  });
}

onMounted(() => {
  countMessages()
})
</script>
