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
  // toggled from zero to one just so hooks can have dependancy that changes
  // only updated from within store functions
  quotesModified: number;
  toggleQuoteModified: () => void;
  isInitialized: boolean;
  setIsInitialized: (initializedBool: boolean) => void;
  getRandomQuote: () => QuoteRecord;
  searchQuotes: (searchParams: SearchState) => QuoteRecord[] | undefined;
  addNewQuoteSnap: (newQuote: QuoteRecord) => void;
  deleteQuote: (quoteId: string) => void;
  updateQuote: (quoteId: string, updatedQuote: QuoteRecord) => void;
};

//! --------- Quote Search -------------------------
// type SearchState = {
//   quoteSearch?: string | undefined;
//   authorSearch?: string | undefined;
//   // could be a single tag or tags delimited by commas
//   tags?: string | undefined;
//   // could be a single rating or ratings delimited by commas
//   rating?: number;
// };
export type SearchState = {
  quoteSearch?: string | undefined;
  authorSearch?: string[] | string | undefined;
  tagSearch?: string[] | string | undefined;
  ratingSearch?: number[] | number;
};
// Need to figure out lowercase BS do we keep lowercase version in store
// or just do it inline
const searchQuotes =
  (set, get: () => Store) =>
  ({ quoteSearch, authorSearch, tagSearch, ratingSearch }: SearchState) => {
    let matchingIds: string[] = [];
    // Loop through the quotes checking each passed search criteria
    // building up a final list of quotes meeting criteria
    //! MAIN Search Loop
    for (const quoteRec of get().quotes) {
      // create bool and if undefined search text, then default to true as undefined shouldn't exclude quote
      //-- Quote Text
      const quoteBool = quoteSearch
        ? quoteRec.quote.toLowerCase().includes(quoteSearch?.toLowerCase())
        : true;
      //-- Author Text
      // Handle multiple authors passed.  SHould always be an array, but account for if it is not.
      const authorArray = Array.isArray(authorSearch)
        ? authorSearch.map((el) => el.toLowerCase())
        : authorSearch?.split(",").map((el) => el.trim().toLowerCase());

      const authorBool = authorArray
        ? authorArray?.some((el) => el === quoteRec.author.toLowerCase())
        : true;

      //-- Tag(s) filter
      // 'Motivation,'Hope'
      const tagArray = Array.isArray(tagSearch)
        ? tagSearch.map((el) => el.toLowerCase())
        : tagSearch?.split(",").map((el) => el.toLowerCase());

      const quoteTags = Array.isArray(quoteRec.tags)
        ? quoteRec.tags.map((el) => el.toLowerCase())
        : [quoteRec.tags];
      const tagBool = tagArray
        ? tagArray.some((el) => quoteTags.includes(el))
        : true;

      //-- ratingSearch
      const ratingArray = Array.isArray(ratingSearch)
        ? ratingSearch
        : ratingSearch
        ? [ratingSearch]
        : undefined;
      const ratingBool = ratingArray
        ? ratingArray.some((el) => el === quoteRec?.rating)
        : true;
      // console.log("rattingarrau", ratingArray, quoteRec?.rating?.toString());

      //-- FINAL What should we include quote in results
      if (quoteBool && authorBool && tagBool && ratingBool) {
        matchingIds.push(quoteRec.id);
      }
    }
    // if nothing matched return empty array
    if (matchingIds.length === 0) return [];
    // Get the matching quotes using the matchingIds var
    return get().quotes.filter((quoteRecord: QuoteRecord) =>
      // matchingIds.some((el) => el === quoteRecord.id)
      matchingIds.includes(quoteRecord.id)
    );
  };
//! --------- Quote Search END -------------------------
// -----
export const useStore = create<Store>((set, get) => ({
  quotes: [],
  isInitialized: false,
  quotesModified: 0,
  toggleQuoteModified: () => {
    set({ quotesModified: get().quotesModified + 1 });
  },
  setIsInitialized: (initializedBool: boolean) =>
    set({ isInitialized: initializedBool || true }),
  getRandomQuote: () =>
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
  updateQuote: (id: string, updatedQuote: QuoteRecord) => {
    const unaffectedQuotes = get().quotes.filter(
      (q: QuoteRecord) => q.id !== id
    );
    set({ quotes: [updatedQuote, ...unaffectedQuotes] });
  },
}));

export default useStore;
