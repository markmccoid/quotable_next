import { quotes } from "./../../../helpers/quoteloader";
import { quoteSearch } from "../../../helpers/quote-search";
import type { NextApiRequest, NextApiResponse } from "next";
import type { QuoteRecord } from "../../../types";

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse<{ matchingQuotes: QuoteRecord[] }>
) {
  const { quotetext, authortext } = req.query;
  console.log("authortext", Array.isArray(authortext));
  // const matchingQuotes = quoteSearch.byQuote(quotetext as string);
  const matchingQuotes2 = quoteSearch.primarySearch({
    quoteText: Array.isArray(quotetext) ? quotetext[0] : quotetext,
    authorText: Array.isArray(authortext) ? authortext[0] : authortext,
  });
  return res.status(200).json({ matchingQuotes: matchingQuotes2 });
}
