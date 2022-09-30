import { QuoteRecord } from "./../types/index";
import create from "zustand";
import { getQuotes } from "../queries/getQuotes";
import { v4 as uuid } from "uuid";
import { quotesRef } from "../queries/firebase";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

type Store = {
  quotes: QuoteRecord[] | [];
  isInitialized: boolean;
  getRandomQuote: () => Promise<QuoteRecord>;
  initQuotes: () => void;
  searchQuotes: (searchParams: PrimarySearch) => QuoteRecord[] | undefined;
  addNewQuote: (newQuote: QuoteRecord) => Promise<string | undefined>;
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
  getRandomQuote: async () =>
    get().quotes[Math.floor(Math.random() * get().quotes.length)],
  initQuotes: async () => {
    const quotes = await getQuotes();
    set({ quotes, isInitialized: true });
  },
  searchQuotes: searchQuotes(set, get),
  addNewQuote: async (newQuote) => {
    console.log("Add Quote", newQuote);
    // generate new quote id
    newQuote.id = uuid();

    // set date created and updated
    newQuote.createDate = new Date().toLocaleDateString().replaceAll("/", "-");
    newQuote.authorBio = newQuote.authorBio.trim();
    newQuote.author = newQuote.author.trim();
    newQuote.tags = Array.isArray(newQuote.tags)
      ? newQuote.tags
      : newQuote.tags.split(",").map((el) => el.trim());

    //add to firestore
    const docRef = await addDoc(quotesRef, newQuote);

    return docRef.id;
  },
  deleteQuote(id) {},
  updateQuote() {
    //set();
  },
}));

export default useStore;
