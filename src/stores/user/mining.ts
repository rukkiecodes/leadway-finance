import {defineStore} from 'pinia'

export const useMiningStore = defineStore('mining', {
  state: () => ({
    mining: [
      {
        id: 0,
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1741475003/leadway/1_n84pgz.svg',
        price: 0,
        currency: 'BTC'
      },
      {
        id: 1,
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1741475003/leadway/2_cj2fsh.svg',
        price: 0,
        currency: 'LTC'
      },
      {
        id: 2,
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1741475003/leadway/3_qe7niw.svg',
        price: 0,
        currency: 'XMR'
      },
      {
        id: 3,
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1741475004/leadway/5_isq6z9.svg',
        price: 0,
        currency: 'BCH'
      },
      {
        id: 4,
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1741475003/leadway/4_e9hm8r.svg',
        price: 0,
        currency: 'DOGE'
      },
      {
        id: 5,
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1741475003/leadway/6_ocjjbc.svg',
        price: 0,
        currency: 'ETC'
      },
    ]
  }),
});
