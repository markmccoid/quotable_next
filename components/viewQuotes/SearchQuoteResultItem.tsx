import { Rating } from "@smastrom/react-rating";
import React from "react";
import { QuoteRecord } from "../../types";

type Props = {
  quoteData: QuoteRecord;
};
const SearchQuoteResultItem = ({ quoteData }: Props) => {
  console.log("rating", quoteData.rating);
  return (
    <div
      className="relative flex flex-col pt-5 px-3 mt-[40px] 
              border-2 border-indigo-700 rounded-md mx-2 py-2 mb-2 h-[150px] w-[48%]
              shadow-lg bg-indigo-300"
    >
      <div
        className="absolute top-[-25px] flex flex-row justify-between border border-black shadow-lg rounded-lg 
        py-1 px-5 bg-indigo-500 w-[90%] "
      >
        <div className="font-bold text-white ">{quoteData.author}</div>
        <Rating
          value={quoteData.rating || 0}
          style={{ maxWidth: 100 }}
          readOnly
        />
      </div>
      <div className="text-xl">{quoteData.quote}</div>
      {quoteData.tags.map((el) => (
        <div>{el}</div>
      ))}
    </div>
  );
};

export default SearchQuoteResultItem;
