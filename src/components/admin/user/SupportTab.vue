<template>
  <v-tabs-window-item value="support">
    <v-sheet height="600" class="d-flex flex-column justify-space-between">
      <v-sheet height="550" max-height="550" class="overflow-hidden">
        <v-row>
          <v-col cols="12" v-for="(chat, index) in allMessages" :key="index"
                 :class="chat.from == 'admin' ? 'd-flex justify-end' : 'd-flex justify-start'"
          >
            <v-chip :color="chat.from == 'admin' ? 'green' : 'indigo-accent-4'" small color="white" dark outlined>
              <p v-text="chat.message"/>
            </v-chip>
          </v-col>
        </v-row>
      </v-sheet>

      <v-sheet class="d-flex justify-center align-center" width="100%">
        <v-text-field
          v-model="input"
          label="Aa..."
          hide-details
          color="indigo-accent-4"
          variant="outlined"
          density="compact"
          rounded="lg"
          append-inner-icon="mdi-send-variant-outline"
          max-width="600"
          @click:append-inner="sendMessage"
          @keyup.enter="sendMessage"
        />
      </v-sheet>
    </v-sheet>
  </v-tabs-window-item>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {defineProps} from "vue";
import {addDoc, collection, serverTimestamp, onSnapshot, query, orderBy} from "firebase/firestore";
import {db} from "@/firebase";

// Define props
const props = defineProps<{
  user: Record<string, any>;
}>();

const input = ref('')
const allMessages = ref([])

const sendMessage = async () => {
  if (input.value == "") return

  await addDoc(collection(db, 'leadway_users', props.user.uid, 'messages'), {
    message: input.value,
    from: 'admin',
    timestamp: serverTimestamp()
  })

  input.value = "";
}

const fetchChatHistory = async () => {
  const q = query(collection(db, "leadway_users", props.user?.uid, 'messages'), orderBy("timestamp", 'asc'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    allMessages.value = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  });

  return unsubscribe;
}

onMounted(() => {
  fetchChatHistory();
})
</script>
