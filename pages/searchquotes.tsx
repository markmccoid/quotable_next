import React, { useReducer } from "react";
import SearchQuoteComponents from "../components/viewQuotes/SearchQuoteComponents";
import SearchQuoteResults from "../components/viewQuotes/SearchQuoteResults";
import { useSearchQuotes } from "../queries/queryHooks";

export type SearchState = {
  quoteSearch?: string | undefined;
  ratingSearch?: number;
  authorSearch?: string[] | undefined;
  tagSearch?: string[] | undefined;
};
export type Actions =
  | { type: "quote"; payload: string | undefined }
  | { type: "author"; payload: string[] | undefined }
  | { type: "tag"; payload: string[] | undefined }
  | { type: "rating"; payload: number };

const initialState: SearchState = {
  quoteSearch: undefined,
  ratingSearch: 0,
  authorSearch: undefined,
  tagSearch: undefined,
};

const reducer = (state: SearchState, action: Actions) => {
  switch (action.type) {
    case "quote":
      return { ...state, quoteSearch: action.payload };
      break;
    case "author":
      return { ...state, authorSearch: action.payload };
      break;
    case "tag":
      return { ...state, tagSearch: action.payload };
      break;
    case "rating":
      return { ...state, ratingSearch: action.payload };
      break;
    default:
      return state;
  }
};
const Searchquotes = () => {
  const [searchState, dispatch] = useReducer(reducer, initialState);
  const { data } = useSearchQuotes(searchState);
  return (
    <div className="flex flex-col min-h-screen py-2 bg-indigo-50">
      <div
        className="bg-indigo-300 mt-8 mx-4 md:w-[90%] lg:w-[75%] xl:w-[60%] border border-indigo-600 rounded-md
      md:mx-auto py-2 px-3"
      >
        <p className="text-lg font-bold">Search Quotes</p>
        <SearchQuoteComponents searchState={searchState} dispatch={dispatch} />
        <div>searchState {searchState.quoteSearch}</div>
      </div>

      <div
        className="bg-indigo-300 mt-8 mx-4 md:w-[90%] lg:w-[75%] xl:w-[60%] border border-indigo-600 rounded-md
      md:mx-auto py-2 px-3"
      >
        <SearchQuoteResults data={data} />
      </div>
    </div>
  );
};

export default Searchquotes;
