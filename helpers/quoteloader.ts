import { QuoteRecord } from "../types";
import { getQuotes } from "../queries/getQuotes";
import { primarySearch, byQuote } from "./quote-search";
import { fbQuoteObj } from "../firebase/firebase";

export let quoteSearch = {};
export const initializeQuotes = async () => {
  const data = await getQuotes();
  // lowercase quotes to search on
  let quotesToSearch = data.map((quoteRecord) => ({
    ...quoteRecord,
    author: quoteRecord?.author.toLowerCase(),
    quote: quoteRecord?.quote.toLowerCase(),
    tags: Array.isArray(quoteRecord.tags)
      ? quoteRecord.tags.map((tag) => tag.toLowerCase())
      : quoteRecord?.tags.toLowerCase(),
  }));

  const quoteSearchInternal = {
    randomQuote: () => data[Math.floor(Math.random() * data.length)],
    byQuote: byQuote(data),
    primarySearch: primarySearch(quotesToSearch, data),
    // byRating,
  };

  // quoteSearch.randomQuote = quoteSearchInternal.randomQuote;
  // quoteSearch.byQuote = quoteSearchInternal.byQuote;
  // quoteSearch.primarySearch = quoteSearchInternal.primarySearch;
  Object.assign(quoteSearch, quoteSearchInternal);
  console.log("Data from quoteloader", data);
};

console.log("quoteloader", fbQuoteObj);
// console.log("intial data quoteloader", quoteArray);
// getQuotes().then((data) => {
//   console.log("data", data);
//   quoteArray = data;
// });
// console.log("quoteArray", quoteArray);
//export const quotes: QuoteRecord[] = quoteArray;
// let quotes = await (async () => {
//   const data = await getQuotes();
//   return data;
// })()
// export default quotes;
