// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import quotes from "../_quotes";
// import quotes from "../../public/data/quotes.json";
import { QuoteRecord } from "../../../types";

type Data = {
  randQuote: QuoteRecord;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const numQuotes = quotes.length;
  const randNum = Math.floor(Math.random() * numQuotes);
  res.status(200).json({ randQuote: quotes[randNum] });
}
