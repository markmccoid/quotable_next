import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { server } from "../config";
import { QuoteRecord } from "../types";
import { GrAdd } from "react-icons/gr";
import { useRouter } from "next/router";

const Home: NextPage<{ randQuote: QuoteRecord }> = ({ randQuote }) => {
  const route = useRouter();
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        onClick={() => route.push("/addquote")}
        className="border border-black p-2 rounded-2xl hover:scale-110"
      >
        <GrAdd size={25} className="hover:scale-110" />
      </div>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl">Quotable</h1>
        <div>{randQuote.quote}</div>
        <div> by {randQuote.author}</div>
        <button
          className="p-2 rounded-2xl border border-black bg-indigo-400"
          onClick={updateQuote}
        >
          Update Quote
        </button>
        <button
          className="p-2 rounded-2xl border border-black bg-indigo-400"
          onClick={getQuote}
        >
          Get Quote
        </button>
        <button
          className="p-2 rounded-2xl border border-black bg-indigo-400"
          onClick={search}
        >
          Search
        </button>
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const data = await fetch(`${server}/api/quotes/randomquote`).then((res) =>
    res.json()
  );
  console.log("data", data);
  return {
    props: { ...data }, // will be passed to the page component as props
  };
}
