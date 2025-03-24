<template>
  <v-container style="height: 80vh">
    <v-sheet
      width="600"
      max-width="100%"
      height="80vh"
      class="mx-auto flex-column justify-end mb-16"
      position="fixed"
      location="bottom center"
      color="transparent"
    >
      <v-sheet
        class="d-flex align-end pa-5 overflow-hidden"
        height="100%"
        color="transparent"
      >
        <v-sheet class="pa-0 overflow-y-auto overflow-x-hidden chatPage" style="max-height: 100%" color="transparent">
          <v-row>
            <v-col
              cols="12"
              v-for="notification in notifications"
              :key="notification.id"
              :class="notification?.from == 'admin' ? 'd-flex justify-start' : 'd-flex justify-end'"
            >
              <v-sheet color="transparent">
                <v-sheet
                  color="transparent"
                  :class="notification?.from == 'admin' ? 'd-flex justify-start' : 'd-flex justify-end'"
                >
                  <v-chip>
                  <span class="text-body-2 text-sm-body-1">
                    {{ notification.message }}
                  </span>
                  </v-chip>
                </v-sheet>

                <v-sheet
                  width="100%"
                  color="transparent"
                  :class="notification?.from == 'admin' ? 'd-flex justify-start' : 'd-flex justify-end'"
                >
                <span class="text-caption opacity-70">{{
                    new Date(notification?.timestamp?.seconds * 1000).toDateString()
                  }}</span>
                </v-sheet>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-sheet>

      <v-sheet
        class="px-5 d-flex align-center ga-5"
        color="transparent"
      >
        <v-text-field
          v-model="input"
          variant="outlined"
          hide-details
          density="compact"
          label="Aa..."
          rounded="lg"
          color="indigo-accent-4"
          @keyup.enter="sendMessage"
        />

        <v-btn
          icon
          color="indigo-accent-4"
          @click="sendMessage"
        >
          <v-icon size="20">mdi-send-variant-outline</v-icon>
        </v-btn>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>


<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {db, auth} from '@/firebase'
import {collection, query, onSnapshot, orderBy, addDoc, serverTimestamp} from 'firebase/firestore'

const notifications = ref([])
const input = ref('')

onMounted(() => {
  fetchNotifications()
})

const fetchNotifications = async () => {
  const q = query(collection(db, "leadway_users", auth.currentUser.uid, 'messages'), orderBy('timestamp', 'asc'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    notifications.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  });
  return unsubscribe;
}

const sendMessage = async () => {
  if (input.value == "") return

  await addDoc(collection(db, 'leadway_users', auth.currentUser.uid, 'messages'), {
    message: input.value,
    from: auth.currentUser.uid,
    timestamp: serverTimestamp()
  })

  input.value = "";
}
</script>

<style scoped lang="scss">
.chatPage::-webkit-scrollbar {
  display: none;
  scrollbar-width: none
}
</style>
