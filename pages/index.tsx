import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { server } from "../config";
import { QuoteRecord } from "../types";
import { GrAdd } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

import { useAuthorsQuotes, useSearchQuotes } from "../queries/queryHooks";
import { useQuery } from "@tanstack/react-query";

const getRandomQuote = async () => {
  const response = await fetch(`/api/quotes/randomquote`);
  const data = await response.json();
  return data;
};
const Home: NextPage = () => {
  const route = useRouter();
  const { isLoading, data } = useQuery(["randomquote"], getRandomQuote);

  // const { isLoading, data } = useAuthorsQuotes("Albert Einstein");
  // const { data: filterAuthor } = useSearchQuotes({
  //   authorSearch: ["Albert Einstein", "Truman Capote"],
  // });
  // console.log("data", data);
  // console.log("filterAuthor", filterAuthor);
  // const [data, setData] = useState();

  // useEffect(() => {
  //   const getQuote = async () => {
  //     const myData = await fetch("/api/randomquote").then((res) => res.json());
  //     setData(myData);
  //   };
  //   getQuote();
  // }, []);
  // console.log("data", data);
  const postQuote = async () => {
    const newQuote = {
      id: "",
      quote: "Program Every Dat.",
      author: "Mark McCoid",
      authorBio: "Someone",
      tags: ["Motivation", "Hope"],
      rating: 5,
      createDate: "9-5-2022",
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

    console.log("post done", content);
  };
  const updateQuote = async () => {
    const idToUpdate = "7c867e4e-4c37-4dc4-808b-b0268394e218";
    const updatedQuote = {
      id: idToUpdate,
      tags: ["Motive"],
      quote: "Have patience. All things are difficult before they become easy.",
      authorBio: "Here I am",
    };

    const rawResponse = await fetch("api/quotes/updatequote", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedQuote }),
    });
    const content = await rawResponse.json();

    console.log("post done", content);
  };

  const getQuote = async () => {
    const qId = "7c867e4e-4c37-4dc4-808b-b0268394e218";
    const data = await fetch(`api/quotes/${qId}`).then((res) => res.json());
    console.log("data", data);
  };

  const search = async () => {
    const data = await fetch(`api/quotes/search?authorText=Tom`);
    const quotes = await data.json();

    console.log(
      "data",
      quotes.map((el) => `${el.rating}=${el.tags}`)
    );
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-indigo-50">
      <Head>
        <title>Create Next App</title>
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
        <h1 className="text-6xl ">Quotable</h1>
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
          className="mt-[150px] flex flex-col justify-center border-2 border-indigo-500 rounded-2xl p-10
        bg-indigo-100"
        >
          <div className="text-4xl mb-5">{data.randQuote.quote}</div>
          <div className="text-2xl"> by {data.randQuote.author}</div>
        </div>
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
