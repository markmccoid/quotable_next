import quotes from "../../data/quotes.json";
import { QuoteRecord } from "../../types";

type AuthorName = string;
type QuoteIds = string[];

type AuthorQuotes = Record<AuthorName, QuoteIds>;
//-------------------------------------------------------
//-- Export the authorMap
//-- This map holds all of the authors as keys and the ids of
//-- their quotes as the value
export const authorMap = new Map<AuthorName, QuoteIds>();
// loop through quotes and assign author as key
quotes.forEach((quote) => {
  let quoteIds: string[] = [];
  if (authorMap.has(quote.author)) {
    quoteIds = authorMap.get(quote.author) || [];
  }
  authorMap.set(quote.author, [...quoteIds, quote.id]);
});
//-------------------------------------------------------

// Export the quotes array
export default quotes as QuoteRecord[];
