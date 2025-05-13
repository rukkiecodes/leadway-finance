import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { Timestamp } from "firebase/firestore"
import { format } from "date-fns"

type Trade = {
  createdAt: Timestamp
  // ...other trade fields
}

export const getTradesGroupedByMonth = async () => {
  const snapshot = await getDocs(collection(db, "feature_trades"))

  const grouped: Record<string, Trade[]> = {}

  snapshot.forEach(doc => {
    const data = doc.data() as Trade
    const date = data.createdAt.toDate()
    const monthKey = format(date, "yyyy-MM") // or "MMMM yyyy" e.g., "March 2025"

    if (!grouped[monthKey]) {
      grouped[monthKey] = []
    }

    grouped[monthKey].push({ ...data })
  })

  return grouped
}
