<template>
  <v-img
    cover
    height="450"
    src="@/assets/images/net.png"
    gradient="to top right, rgba(34, 49, 34, 0.3), rgba(10, 25, 10, 0.6)"
  >
    <v-container class="d-flex justify-start align-center" style="height: 100%">
      <h1 class="text-h5 text-sm-h4 text-md-h3 text-lg-h2 font-weight-light">
        OUR <br>
        CONTACT
      </h1>
    </v-container>
  </v-img>

  <v-container class="mt-10">
    <v-row>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12">
            <v-card max-width="600" rounded="xl" :loading="loading" :disabled="loading">
              <v-card-text>
                <p class="text-body-1 text-sm-h6 font-weight-bold">SEND MESSAGE</p>
                <p class="text-body-2 text-sm-body-1 opacity-60">Send us a message and we will reply to you within 24
                  hours!</p>
              </v-card-text>

              <v-card-text>
                <v-text-field
                  rounded="lg"
                  label="Subject"
                  v-model="subject"
                  variant="outlined"
                  color="indigo-accent-4"
                />

                <v-text-field
                  label="Email"
                  rounded="lg"
                  v-model="email"
                  variant="outlined"
                  color="indigo-accent-4"
                />

                <v-textarea
                  rounded="lg"
                  label="Message"
                  v-model="message"
                  variant="outlined"
                  color="indigo-accent-4"
                />
              </v-card-text>

              <v-card-actions>
                <v-spacer/>

                <v-btn
                  rounded="pill"
                  :loading="loading"
                  :disabled="loading"
                  @click="sendMessage"
                  class="bg-indigo-accent-4 px-10"
                >Send
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26359832.84284904!2d-113.72795382611159!3d36.245492871409056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2snl!4v1639738515182!5m2!1sen!2snl"
          width="100%"
          height="400"
          style="border:0;"
          allowfullscreen
          loading="lazy"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {db} from '@/firebase'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import {ref} from "vue";
import {useAppStore} from '@/stores/app'
import {storeToRefs} from 'pinia'

const appStore = useAppStore()
const {snackbarObject} = storeToRefs(appStore)

const loading = ref(false)
const subject = ref('')
const email = ref('')
const message = ref('')

const sendMessage = async () => {
  if (!subject.value || !email.value || !message.value) return

  loading.value = true
  await addDoc(collection(db, 'leadway_anonymous_messages'), {
    subject: subject.value,
    message: message.value,
    email: email.value,
    timestamp: serverTimestamp()
  })

  loading.value = false
  snackbarObject.value.show = true
  snackbarObject.value.message = 'Message send successfully.'
  snackbarObject.value.color = 'green'
}
</script>
