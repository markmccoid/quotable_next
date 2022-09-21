import { QuoteRecord } from "../../types";
import SearchQuoteResultItem from "./SearchQuoteResultItem";

type Props = {
  data: QuoteRecord[] | undefined;
};
const SearchQuoteResults = ({ data }: Props) => {
  return (
    <>
      {data &&
        data.map((quote) => (
          <SearchQuoteResultItem key={quote.id} quoteData={quote} />
        ))}
    </>
  );
};

export default SearchQuoteResults;
