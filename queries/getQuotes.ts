import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const getQuotes = async () => {
  // init services
  const db = getFirestore();

  // get Collection
  const quotesRef = collection(db, "qoutes");

  // get collection data
  let quotesArray = [];
  const { docs } = await getDocs(quotesRef);

  docs.forEach((doc) => {
    quotesArray.push({ ...doc.data(), id: doc.id });
  });
  return quotesArray;
};
