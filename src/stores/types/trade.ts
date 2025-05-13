export interface Trade {
  asset?: {
    code: string
    paymentMethod: string
  }

  contract: string | 'WIN' | "LOSS"
  date: any
  profitOrLossPayout: string | number
  sendTradeHistory: boolean
  timestamp: any
  tradeStatus: string | 'WIN' | "LOSS"
  tradingAmount: string | number
}

export interface UserTrades {
  [userId: string]: Trade[]
}
