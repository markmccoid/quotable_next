import { Rating } from "@smastrom/react-rating";
import React from "react";
import { QuoteRecord } from "../../types";
import TagItem from "./TagItem";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteQuoteFromFirestore } from "../../firebase/firestore";

type Props = {
  quoteData: QuoteRecord;
};
const EditQuoteResultItem = ({ quoteData }: Props) => {
  return (
    <div
      className="relative flex flex-col pt-5 px-3 mt-[40px] justify-between
              border-2 border-indigo-700 rounded-md mx-2 py-2 mb-2 h-[200px] w-[95%] lg:w-[48%]
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
      <div
        className="absolute right-0 top-[-20px] border border-black p-1 rounded-md bg-white"
        onClick={() => deleteQuoteFromFirestore(quoteData.id)}
      >
        <RiDeleteBin6Line color="red" />
      </div>
      <div className="flex text-xl overflow-y-scroll h-[150px] scrollbar-hide mb-1 items-start text-center">
        {quoteData.quote}
      </div>
      <div className="flex flex-row space-x-2 overflow-x-scroll  scrollbar-hide">
        {quoteData?.tags.map((el) => (
          <TagItem key={el} tag={el} />
        ))}
      </div>
    </div>
  );
};

export default EditQuoteResultItem;
