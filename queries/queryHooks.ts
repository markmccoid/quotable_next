import { SearchState } from "./../pages/searchquotes";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queries";
import type { AuthorsKeys } from "./authorKeys";
import type { QuotesKeys } from "./quotesKeys";

type AuthorsQueryKey = AuthorsKeys["authorQuotes"];

const fetchAuthor = async (
  ctx: QueryFunctionContext<AuthorsQueryKey, string>
) => {
  console.log("query key", ctx.queryKey);
  const [, , authorName] = ctx.queryKey; // readonly ['todos', 'list', { filters }]

  console.log("authorname", authorName);
  const response = await fetch(`/api/quotes/search?authortext=${authorName}`);
  return await response.json();
};

// Export Hook to get quotes for specific Author
export function useAuthorsQuotes(authorName: string) {
  return useQuery(queryKeys.authors.authorQuotes(authorName), fetchAuthor);
}

//----------------------------
//-- Quote Search/Filter Code
//----------------------------
type QuotesFilterQueryKey = QuotesKeys["filter"];

const filterQuotes = async (
  ctx: QueryFunctionContext<QuotesFilterQueryKey, SearchState>
) => {
  const [, , filter] = ctx.queryKey;
  // const queryParams = buildQuery({
  //   query: "authortext",
  //   value: filter.authorSearch,
  // });
  let queryParamsBuild = [];
  filter.authorSearch &&
    queryParamsBuild.push(`authortext=${filter.authorSearch}`);
  filter.quoteSearch &&
    queryParamsBuild.push(`authortext=${filter.quoteSearch}`);
  filter.ratingSearch &&
    queryParamsBuild.push(`authortext=${filter.ratingSearch}`);
  filter.tagSearch && queryParamsBuild.push(`authortext=${filter.tagSearch}`);

  const queryParams = queryParamsBuild.join("&");
  console.log("query parms", queryParams);
  // Take into account if NO Search parameters passed
  const response = await fetch(`/api/quotes/search?${queryParams}`);
  return await response.json();
};

export function useFilterQuotes(filter: SearchState) {
  return useQuery(queryKeys.quotesKeys.filter(filter), filterQuotes);
}

function buildQuery({ query, value }: { query: string; value: any }) {}
