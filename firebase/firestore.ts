import { db, quoteCollectionName } from "./firebase";
import { setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import type { QuoteRecord } from "../types";

//------------------------------------
//-- ADD Quote to Firestore
//------------------------------------
export const addNewQuoteToFirestore = async (
  quoteData: Omit<QuoteRecord, "id">
) => {
  // generate new quote id and add to the quote data
  const newQuote: QuoteRecord = { ...quoteData, id: uuid() };

  // set date created and updated
  newQuote.createDate =
    newQuote?.createDate ??
    new Date().toLocaleDateString().replaceAll("/", "-");
  newQuote.authorBio = newQuote?.authorBio?.trim() ?? null;
  newQuote.author = newQuote?.author?.trim() ?? null;
  newQuote.tags = newQuote?.tags
    ? Array.isArray(newQuote.tags)
      ? newQuote.tags
      : newQuote.tags.split(",").map((el) => el.trim())
    : undefined;

  //add to firestore
  try {
    await setDoc(doc(db, quoteCollectionName, newQuote.id), newQuote);
  } catch (e) {
    throw new Error(`Error Saving Quote-> ${e}`);
  }
  return newQuote;
  // No return, we throw an error in the catch and expect upstream to catch the error.
};

//------------------------------------
//-- DELETE Quote from Firestore
//------------------------------------
//! NOT TESTED
export const deleteQuoteFromFirestore = async (id: string) => {
  try {
    await deleteDoc(doc(db, quoteCollectionName, id));
  } catch (e) {
    throw new Error(`Error Deleting Quote ${id}-> ${e}`);
  }
};
//! NOT TESTED
//------------------------------------
//-- UDPATE Quote in Firestore
//------------------------------------
export const updateQuoteInFirestore = async (
  id: string,
  updatedFields: Partial<QuoteRecord>
) => {
  try {
    await updateDoc(doc(db, quoteCollectionName, id), updatedFields);
  } catch (e) {
    throw new Error(`Error updating Quote ${id}-> ${e}`);
  }
};
