import { QuoteRecord } from "./../types/index";
import { useEffect } from "react";
import { quotesRef } from "./firebase";
import { onSnapshot } from "firebase/firestore";
import useStore from "../store";
import shallow from "zustand/shallow";

export const useFirebase = () => {
  const [addNewQuoteSnap, deleteQuote, updateQuote, toggleQuoteModified] =
    useStore(
      (state) => [
        state.addNewQuoteSnap,
        state.deleteQuote,
        state.updateQuote,
        state.toggleQuoteModified,
      ],
      shallow
    );

  const setIsInitialized = useStore((state) => state.setIsInitialized);

  //-- Subscribe to the firebase snapshot.
  //-- This will fire every time a change happens on the backend
  //-- basedo on what happened, this code will update the local store.
  useEffect(() => {
    const unsubscribe = onSnapshot(quotesRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // Update store with new quote that was added to firestore
          addNewQuoteSnap(change.doc.data() as QuoteRecord);
          // Update quoteModified identifier so other components can react if needed.
          toggleQuoteModified();
        }
        if (change.type === "modified") {
          updateQuote(change.doc.data().id, change.doc.data() as QuoteRecord);
          toggleQuoteModified();
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
