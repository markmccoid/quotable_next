import React, { useReducer, useState } from "react";
import QuotableHeader from "../components/QuotableHeader";
import SearchQuoteComponents from "../components/viewQuotes/SearchQuoteComponents";
import SearchQuoteResults from "../components/viewQuotes/SearchQuoteResults";
import { useSearchQuotes } from "../hooks/useSearchQuotes";
import { SearchState } from "../store";

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
  // If an empty array is passed for any payload, turn it into undefined
  // This will alert the search function to "ignore" that search.
  if (Array.isArray(action.payload)) {
    action.payload = action.payload.length === 0 ? undefined : action.payload;
  }
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
      //! Need to add a checkbox state that indicates if searching by payload
      //! otherwise, zero only returns zero ratings
      return { ...state, ratingSearch: action.payload };
      break;
    default:
      return state;
  }
};
const Searchquotes = () => {
  const [searchState, dispatch] = useReducer(reducer, initialState);
  const data = useSearchQuotes(searchState);

  return (
    <div className="flex flex-col h-full py-2 w-[100%] md:w-[90%] lg:w-[80%] xl:w-[80%] mx-auto">
      <div className="z-100">
        <QuotableHeader />
        <div
          className="relative bg-indigo-100 mt-8 border-2 border-indigo-800 rounded-md
        py-2 px-3"
        >
          <div className="absolute top-[-40px] py-1 px-2 left-0 md:left-[-15px] rounded-md border border-indigo-800 bg-indigo-600">
            <p className="text-lg font-bold text-white">Search Quotes</p>
          </div>
          <div className="mt-2">
            <SearchQuoteComponents
              searchState={searchState}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>

      {/* <div className="py-1 px-2 mt-5 mb-[-20px] ml-[-10px] z-10 w-max rounded-md border border-indigo-800 bg-indigo-600">
        <p className="text-lg font-bold text-white">Result Quotes</p>
      </div> */}
      {data && (
        <div
          className="relative bg-indigo-100 border border-indigo-600
            rounded-md pb-2 mt-12  overflow-y-scroll"
        >
          <div
            className="fixed py-1 px-2 mt-[-40px] ml-0 md:ml-[-10px] w-max rounded-md border 
                        border-indigo-800 bg-indigo-600"
          >
            <p className="text-lg font-bold text-white">
              {data.length} Result Quotes
            </p>
          </div>
          <div className="mt-3 flex flex-col items-center lg:flex-row lg:justify-center lg:flex-wrap">
            <SearchQuoteResults data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchquotes;
