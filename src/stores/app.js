// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    snackbarObject: {
      show: false,
      message: '',
      color: ''
    },
    drawer: true,
    rightDrawer: true,
    bottomDrawer: false,
    switchAccount: false
  }),

  actions: {
    async setSwitchAccount() {
      if (this.switchAccount) {
        // Wait for 5 seconds
        await new Promise(resolve => setTimeout(resolve, 1500));
        return true; // Return true after 5 seconds
      } else {
        return false; // Return false if switchAccount is not true
      }
    }
  }
});
