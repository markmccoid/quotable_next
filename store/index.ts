import { initializeApp } from "firebase/app";
import { QuoteRecord } from "./../types/index";
import create from "zustand";
import { getQuotes } from "../queries/getQuotes";
import { v4 as uuid } from "uuid";
import { db, quoteCollectionName, quotesRef } from "../firebase/firebase";
import { addNewQuoteToFirestore } from "../firebase/firestore";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

type Store = {
  quotes: QuoteRecord[] | [];
  isInitialized: boolean;
  setIsInitialized: (initializedBool: boolean) => void;
  getRandomQuote: () => Promise<QuoteRecord>;
  searchQuotes: (searchParams: PrimarySearch) => QuoteRecord[] | undefined;
  addNewQuoteSnap: (newQuote: QuoteRecord) => void;
  deleteQuote: (quoteId: string) => void;
  updateQuote: (quoteId: string, updatedQuote: QuoteRecord) => void;
};

//! --------- Quote Search -------------------------
type PrimarySearch = {
  quoteText?: string | undefined;
  authorText?: string | undefined;
  // could be a single tag or tags delimited by commas
  tags?: string | undefined;
  // could be a single rating or ratings delimited by commas
  rating?: string | undefined;
};
// Need to figure out lowercase BS do we keep lowercase version in store
// or just do it inline
const searchQuotes =
  (set, get) =>
  ({ quoteText, authorText, tags, rating }: PrimarySearch) => {
    let matchingIds: string[] = [];
    // Loop through the quotes checking each passed search criteria
    // building up a final list of quotes meeting criteria
    //! MAIN Search Loop
    for (const quoteRec of get().quotes) {
      // create bool and if undefined search text, then default to true as undefined shouldn't exclude quote
      //-- Quote Text
      const quoteBool = quoteText
        ? quoteRec.quote.toLowerCase().includes(quoteText?.toLowerCase())
        : true;
      //-- Author Text
      // Handle multiple authors passed
      const authorArray =
        authorText &&
        authorText?.split(",").map((el) => el.toLocaleLowerCase());
      const authorBool = authorArray
        ? authorArray?.some((el) => el === quoteRec.author.toLowerCase())
        : true;

      //-- Tag(s) filter
      // 'Motivation,'Hope'
      const tagArray = tags && tags?.split(",").map((el) => el.toLowerCase());

      const quoteTags = Array.isArray(quoteRec.tags)
        ? quoteRec.tags
        : [quoteRec.tags];
      const tagBool = tagArray
        ? tagArray.some((el) =>
            quoteTags.map((el) => el.toLowerCase()).includes(el)
          )
        : true;

      //-- Rating
      const ratingArray = rating && rating?.split(",");

      const ratingBool = ratingArray
        ? ratingArray.some((el) => el === quoteRec?.rating?.toString())
        : true;

      //-- FINAL What should we include quote in results
      if (quoteBool && authorBool && tagBool && ratingBool) {
        matchingIds.push(quoteRec.id);
      }
    }
    // if nothing matched return undefined
    if (matchingIds.length === 0) return undefined;
    // Get the matching quotes using the matchingIds var
    return get().quotes.filter((quoteRecord) =>
      matchingIds.some((el) => el === quoteRecord.id)
    );
  };
//! --------- Quote Search END -------------------------
// -----
export const useStore = create<Store>((set, get) => ({
  quotes: [],
  isInitialized: false,
  setIsInitialized: (initializedBool: boolean) =>
    set({ isInitialized: initializedBool || true }),
  getRandomQuote: async () =>
    get().quotes[Math.floor(Math.random() * get().quotes.length)],

  searchQuotes: searchQuotes(set, get),
  addNewQuoteSnap: (newQuote) => {
    // Insert quote to firestore.  Return the full quote with newly assigned id
    // const quoteWithId = await addNewQuoteToFirestore(newQuote);
    // add new quote to the store.quotes array
    set({ quotes: [...get().quotes, newQuote] });
    // No return, the firestore add will throw an error if there is a problem
  },
  deleteQuote: (id: string) => {
    set({ quotes: get().quotes.filter((q: QuoteRecord) => q.id !== id) });
  },
  updateQuote() {
    //set();
  },
}));

export default useStore;
