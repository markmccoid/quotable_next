import { quotesDB } from "../../../helpers/quote-readwrite";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function updateQuote(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const { updatedQuote } = req.body;

  quotesDB.updateQuote(updatedQuote);
  return res.status(200).json({});
}
