import { db } from "@/firebase";
import {doc, getDoc} from "firebase/firestore";

export const userName = async (id: string) => {
  const user = await getDoc(doc(db, 'leadway_users', id))

  return `${user.data().firstName} ${user.data().lastName}`
}
