import React, { useReducer } from "react";
import QuotableHeader from "../components/QuotableHeader";
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
      <QuotableHeader />
      <div
        className="relative bg-indigo-100 mt-8 mx-4 md:w-[90%] lg:w-[75%] xl:w-[60%] border-2 border-indigo-800 rounded-md
      md:mx-auto py-2 px-3"
      >
        <div className="absolute top-[-25px] py-1 px-2 left-[-15px] rounded-md border border-indigo-800 bg-indigo-600">
          <p className="text-lg font-bold text-white">Search Quotes</p>
        </div>
        <div className="mt-2">
          <SearchQuoteComponents
            searchState={searchState}
            dispatch={dispatch}
          />
        </div>
      </div>

      {data && (
        <div
          className="relative bg-indigo-100 mt-8 mx-4 md:w-[90%] lg:w-[75%] xl:w-[60%] border border-indigo-600 
          rounded-md md:mx-auto py-2"
        >
          <div className="absolute top-[-25px] py-1 px-2 left-[-15px] rounded-md border border-indigo-800 bg-indigo-600">
            <p className="text-lg font-bold text-white">Result Quotes</p>
          </div>
          <div className="mt-3 flex flex-row flex-wrap">
            <SearchQuoteResults data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchquotes;
