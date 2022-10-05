import { useStore } from "./../store/index";
import { SearchState } from "./../pages/searchquotes";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queries";
import type { AuthorsKeys } from "./authorKeys";
import type { QuotesKeys } from "./quotesKeys";
import { QuoteRecord } from "../types";
import _orderBy from "lodash/orderBy";

//----------------------------
//-- Quote Authors Code
//----------------------------
type AuthorsQueryKey = AuthorsKeys["_def"];

// const fetchAuthor = async (
//   ctx: QueryFunctionContext<AuthorsQueryKey, string>
// ) => {
//   const response = await fetch(`/api/quotes/get/authors`);
//   return await response.json();
// };

// Export Hook to get quotes for specific Author
type AuthorListFormat = "raw" | "select";

export function useAuthorsList(format: AuthorListFormat) {
  const quotes = useStore((state) => state.quotes);
  const authorsList = Array.from(new Set(quotes.map((el) => el.author)));
  const orderedData = _orderBy(authorsList);
  if (format === "raw") return orderedData;
  if (format === "select") {
    return orderedData.map((el: string) => ({ label: el, value: el }));
  }
}

//----------------------------
//-- Quote Tags Code
//----------------------------
type TagsQueryKey = ["taglist"];

// const fetchTags = async (ctx: QueryFunctionContext<TagsQueryKey, string>) => {
//   const response = await fetch(`/api/quotes/get/tags`);
//   return await response.json();
// };

// Export Hook to get quotes for specific Author
type TagListFormat = "raw" | "select";

export function useTagsList(format: TagListFormat) {
  // const { data } = useQuery(["taglist"], fetchTags);
  const quotes = useStore((state) => state.quotes);
  const tagsList = Array.from(new Set(quotes.map((el) => el.tags).flat()));
  const orderedData = _orderBy(tagsList);
  if (format === "raw") return orderedData;
  if (format === "select") {
    return orderedData.map((el: string) => ({ label: el, value: el }));
  }
}

//----------------------------
//-- Quote Search/Filter Code
//----------------------------
type QuotesFilterQueryKey = QuotesKeys["filter"];

// const searchQuotes = async (
// ctx: QueryFunctionContext<QuotesFilterQueryKey, SearchState>;
// ): Promise<QuoteRecord[]> => {
//   const [, , filter] = ctx.queryKey;
//   // const queryParams = buildQuery({
//   //   query: "authortext",
//   //   value: filter.authorSearch,
//   // });
//   let queryParamsBuild = [];
//   filter.authorSearch &&
//     queryParamsBuild.push(`authortext=${filter.authorSearch}`);
//   filter.quoteSearch &&
//     queryParamsBuild.push(`quotetext=${filter.quoteSearch}`);
//   filter.ratingSearch && queryParamsBuild.push(`rating=${filter.ratingSearch}`);
//   filter.tagSearch && queryParamsBuild.push(`tags=${filter.tagSearch}`);

//   const queryParams = queryParamsBuild.join("&");
//   console.log("query parms", queryParams);
//   // Take into account if NO Search parameters passed
//   const response = await fetch(`/api/quotes/search?${queryParams}`);
//   return await response.json();
// };

// export function useSearchQuotes(filter: SearchState) {
//   return useQuery(queryKeys.quotesKeys.filter(filter), searchQuotes);
// }

// function buildQuery({ query, value }: { query: string; value: any }) {}
