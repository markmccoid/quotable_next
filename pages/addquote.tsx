import React, { useRef, useState } from "react";
import type { QuoteRecord } from "../types";
import { Rating } from "@smastrom/react-rating";
import SearchInput from "../components/SearchInput";
import AuthorQuotes from "../components/addQuote/AuthorQuotes";
import { useQuery } from "@tanstack/react-query";
import { CommonProps, GroupBase } from "react-select";
import Creatable from "react-select/creatable";
import { useRouter } from "next/router";
import QuotableHeader from "../components/QuotableHeader";
import { useStore } from "../store";
import { useAuthorsList, useTagsList } from "../queries/queryHooks";
import { addNewQuoteToFirestore } from "../firebase/firestore";

type Form = {
  quote: { value: string };
  author: { value: string };
  authorBio: { value: string };
  tags: { value: string[] };
  rating: { value: string };
};

// const getAuthors = async () => {
//   return await fetch(`api/quotes/get/authors`).then((res) => res.json());
// };
// const getTags = async () => {
//   return await fetch(`api/quotes/get/tags`).then((res) => res.json());
// };

export type TagOptions = {
  label: string;
  value: string;
};
const formatTags = (tags: string[]): TagOptions[] => {
  if (!tags) return [];
  const tagOptions = tags.reduce((final: TagOptions[], el) => {
    return [...final, { label: el, value: el }];
  }, []);

  return tagOptions;
};
const addquote = () => {
  // Store data
  const selectRef =
    useRef<CommonProps<TagOptions, true, GroupBase<TagOptions>>>();
  const [ratingValue, setRatingValue] = useState(0); // <-- Init with 0 for no initial value
  const [foundAuthor, setFoundAuthor] = useState("");
  const [author, setAuthor] = useState("");
  const [bio, setBio] = useState("");
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);

  const authorArray = useAuthorsList("raw");
  const tagsArray = useTagsList("select");

  //! -------SUBMIT QUOTE --------------------------
  const submitQuote = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // type a var to use to pull form values
    const target = e.target as typeof e.target & Form;
    const newQuote: Omit<QuoteRecord, "id"> = {
      quote: target.quote.value.trim(),
      author: target.author.value.trim(),
      authorBio: target.authorBio.value.trim(),
      tags: tagsSelected,
      rating: ratingValue,
    };

    const result = addNewQuoteToFirestore(newQuote)
      .then(() => {
        //Reset Form data
        target.quote.value = "";
        setAuthor("");
        setFoundAuthor("");
        setBio("");
        setTagsSelected([]);
        setRatingValue(0);
        if (selectRef.current) selectRef.current.clearValue();
      })
      .catch((e) => alert(e));
  };
  //! -------END SUBMIT QUOTE --------------------------

  return (
    <div className="flex min-h-screen flex-col py-2 bg-indigo-50">
      <QuotableHeader />
      <div
        className="bg-indigo-100 w-[100%] md:w-[90%] lg:w-[80%] xl:w-[60%] m-auto
                    mt-8 rounded-lg border-2 border-indigo-600"
      >
        <form onSubmit={submitQuote}>
          <div className=" px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="quote"
                  className="block text-md font-medium text-gray-700"
                >
                  Quote
                </label>
                <textarea
                  name="quote"
                  id="quote"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
                />
              </div>
              {/* Use the component instead */}
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="author"
                  className="block text-md font-medium text-gray-700"
                >
                  Author
                </label>
                <SearchInput
                  searchArray={authorArray}
                  updateFunction={(e) => {
                    setAuthor(e);
                    if (authorArray.filter((el) => el === e).length > 0) {
                      setFoundAuthor(e);
                    } else {
                      setFoundAuthor("");
                    }
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
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="authorBio"
                  className="block text-md font-medium text-gray-700"
                >
                  Author Bio
                </label>
                <input
                  type="text"
                  name="authorBio"
                  id="authorBio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="tags"
                  className="block text-md font-medium text-gray-700"
                >
                  Tags
                </label>
                {/* <input
                type="text"
                name="tags"
                id="tags"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
              /> */}
                <Creatable
                  ref={selectRef}
                  instanceId="tag"
                  options={tagsArray}
                  isClearable
                  isMulti
                  onChange={(e) => setTagsSelected(e.map((el) => el.value))}
                />
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                <label
                  htmlFor="rating"
                  className="block text-md font-medium text-gray-700"
                >
                  Rating
                </label>
                <Rating
                  // style={{ maxWidth: 250 }}
                  resetOnSecondClick
                  transition="zoom"
                  className="max-w-[200px]"
                  value={ratingValue}
                  onChange={(selectedValue) => setRatingValue(selectedValue)}
                />
              </div>
            </div>
          </div>
          <div className="bg-indigo-100 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
        <AuthorQuotes currAuthor={foundAuthor} updateBio={setBio} />
      </div>
    </div>
  );
};

export default addquote;
