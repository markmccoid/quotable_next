import { QuoteRecord } from "./../types/index";
import { quotes as fileQuotes } from "./quoteloader";

let quotes = fileQuotes;
//create version of quote object with lowercase for searching
let quotesToSearch = quotes.map((quoteRecord) => ({
  ...quoteRecord,
  author: quoteRecord?.author.toLowerCase(),
  quote: quoteRecord?.quote.toLowerCase(),
  tags: Array.isArray(quoteRecord.tags)
    ? quoteRecord.tags.map((tag) => tag.toLowerCase())
    : quoteRecord?.tags.toLowerCase(),
}));

//--===========================
//-- Main search object.  contains all functions
//--===========================
export const quoteSearch = {
  randomQuote: () => quotes[Math.floor(Math.random() * quotes.length)],
  byQuote,
  primarySearch,
  // byRating,
};

type PrimarySearch = {
  quoteText?: string | undefined;
  authorText?: string | undefined;
  rating?: number | undefined;
};

/**
 * Primary Search function.  Accepts all search params
 * and returns matching.
 * Currently just using AND
 * @param param0
 * @returns
 */
function primarySearch({ quoteText, authorText, rating }: PrimarySearch) {
  let matchingIds: string[] = [];
  // Loop through the quotes checking each passed search criteria
  // building up a final list of quotes meeting criteria
  for (const quoteRec of quotesToSearch) {
    // create bool and if undefined search text, then default to true as undefined shouldn't exclude quote
    const quoteBool = quoteText
      ? quoteRec.quote.includes(quoteText?.toLowerCase())
      : true;
    const authorBool = authorText
      ? quoteRec.author.includes(authorText?.toLowerCase())
      : true;

    // Should we include quote in results
    if (quoteBool && authorBool) {
      matchingIds.push(quoteRec.id);
    }
  }

  // Get the matching quotes using the matchingIds var
  return quotes.filter((quoteRecord) =>
    matchingIds.some((el) => el === quoteRecord.id)
  );
}

/**
 * Search "byQuote"
 * @param quoteText
 * @returns
 */
function byQuote(quoteText: string): QuoteRecord[] {
  // if not text sent, bail
  if (!quoteText) return [];
  const matchingQuotes = quotesToSearch.filter((quoteRecord) =>
    quoteRecord.quote.includes(quoteText.toLowerCase())
  );
  return quotes.filter((quoteRecord) =>
    matchingQuotes.some((el) => el.id === quoteRecord.id)
  );
}
/**
 * Search "byAuthor"
 * @param authorText
 * @returns
 */
function byAuthor(authorText: string): QuoteRecord[] {
  // if not text sent, bail
  if (!authorText) return [];
  const matchingQuotes = quotesToSearch.filter((quoteRecord) =>
    quoteRecord.author.includes(authorText.toLowerCase())
  );
  return quotes.filter((quoteRecord) =>
    matchingQuotes.some((el) => el.id === quoteRecord.id)
  );
}
