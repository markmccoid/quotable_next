import React, { useState } from "react";
import type { QuoteRecord } from "../types";
import { Rating } from "@smastrom/react-rating";
import SearchInput from "../component/SearchInput";
import AuthorQuotes from "../component/addQuote/AuthorQuotes";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import Creatable from "react-select/creatable";

type Form = {
  quote: { value: string };
  author: { value: string };
  authorBio: { value: string };
  tags: { value: string[] };
  rating: { value: string };
};

const getAuthors = async () => {
  return await fetch(`api/quotes/get/authors`).then((res) => res.json());
};
const getTags = async () => {
  return await fetch(`api/quotes/get/tags`).then((res) => res.json());
};

type TagOptions = {
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
  const [ratingValue, setRatingValue] = useState(0); // <-- Init with 0 for no initial value
  const [foundAuthor, setFoundAuthor] = useState("");
  // const [authorArray, setAuthorArray] = useState([]);
  const [bio, setBio] = useState("");
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<TagOptions[]>([]);
  const { isLoading, data: authorArray } = useQuery(["authorList"], getAuthors);
  const { isLoading: isLoadingTags, data: tagsArray } = useQuery(["tagsList"], getTags);

  React.useEffect(() => {
    if (tagsArray) {
      setTagOptions(formatTags(tagsArray));
    }
  }, [tagsArray]);

  //! -------SUBMIT QUOTE --------------------------
  const submitQuote = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Form Data", Object.fromEntries(formData));
    // type a var to use to pull form values
    const target = e.target as typeof e.target & Form;
    const newQuote: QuoteRecord = {
      id: "",
      quote: target.quote.value,
      author: target.author.value,
      authorBio: target.authorBio.value,
      tags: target.tags.value,
      rating: ratingValue,
    };

    const rawResponse = await fetch("api/quotes/addquote", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newQuote }),
    });
    const content = await rawResponse.json();
    // console.log("add quote", content);
  };
  //! -------END SUBMIT QUOTE --------------------------

  return (
    <div>
      <form onSubmit={submitQuote}>
        <div className="bg-indigo-300 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="quote" className="block text-sm font-medium text-gray-700">
                Quote
              </label>
              <textarea
                name="quote"
                id="quote"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {/* Use the component instead */}
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <SearchInput
                searchArray={authorArray}
                updateFunction={(e) => {
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
                      // value={author}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  );
                }}
              </SearchInput>
            </div>
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="authorBio" className="block text-sm font-medium text-gray-700">
                Author Bio
              </label>
              <input
                type="text"
                name="authorBio"
                id="authorBio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              {/* <input
                type="text"
                name="tags"
                id="tags"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              /> */}
              <Creatable
                instanceId="tag"
                options={tagOptions}
                isMulti
                onChange={(e) => setTagsSelected(e.map((el) => el.value))}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <Rating
                // style={{ maxWidth: 250 }}
                transition="zoom"
                className="max-w-[200px]"
                value={ratingValue}
                onChange={(selectedValue) => setRatingValue(selectedValue)}
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
      <div className="border-2 border-red-900">
        <AuthorQuotes currAuthor={foundAuthor} updateBio={setBio} />
      </div>
    </div>
  );
};

export default addquote;
