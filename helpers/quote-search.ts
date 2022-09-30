import { QuoteRecord } from "./../types/index";
// import quotes from "./quoteloader";
// import { getQuotes } from "../queries/getQuotes";
// import { quoteArray as fileQuotes } from "./quoteloader";

// let quotes = [];

// fileQuotes().then((data) => {
//   quotes = data;
// });

// let quotesToSearch = fileQuotes.map((quoteRecord) => ({
//   ...quoteRecord,
//   author: quoteRecord?.author.toLowerCase(),
//   quote: quoteRecord?.quote.toLowerCase(),
//   tags: Array.isArray(quoteRecord.tags)
//     ? quoteRecord.tags.map((tag) => tag.toLowerCase())
//     : quoteRecord?.tags.toLowerCase(),
// }));

// export default (async function quoteSearchBuild() {
//   const qouteData = await getQuotes();
//   //create version of quote object with lowercase for searching
//   let quotesToSearch = qouteData.map((quoteRecord) => ({
//     ...quoteRecord,
//     author: quoteRecord?.author.toLowerCase(),
//     quote: quoteRecord?.quote.toLowerCase(),
//     tags: Array.isArray(quoteRecord.tags)
//       ? quoteRecord.tags.map((tag) => tag.toLowerCase())
//       : quoteRecord?.tags.toLowerCase(),
//   }));
//   return {
//     randomQuote: () => qouteData[Math.floor(Math.random() * qouteData.length)],
//     byQuote,
//     primarySearch: ((quotesToSearch) => primarySearch)(),
//     // byRating,
//   };
// })();

//--===========================
//-- Main search object.  contains all functions
//--===========================
// export const quoteSearch = {
//   randomQuote: () => fileQuotes[Math.floor(Math.random() * fileQuotes.length)],
//   byQuote,
//   primarySearch,
//   // byRating,
// };

type PrimarySearch = {
  quoteText?: string | undefined;
  authorText?: string | undefined;
  // could be a single tag or tags delimited by commas
  tags?: string | undefined;
  // could be a single rating or ratings delimited by commas
  rating?: string | undefined;
};
/**
 * Primary Search function.  Accepts all search params
 * and returns matching.
 * Currently just using AND
 * @param param0
 * @returns
 */
export function primarySearch(
  quoteToSearch: QuoteRecord[],
  quotes: QuoteRecord[]
) {
  return function ({ quoteText, authorText, tags, rating }: PrimarySearch) {
    let matchingIds: string[] = [];
    // Loop through the quotes checking each passed search criteria
    // building up a final list of quotes meeting criteria
    //! MAIN Search Loop
    for (const quoteRec of quotesToSearch) {
      // create bool and if undefined search text, then default to true as undefined shouldn't exclude quote
      //-- Quote Text
      const quoteBool = quoteText
        ? quoteRec.quote.includes(quoteText?.toLowerCase())
        : true;
      //-- Author Text
      // Handle multiple authors passed
      const authorArray =
        authorText &&
        authorText?.split(",").map((el) => el.toLocaleLowerCase());
      const authorBool = authorArray
        ? authorArray?.some((el) => el === quoteRec.author)
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
      // if nothing matched return undefined
      if (matchingIds.length === 0) return undefined;
      // Get the matching quotes using the matchingIds var
      return quotes.filter((quoteRecord) =>
        matchingIds.some((el) => el === quoteRecord.id)
      );
    }

    // /**
    //  * Primary Search function.  Accepts all search params
    //  * and returns matching.
    //  * Currently just using AND
    //  * @param param0
    //  * @returns
    //  */
    // function primarySearchOld({ quoteText, authorText, tags, rating }: PrimarySearch) {
    //   let matchingIds: string[] = [];
    //   // Loop through the quotes checking each passed search criteria
    //   // building up a final list of quotes meeting criteria
    //   //! MAIN Search Loop
    //   for (const quoteRec of quotesToSearch) {
    //     // create bool and if undefined search text, then default to true as undefined shouldn't exclude quote
    //     //-- Quote Text
    //     const quoteBool = quoteText
    //       ? quoteRec.quote.includes(quoteText?.toLowerCase())
    //       : true;
    //     //-- Author Text
    //     // Handle multiple authors passed
    //     const authorArray =
    //       authorText && authorText?.split(",").map((el) => el.toLocaleLowerCase());
    //     const authorBool = authorArray
    //       ? authorArray?.some((el) => el === quoteRec.author)
    //       : true;

    //     //-- Tag(s) filter
    //     // 'Motivation,'Hope'
    //     const tagArray = tags && tags?.split(",").map((el) => el.toLowerCase());

    //     const quoteTags = Array.isArray(quoteRec.tags)
    //       ? quoteRec.tags
    //       : [quoteRec.tags];
    //     const tagBool = tagArray
    //       ? tagArray.some((el) =>
    //           quoteTags.map((el) => el.toLowerCase()).includes(el)
    //         )
    //       : true;

    //     //-- Rating
    //     const ratingArray = rating && rating?.split(",");

    //     const ratingBool = ratingArray
    //       ? ratingArray.some((el) => el === quoteRec?.rating?.toString())
    //       : true;

    //     //-- FINAL What should we include quote in results
    //     if (quoteBool && authorBool && tagBool && ratingBool) {
    //       matchingIds.push(quoteRec.id);
    //     }
    //   }

    // if nothing matched return undefined
    //   if (matchingIds.length === 0) return undefined;
    //   // Get the matching quotes using the matchingIds var
    //   return quotes.filter((quoteRecord) =>
    //     matchingIds.some((el) => el === quoteRecord.id)
    //   );
    // };
  };
}

export function byQuote(quotes: QuoteRecord[]) {
  // if not text sent, bail
  return function (quoteText: string): QuoteRecord[] {
    if (!quoteText) return [];
    const matchingQuotes = quotesToSearch.filter((quoteRecord) =>
      quoteRecord.quote.includes(quoteText.toLowerCase())
    );
    return quotes.filter((quoteRecord) =>
      matchingQuotes.some((el) => el.id === quoteRecord.id)
    );
  };
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
