// Utilities
import { defineStore } from 'pinia'
import { db, auth } from '@/firebase' // Ensure correct import
import { doc, onSnapshot } from 'firebase/firestore'

// Define store
export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    loading: false,
  }),

  actions: {
    async fetchUserProfile() {
      const {uid} = auth.currentUser

      this.loading = true;

      try {
        const userDocRef = doc(db, "leadway_users", uid);

        // 🔥 **Real-time listener**
        onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            this.profile = docSnap.data();
          } else {
            console.warn("User profile not found!");
          }
        });
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
