import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { SearchState, Actions } from "../../pages/searchquotes";
type Props = {
  searchState: SearchState;
  dispatch: React.Dispatch<Actions>;
};

const SearchQuoteComponents = ({ searchState, dispatch }: Props) => {
  const [ratingValue, setRatingValue] = useState(0);

  return (
    <div>
      <div className="">
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
          value={searchState.quoteSearch}
          onChange={(e) => dispatch({ type: "quote", payload: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
        />
      </div>
      <div className="">
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
      <div>
        {searchState.quoteSearch} - {searchState.ratingSearch}
      </div>
    </div>
  );
};

export default SearchQuoteComponents;
