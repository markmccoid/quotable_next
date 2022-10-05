import { useEffect, useState } from "react";
import { SearchState, useStore } from "../store";

function useSearchQuotes(filter: SearchState) {
  const searchQuotes = useStore((state) => state.searchQuotes);
  const quotesModified = useStore((state) => state.quotesModified);
  const isInitialized = useStore((state) => state.isInitialized);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // filter. = {
    //   authorSearch: Array.isArray(filter.authorSearch) &&
    // }
    setResults(searchQuotes(filter));
  }, [filter, isInitialized, quotesModified]);

  return results;
}

export { useSearchQuotes };
