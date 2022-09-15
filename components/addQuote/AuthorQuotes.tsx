import { FC, useCallback, useEffect, useState } from "react";
import { QuoteRecord } from "../../types";

type Props = {
  currAuthor: string;
  updateBio: (bio: string) => void;
};
const AuthorQuotes: FC<Props> = ({ currAuthor, updateBio }) => {
  const [currQuotes, setCurrQuotes] = useState<QuoteRecord[]>([]);

  useEffect(() => {
    const getQuotes = async () => {
      const response = await fetch(
        `/api/quotes/search?authortext=${currAuthor}`
      );
      const data = await response.json();
      setCurrQuotes(data);
      updateBio(data[0].authorBio);
    };
    // Only get quotes if an author is passed
    if (currAuthor.length > 0) {
      getQuotes();
    } else {
      setCurrQuotes([]);
      updateBio("");
    }
  }, [currAuthor]);

  return (
    <div className="mx-4 flex flex-col">
      <div className="text-lg font-bold">
        {`${currAuthor ? "Quotes from " + currAuthor : ""}`}
      </div>
      <div className="flex-column ">
        {currQuotes.map((q) => {
          return (
            // <div key={q.id}>
            <div key={q.id} className="m-2 p-2 border border-black">
              {q.quote}
            </div>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuthorQuotes;
