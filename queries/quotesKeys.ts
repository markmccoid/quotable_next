import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";
import { SearchState } from "../pages/searchquotes";

export const quotesKeys = createQueryKeys("quotesKeys", {
  filter: (filters: SearchState) => filters,
  getQuote: (quoteId: string) => quoteId,
});

export type QuotesKeys = inferQueryKeys<typeof quotesKeys>;
