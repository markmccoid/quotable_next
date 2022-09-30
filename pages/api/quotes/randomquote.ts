import { store } from "./../../../store/index";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// import quotes from "../../public/data/quotes.json";
import { QuoteRecord } from "../../../types";
// import { quoteSearch } from "../../../helpers/quote-search";
// import { quoteSearch } from "../../../helpers/quoteloader";

// quoteSearch.then((data) => console.log(data.randomQuote()));

type Data = {
  randQuote: QuoteRecord;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let quotes = [];
  store.subscribe((state) => {
    console.log("state change", state.quotes);
    quotes = state.quotes;
  });
  console.log("store", store.getState().quotes);
  console.log("store quotes", quotes);
  // const randQuote = quoteSearch?.randomQuote();
  const randQuote = {};
  res.status(200).json({ randQuote });
  // res.status(200).json({ randQuote });
  // res.status(200).json({ randQuote: quoteSearch.randomQuote() });
}
