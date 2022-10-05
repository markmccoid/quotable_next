import { useState } from "react";

import { QuoteRecord } from "../../types";
import SearchQuoteResultItem from "./SearchQuoteResultItem";
import EditQuoteResultItem from "./EditQuoteResultItem";

type Props = {
  data: QuoteRecord[] | undefined;
};
const SearchQuoteResults = ({ data }: Props) => {
  const [editingId, setEditingId] = useState<string>(undefined);
  console.log("setEditingid", editingId);
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
