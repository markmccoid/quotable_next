import { quotesDB } from "../../../helpers/quote-readwrite";
import type { NextApiRequest, NextApiResponse } from "next";
import type { QuoteRecord } from "../../../types";

export default async function updateQuote(
  req: NextApiRequest,
  res: NextApiResponse<QuoteRecord | {}>
) {
  const { quoteId } = req.query;

  const quote = quotesDB.getById(quoteId as string);

  return res.status(200).json(quote || {});
}
