import { QuoteRecord } from "./../types/index";
import { useEffect } from "react";
import { quotesRef } from "./firebase";
import { onSnapshot } from "firebase/firestore";
import useStore from "../store";
import shallow from "zustand/shallow";

export const useFirebase = () => {
  const [addNewQuoteSnap, deleteQuote, toggleQuoteModified] = useStore(
    (state) => [
      state.addNewQuoteSnap,
      state.deleteQuote,
      state.toggleQuoteModified,
    ],
    shallow
  );

  const setIsInitialized = useStore((state) => state.setIsInitialized);
  const quotesNum = useStore((state) => state.quotes.length);

  useEffect(() => {
    console.log("in Firebase Initialize", quotesNum);
    const unsubscribe = onSnapshot(quotesRef, (snapshot) => {
      console.log("snapchanges", snapshot.docChanges().length);
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // Update store with new quote that was added to firestore
          addNewQuoteSnap(change.doc.data() as QuoteRecord);
          // Update quoteModified identifier so other components can react if needed.
          toggleQuoteModified();
        }
        if (change.type === "modified") {
          console.log("Modified: ", change.doc.data());
        }
        if (change.type === "removed") {
          // remove quote from store as it was removed from firestore
          deleteQuote(change.doc.data().id);
          // Update quoteModified identifier so other components can react if needed.
          toggleQuoteModified();
        }
      });
      setIsInitialized(true);
    });

    return unsubscribe;
  }, []);

  // return app;
};
