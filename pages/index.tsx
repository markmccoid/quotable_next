import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { AiFillCopy } from "react-icons/ai";

import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { useStore } from "../store";
import { importData } from "../queries/importQuotes";

// import { getQuotes } from "../queries/getQuotes";

const getRandomQuote = async () => {
  const response = await fetch(`/api/quotes/randomquote`);
  const data = await response.json();
  return data;
};
const Home: NextPage = () => {
  const getRandomQuote = useStore((state) => state.getRandomQuote);
  const isInitialized = useStore((state) => state.isInitialized);

  const [randomQuote, setRandomQuote] = useState(undefined);
  const route = useRouter();
  const [value, copy] = useCopyToClipboard();

  useEffect(() => {
    if (isInitialized) {
      setRandomQuote(getRandomQuote());
    }
  }, [isInitialized]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-indigo-50">
      <Head>
        <title>Quotable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row justify-center w-full px-20 items-baseline space-x-5">
        <div
          onClick={() => route.push("/addquote")}
          className="group border border-black bg-indigo-200 hover:bg-indigo-300 py-2 px-5 rounded-2xl hover:scale-110 
          transition-all ease-in-out duration-500"
        >
          <GrAdd
            size={25}
            className="group-hover:scale-110 transition-all ease-in-out duration-500"
          />
        </div>
        <h1
          className="text-6xl cursor-pointer hover:scale-110 transition-all ease-in-out duration-500"
          onClick={() => {
            setRandomQuote(getRandomQuote());
          }}
        >
          Quotable
        </h1>
        <div
          onClick={() => route.push("/searchquotes")}
          className="border border-black py-2 px-5 rounded-2xl hover:scale-110 bg-indigo-200 hover:bg-indigo-300
          transition-all ease-in-out duration-500 "
        >
          <FaSearch
            size={25}
            className="group-hover:scale-110 transition-all ease-in-out duration-500"
          />
        </div>
      </div>
      <main className="flex w-full flex-1 flex-col items-center justify-start px-20 text-center">
        <div
          className="group relative mt-[150px] flex flex-col justify-center border-2 border-indigo-500 rounded-2xl p-10
        bg-indigo-100"
        >
          <div
            className="invisible group-hover:visible group-hover:opacity-70 absolute cursor-pointer 
            top-0 left-0 border-r-2 border-b-2 border-indigo-600 pt-2 pb-1 pl-3 pr-2 rounded-br-md
            hover:border-r-4 hover:border-b-4 hover:text-indigo-700
            active:text-indigo-400
            transition-all ease-in-out duration-300"
            onClick={() =>
              copy(`${randomQuote?.quote}\n${randomQuote?.author}`)
            }
          >
            <AiFillCopy />
          </div>
          {randomQuote ? (
            <>
              <div className="text-4xl mb-5">{randomQuote?.quote}</div>
              <div className="text-2xl">
                {" "}
                by{" "}
                <Link
                  target="_blank"
                  href={`https://www.google.com/search?q=${randomQuote?.author}`}
                >
                  <a target="_blank">{randomQuote?.author}</a>
                </Link>
              </div>
            </>
          ) : (
            <div className="w-[50%] text-2xl">loading</div>
          )}
        </div>
        {/* <button
          onClick={async () => {
            await importData();
            await initQuotes();
          }}
        >
          Import
        </button> */}
        {/* <button
          onClick={() => {
            deleteQuote("e1aa9ec5-be07-4449-8cc1-ae9d139e7d92");
          }}
        >
          Delete quote
        </button> */}
      </main>
    </div>
  );
};

export default Home;

// export async function getServerSideProps(context) {
//   const response = await fetch(`${server}/api/quotes/randomquote`);
//   const data = await response.json();

//   return {
//     props: { ...data }, // will be passed to the page component as props
//   };
// }
