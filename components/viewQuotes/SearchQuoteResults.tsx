import { QuoteRecord } from "../../types";

type Props = {
  data: QuoteRecord[] | undefined;
};
const SearchQuoteResults = ({ data }: Props) => {
  return (
    <div>
      SearchQuoteResults
      {data &&
        data.map((el) => (
          <div>
            <div>{el.author}</div>
            <div>{el.quote}</div>
            <div>{el.rating}</div>
          </div>
        ))}
    </div>
  );
};

export default SearchQuoteResults;
