import { FC, useCallback, useEffect, useState } from "react";
import { QuoteRecord } from "../../types";
import { motion } from "framer-motion";
import { useStore } from "../../store";

type Props = {
  currAuthor: string;
  updateBio: (bio: string) => void;
};
const AuthorQuotes: FC<Props> = ({ currAuthor, updateBio }) => {
  const [currQuotes, setCurrQuotes] = useState<QuoteRecord[]>([]);
  const searchQoutes = useStore((state) => state.searchQuotes);

  useEffect(() => {
    const getQuotes = () => {
      const quotesFound = searchQoutes({ authorSearch: [currAuthor] });
      console.log("AuthorQuotes - quotesFound", quotesFound);
      // const response = await fetch(
      //   `/api/quotes/search?authortext=${currAuthor}`
      // );
      // const data = await response.json();
      setCurrQuotes(quotesFound);
      if (quotesFound) {
        updateBio(quotesFound[0].authorBio);
      }
    };
    // Only get quotes if an author is passed
    if (currAuthor.length > 0) {
      getQuotes();
    } else {
      setCurrQuotes([]);
      updateBio("");
    }
  }, [currAuthor]);

  const variants = {
    closed: { opacity: 0, scale: 0 },
    open: { opacity: 1, scale: 1 },
  };
  return (
    <div className="mx-4 flex flex-col my-3">
      <motion.div
        className="text-lg font-bold"
        animate={currAuthor ? "open" : "closed"}
        variants={variants}
      >
        {`${currAuthor ? "Quotes from " + currAuthor : ""}`}
      </motion.div>
      {/* <div className="flex-column w-[80%]"> */}
      <motion.div
        className="flex-column "
        animate={currAuthor ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {currQuotes &&
          currQuotes.map((q) => {
            return (
              // <div key={q.id}>
              <div
                key={q.id}
                className="text-md m-2 p-2 border border-gray-700 rounded-lg bg-indigo-100"
              >
                {q.quote}
              </div>
              // </div>
            );
          })}
      </motion.div>
    </div>
  );
};

export default AuthorQuotes;
