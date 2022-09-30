import { quotesDB } from "../../../helpers/quote-readwrite";
import type { NextApiRequest, NextApiResponse } from "next";
import type { QuoteRecord } from "../../../types";

export default async function addQuote(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const { newQuote }: { newQuote: QuoteRecord } = req.body;
  quotesDB.addNewQuote(newQuote);
  return res.status(200).json({});
}
