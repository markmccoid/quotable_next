// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// import quotes from "../../public/data/quotes.json";
import { QuoteRecord } from "../../../types";
import { quoteSearch } from "../../../helpers/quote-search";

type Data = {
  randQuote: QuoteRecord;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ randQuote: quoteSearch.randomQuote() });
}
