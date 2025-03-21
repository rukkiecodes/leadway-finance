import { defineStore } from 'pinia';

export const usePlansStore = defineStore('plans', {
  state: () => ({
    plans: [
      {
        use: 'trading',
        price: 10000,
        perks: [
          { title: '400+ Pairs', props: { appendIcon: 'mdi-check-circle' } },
          { title: 'Leverage up to 1:500', props: { appendIcon: 'mdi-check-circle' } },
          { title: 'Spreads from 0.8 pips', props: { appendIcon: 'mdi-check-circle' } }
        ]
      },
      {
        use: 'signals',
        price: 2000,
        perks: [
          { title: '+15% Signal Strength', props: { appendIcon: 'mdi-check-circle' } }
        ]
      },
      {
        use: 'mining',
        price: 250,
        perks: [
          { title: '100 TH/s', props: { appendIcon: 'mdi-check-circle' } },
          { title: 'Duration: One month', props: { appendIcon: 'mdi-check-circle' } },
          { title: 'No Electricity Costs', props: { appendIcon: 'mdi-check-circle' } }
        ]
      },
      {
        use: 'staking',
        price: 250,
        perks: [
          { title: '30 Days - 5% Return', props: { appendIcon: 'mdi-check-circle' } }
        ]
      }
    ]
  })
});
