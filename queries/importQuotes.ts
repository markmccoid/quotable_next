import { QuoteRecord } from "./../types/index";
import quotesData from "../data/quotes.json";
import { addNewQuoteToFirestore } from "../firebase/firestore";

export const importData = async () => {
  const quotes: Partial<QuoteRecord>[] = quotesData;
  // Loop through the data, removing the id and adding it to the firestore database.
  for (const quote of quotes) {
    delete quote.id;
    await addNewQuoteToFirestore(quote as Omit<QuoteRecord, "id">);
  }
};
