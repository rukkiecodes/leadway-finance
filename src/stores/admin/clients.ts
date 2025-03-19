import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [],
    verifiedAccounts: [],
    disabledAccounts: [],
  }),

  actions: {
    async fetchClients() {
      try {
        const querySnapshot = await getDocs(collection(db, 'leadway_users'));
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });

        // Categorize users
        this.clients = users;
        this.verifiedAccounts = users.filter(user => user.verified === 'verified');
        this.disabledAccounts = users.filter(user => user.disabled === 'disabled');
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },
  },
});
