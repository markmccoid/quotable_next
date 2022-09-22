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
    <div className="flex flex-col h-full py-2 md:w-[90%] lg:w-[75%] xl:w-[60%] mx-auto">
      <div className="z-100">
        <QuotableHeader />
        <div
          className="relative bg-indigo-100 mt-8 border-2 border-indigo-800 rounded-md
        py-2 px-3"
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
      </div>

      {/* <div className="py-1 px-2 mt-5 mb-[-20px] ml-[-10px] z-10 w-max rounded-md border border-indigo-800 bg-indigo-600">
        <p className="text-lg font-bold text-white">Result Quotes</p>
      </div> */}
      {data && (
        <div
          className="relative bg-indigo-100 border border-indigo-600
            rounded-md pb-2 mt-12  overflow-y-scroll"
        >
          <div className="fixed py-1 px-2 mt-[-30px]  ml-[-10px]  w-max rounded-md border border-indigo-800 bg-indigo-600">
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
