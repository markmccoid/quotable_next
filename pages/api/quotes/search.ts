import { quotes } from "./../../../helpers/quoteloader";
import { quoteSearch } from "../../../helpers/quote-search";
import type { NextApiRequest, NextApiResponse } from "next";
import type { QuoteRecord } from "../../../types";

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse<QuoteRecord[]>
) {
  const { quotetext, authortext, tags, rating } = req.query;

  // Call search function with passed values
  const matchingQuotes = quoteSearch.primarySearch({
    quoteText: Array.isArray(quotetext) ? quotetext[0] : quotetext,
    authorText: Array.isArray(authortext) ? authortext[0] : authortext,
    tags: Array.isArray(tags) ? tags.join(",") : tags,
    rating: Array.isArray(rating) ? rating.join(",") : rating?.toString(),
  });
  return res.status(200).json(matchingQuotes);
}
