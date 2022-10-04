import { QuoteRecord } from "./../types/index";
// import './firebase';
import { useEffect, useState } from "react";
import { db, quotesRef } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import useStore from "../store";

export const useFirebase = () => {
  const addNewQuoteSnap = useStore((state) => state.addNewQuoteSnap);
  const setIsInitialized = useStore((state) => state.setIsInitialized);
  // const [status, setStatus] = useState("loading");
  useEffect(() => {
    const unsubscribe = onSnapshot(quotesRef, (snapshot) => {
      // console.log("snapchanges", snapshot.docChanges().length);
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // console.log("added: ", change.doc.data());
          addNewQuoteSnap(change.doc.data() as QuoteRecord);
        }
        if (change.type === "modified") {
          console.log("Modified: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed : ", change.doc.data());
        }
      });
      setIsInitialized(true);
    });

    return unsubscribe;
  }, []);

  // return status;
};
