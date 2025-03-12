import {defineStore} from 'pinia'

export const useCopyTradeStore = defineStore('copyTrade', {
  state: () => ({
    copyTraders: []
  }),
});
