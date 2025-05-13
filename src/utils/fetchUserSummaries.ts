import { db } from '@/firebase'
import { collectionGroup, getDocs } from 'firebase/firestore'
import { format } from 'date-fns'

interface Trade {
  userId: string
  profitOrLossPayout: number
}

export const fetchUserSummaries = async (): Promise<{ userId: string, profit: number, loss: number }[]> => {
  const currentMonth = format(new Date(), 'yyyy-MM')
  const tradesSnapshot = await getDocs(collectionGroup(db, currentMonth))

  const summaries: Record<string, { profit: number, loss: number }> = {}

  tradesSnapshot.forEach(doc => {
    const trade = doc.data()
    const userId = doc.ref.parent.parent?.id || 'unknown'

    if (!summaries[userId]) {
      summaries[userId] = { profit: 0, loss: 0 }
    }

    if (trade.profitOrLossPayout >= 0) {
      summaries[userId].profit += trade.profitOrLossPayout
    } else {
      summaries[userId].loss += Math.abs(trade.profitOrLossPayout)
    }
  })

  return Object.entries(summaries).map(([userId, values]) => ({
    userId,
    profit: values.profit,
    loss: values.loss,
  }))
}
