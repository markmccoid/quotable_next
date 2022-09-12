import React from "react";
import SearchInput from "../SearchInput";

// Use React Query and its cache for the authorArray
const AuthorInput = () => {
  return (
    <div className="col-span-6 sm:col-span-6">
      <label
        htmlFor="author"
        className="block text-sm font-medium text-gray-700"
      >
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
  );
};

export default AuthorInput;
