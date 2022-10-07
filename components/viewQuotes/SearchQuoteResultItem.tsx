import React, { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Rating } from "@smastrom/react-rating";
import { QuoteRecord } from "../../types";
import TagItem from "./TagItem";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import {
  deleteQuoteFromFirestore,
  updateQuoteInFirestore,
} from "../../firebase/firestore";
import { useAuthorsList, useTagsList } from "../../queries/queryHooks";
import SearchInput from "../SearchInput";
import { CommonProps, GroupBase } from "react-select";
import CreatableSelect from "react-select/creatable";
import { TagOptions } from "../../pages/addquote";

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
  const selectRef =
    useRef<CommonProps<TagOptions, true, GroupBase<TagOptions>>>();
  // only show edit icon if NO quote is being edited
  const showEditIcon = !!!editingId; //? true : quoteData.id === editingId;
  // flag letting us know if this quote is being edited
  const isBeingEdited = quoteData.id === editingId;
  // Edit state
  const [ratingValue, setRatingValue] = useState(quoteData.rating);
  const [quote, setQuote] = useState(quoteData.quote);
  const [author, setAuthor] = useState(quoteData.author);
  // const [bio, setBio] = useState(quoteData.authorBio);
  const [tagsSelected, setTagsSelected] = useState<string[]>();

  const authorArray = useAuthorsList("raw");
  const tagsArray = useTagsList("select");
  //---
  const updateQuote = () => {
    const updatedQuote: Partial<QuoteRecord> = {
      rating: ratingValue,
      quote,
      author,
      tags: tagsSelected,
    };
    updateQuoteInFirestore(quoteData.id, updatedQuote);
    setEditingId(undefined);
  };

  useEffect(() => {
    if (selectRef.current && editingId) {
      selectRef.current.setValue(
        quoteData.tags.map((el) => ({ label: el, value: el })),
        "select-option"
      );
    }
  }, [editingId]);

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
        {!isBeingEdited ? (
          <>
            <div className="font-bold text-white ">{quoteData.author}</div>
            <Rating
              value={quoteData.rating || 0}
              style={{ maxWidth: 100 }}
              readOnly
            />
          </>
        ) : (
          <>
            {/* Author */}
            <SearchInput
              searchArray={authorArray}
              updateFunction={(e) => {
                setAuthor(e);
              }}
            >
              {(props) => {
                return (
                  <input
                    {...props}
                    type="text"
                    name="author"
                    id="author"
                    value={author}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
                  />
                );
              }}
            </SearchInput>
            {/* Rating */}
            <Rating
              // style={{ maxWidth: 250 }}
              resetOnSecondClick
              transition="zoom"
              className="max-w-[120px]"
              value={ratingValue}
              onChange={(selectedValue) => {
                setRatingValue(selectedValue);
              }}
            />
          </>
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
            onClick={updateQuote}
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
      {!isBeingEdited ? (
        <>
          <div className="flex text-xl overflow-y-scroll h-[150px] scrollbar-hide mb-1 items-start text-center">
            {quoteData.quote}
          </div>
          <div className="flex flex-row space-x-2 overflow-x-scroll  scrollbar-hide">
            {quoteData?.tags.map((el) => (
              <TagItem key={el} tag={el} />
            ))}
          </div>
        </>
      ) : (
        <>
          <textarea
            name="quote"
            id="quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
          />
          <CreatableSelect
            ref={selectRef}
            instanceId="tag"
            options={tagsArray}
            isClearable
            isMulti
            // value={"test"}
            controlShouldRenderValue={true}
            onChange={(e) => {
              if (Array.isArray(e)) {
                setTagsSelected(e.map((el) => el.value));
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default SearchQuoteResultItem;
