import { Rating } from "@smastrom/react-rating";
import { useCallback, useState } from "react";
import { SearchState, Actions } from "../../pages/searchquotes";
import _debounce from "lodash/debounce";
import Select from "react-select";
import { useAuthorsList, useTagsList } from "../../queries/queryHooks";

type Props = {
  searchState: SearchState;
  dispatch: React.Dispatch<Actions>;
};

const SearchQuoteComponents = ({ searchState, dispatch }: Props) => {
  const [quoteHold, setQuoteHold] = useState("");
  const authorsList = useAuthorsList("select");
  const tagsList = useTagsList("select");

  //-- Debounce the setting of the updating of the quote search string
  //-- Don't want to call for every letter typed.
  const updateQuoteSearch = (value: string) => {
    dispatch({ type: "quote", payload: value });
  };
  const debounceFunc = useCallback(_debounce(updateQuoteSearch, 400), []);
  //----------

  const setAuthor = (author: string[]) => {
    dispatch({ type: "author", payload: author });
  };
  const setTags = (tags: string[]) => {
    dispatch({ type: "tag", payload: tags });
  };
  return (
    <div>
      <div className="flex flex-row  justify-between">
        <div className="flex-grow mr-5">
          <label className="block text-md font-medium text-gray-700">
            Author
          </label>
          <div>
            <Select
              // className="w-[350px]"
              options={authorsList}
              instanceId="authors"
              isMulti
              onChange={(e) => setAuthor(e.map((el) => el.value))}
            />
          </div>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Tags
          </label>
          <div>
            <Select
              className="w-[350px]"
              options={tagsList}
              instanceId="tags"
              isMulti
              onChange={(e) => setTags(e.map((el) => el.value))}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex-grow mr-6">
          <label
            htmlFor="quote"
            className="block text-md font-medium text-gray-700"
          >
            Quote
          </label>
          <input
            type="text"
            name="quoteSearch"
            id="quoteSearch"
            value={quoteHold}
            onChange={(e) => {
              // Must update the quote hold as well as call the debounce func
              setQuoteHold(e.target.value);
              debounceFunc(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
          />
        </div>
        <div className="w-[350px]">
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
            className="max-w-[150px]"
            value={searchState.ratingSearch}
            onChange={(selectedValue) =>
              dispatch({ type: "rating", payload: selectedValue })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SearchQuoteComponents;
