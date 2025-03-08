import {defineStore} from 'pinia'

export const usePlansStore = defineStore('plans', {
  state: () => ({
    plans: [
      {
        use: 'Trading',
        prices: [
          {
            rank: 'Bronze',
            price: 1000,
            _price: '$1,000.00',
            perks: [
              {title: '200+ Pairs', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Leverage up to 1:500', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Spreads from 1.2 pips', props: {appendIcon: 'mdi-check-circle'}}
            ]
          },
          {
            rank: 'Silver',
            price: 5000,
            _price: '$5,000.00',
            perks: [
              {title: '300+ Pairs', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Leverage up to 1:500', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Spreads from 0.8 pips', props: {appendIcon: 'mdi-check-circle'}}
            ]
          },
          {
            rank: 'Gold',
            price: 10000,
            _price: '$10,000.00',
            perks: [
              {title: '400+ Pairs', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'No Swap Fees', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Leverage up to 1:500', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Spreads from 0.8 pips', props: {appendIcon: 'mdi-check-circle'}}
            ]
          },
          {
            rank: 'Premium',
            price: 20000,
            _price: '$20,000.00',
            perks: [
              {title: '500+ Pairs', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'No Swap Fees', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Leverage up to 1:500', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Spreads from 0.8 pips', props: {appendIcon: 'mdi-check-circle'}}
            ]
          },
        ]
      },

      {
        use: 'Signals',
        prices: [
          {
            rank: 'Gold',
            price: 4000,
            _price: '$4,000.00',
            perks: [
              {title: '+25% Signal Strength', props: {appendIcon: 'mdi-check-circle'}},
            ]
          },
          {
            rank: 'Silver',
            price: 2000,
            _price: '$2,000.00',
            perks: [
              {title: '+15% Signal Strength', props: {appendIcon: 'mdi-check-circle'}},
            ]
          },
          {
            rank: 'Bronze',
            price: 1000,
            _price: '$1,000.00',
            perks: [
              {title: '+5% Signal Strength', props: {appendIcon: 'mdi-check-circle'}},
            ]
          },
        ]
      },

      {
        use: 'Mining',
        prices: [
          {
            rank: 'Bronze',
            price: 250,
            _price: '$250.00',
            perks: [
              {title: '100 TH/s', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'No Downtime', props: {appendIcon: 'mdi-check-circle'}},
              {title: '~ 1 Antminer S19', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Duration: One month', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'No Electricity Costs', props: {appendIcon: 'mdi-check-circle'}},
            ]
          },
          {
            rank: 'Silver',
            price: 600,
            _price: '$600.00',
            perks: [
              {title: '250 TH/s', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'No Downtime', props: {appendIcon: 'mdi-check-circle'}},
              {title: '~ 2.5 Antminer S19', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Duration: One month', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'No Electricity Costs', props: {appendIcon: 'mdi-check-circle'}},
            ]
          },
          {
            rank: 'Bronze',
            price: 1000,
            _price: '$1,000.00',
            perks: [
              {title: '1000 TH/s', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'No Downtime', props: {appendIcon: 'mdi-check-circle'}},
              {title: '~ 10 Antminer S19', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'Duration: One month', props: {appendIcon: 'mdi-check-circle'}},
              {title: 'No Electricity Costs', props: {appendIcon: 'mdi-check-circle'}},
            ]
          },
        ]
      },

      {
        use: 'Staking',
        prices: [
          {
            rank: 'Staking Plans',
            price: 250,
            _price: '$250.00',
            perks: [
              {title: '30 Days - 5% Return', props: {appendIcon: 'mdi-check-circle'}},
              {title: '60 Days - 10% Return', props: {appendIcon: 'mdi-check-circle'}},
              {title: '90 Days - 15% Return', props: {appendIcon: 'mdi-check-circle'}},
              {title: '180 Days - 20% Return', props: {appendIcon: 'mdi-check-circle'}},
              {title: '360 Days - 25% Return', props: {appendIcon: 'mdi-check-circle'}},
            ]
          }
        ]
      },
    ]
  }),
});
