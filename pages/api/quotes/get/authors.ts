import { quotesDB } from "../../../../helpers/quote-readwrite";
import type { NextApiRequest, NextApiResponse } from "next";
import type { QuoteRecord } from "../../../../types";

export default async function authors(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  return res.status(200).json(quotesDB.authorsList);
}
