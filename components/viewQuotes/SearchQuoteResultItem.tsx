import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Rating } from "@smastrom/react-rating";
import { QuoteRecord } from "../../types";
import TagItem from "./TagItem";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { deleteQuoteFromFirestore } from "../../firebase/firestore";

type Props = {
  quoteData: QuoteRecord;
  setEditingId: Dispatch<SetStateAction<string>>;
  editingId?: string;
};

/**
 * When cancel button is pressed, RESET any state values to what they were before.
 *
 */
const SearchQuoteResultItem = ({
  quoteData,
  setEditingId,
  editingId,
}: Props) => {
  // only show edit icon if NO quote is being edited
  const showEditIcon = !!!editingId; //? true : quoteData.id === editingId;
  // flag letting us know if this quote is being edited
  const isBeingEdited = quoteData.id === editingId;
  // Edit state
  const [ratingValue, setRatingValue] = useState(quoteData.rating);
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
        {!isBeingEdited ? (
          <Rating
            value={quoteData.rating || 0}
            style={{ maxWidth: 100 }}
            readOnly
          />
        ) : (
          <Rating
            // style={{ maxWidth: 250 }}
            resetOnSecondClick
            transition="zoom"
            className="max-w-[120px]"
            value={ratingValue}
            onChange={(selectedValue) => setRatingValue(selectedValue)}
          />
        )}
      </div>
      {/* Delete Icon */}
      <div
        className="absolute right-0 top-[-20px] border border-black p-1 rounded-md bg-white"
        onClick={() => deleteQuoteFromFirestore(quoteData.id)}
      >
        <RiDeleteBin6Line color="red" />
      </div>
      {/* Edit Icon */}
      {showEditIcon && (
        <div
          className="absolute right-[-10px] top-[10px] border border-black p-1 rounded-md bg-white"
          onClick={() => setEditingId(quoteData.id)}
        >
          <AiFillEdit color="blue" />
        </div>
      )}
      {/* Edit Save and Cancel buttons */}
      {isBeingEdited && (
        <div>
          <div
            className="absolute right-[-10px] top-[20px] border border-black p-1 rounded-md bg-white"
            onClick={() => console.log("saved")}
          >
            <FaSave color="blue" />
          </div>
          <div
            className="absolute right-[-10px] top-[50px] border border-black p-1 rounded-md bg-white"
            onClick={() => setEditingId(undefined)}
          >
            <MdCancel color="black" />
          </div>
        </div>
      )}

      {/* Quote View */}
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

export default SearchQuoteResultItem;
