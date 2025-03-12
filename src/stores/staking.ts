import {defineStore} from 'pinia'

export const useStakingStore = defineStore('staking', {
  state: () => ({
    staking: [
      {
        id: 0,
        price: 0,
        currency: 'ETH',
        marketType: "Cryptocurrency",
      }
    ]
  }),
});
