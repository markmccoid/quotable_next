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
    <div>
      AuthorQuotes
      <div>{currAuthor}</div>
      {currQuotes.map((q) => (
        <div key={q.id} className="py-2 border-2 border-red-800">
          {q.quote}
        </div>
      ))}
    </div>
  );
};

export default AuthorQuotes;
