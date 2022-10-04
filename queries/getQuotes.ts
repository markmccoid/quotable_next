import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { quotesRef, db } from "../firebase/firebase";

export const getQuotes = async () => {
  let quotesArray = [];
  const { docs } = await getDocs(quotesRef);

  docs.forEach((doc) => {
    quotesArray.push({ ...doc.data(), id: doc.id });
  });
  return quotesArray;
};
