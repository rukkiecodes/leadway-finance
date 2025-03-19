import {defineStore} from 'pinia'

export const useHoldingStore = defineStore('holding', {
  state: () => ({
    holding: [
      {
        id: 0,
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1741475003/leadway/1_n84pgz.svg',
        price: 0,
        currency: 'BTC',
        currencyName: 'Bitcoin',
        marketType: "Cryptocurrency",
      },
      {
        id: 1,
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1741483486/leadway/XTVCETH--big_q2ybs0.svg',
        price: 0,
        currency: 'ETH',
        currencyName: 'Ethereum',
        marketType: "Cryptocurrency",
      },
      {
        id: 2,
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1741483485/leadway/apple--big_uakh7h.svg',
        price: 0,
        currency: 'AAPL',
        currencyName: 'Apple',
        marketType: "Stock",
      },
      {
        id: 3,
        image: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1741483485/leadway/microsoft--big_aarinc.svg',
        price: 0,
        currency: 'MSFT',
        currencyName: 'Microsoft',
        marketType: "Stock",
      },
    ]
  }),
});
