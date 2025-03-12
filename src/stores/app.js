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
    rightDrawer: false,
  }),
})
