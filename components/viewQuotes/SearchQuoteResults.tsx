import { useEffect, useState } from "react";

import { QuoteRecord } from "../../types";
import SearchQuoteResultItem from "./SearchQuoteResultItem";

type Props = {
  data: QuoteRecord[] | undefined;
};
const SearchQuoteResults = ({ data }: Props) => {
  const [editingId, setEditingId] = useState<string>(undefined);
  useEffect(() => {
    // reset any editing if a new search is started
    setEditingId(undefined);
  }, [data]);
  return (
    <>
      {data &&
        data.map((quote) => (
          <SearchQuoteResultItem
            key={quote.id}
            quoteData={quote}
            setEditingId={setEditingId}
            editingId={editingId}
          />
        ))}
    </>
  );
};

export default SearchQuoteResults;
