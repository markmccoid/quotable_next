import { QuoteRecord } from "../types";
import { v4 as uuid } from "uuid";
import fs from "fs";
// import quotes from '../data/quotes.json'
// const fs = require("fs");

// users in JSON file for simplicity, store in a db for production applications
// let quotes: QuoteRecord[] = require("../data/quotes.json");
import { quotes as fileQuotes } from "./quoteloader";

let quotes = [...fileQuotes];
let authorsList = Array.from(new Set(quotes.map((el) => el.author)));

export const quotesDB = {
  getAll: () => quotes,
  authorsList,
  getById: (id: string) => quotes.find((quote) => quote.id === id),
  // find: (quote: QuoteRecord) => quotes.find(quote),
  addNewQuote,
  updateQuote,
  deleteQuote,
};

/**
 * addNewQuote()
 * Add New Quote
 * @param quote
 *
 * Accepts all info needed for Quote (can't leave anything out)
 * Adds an id from uuid() and assigns today's date as createDate
 * Saves the json file.
 */
function addNewQuote(quote: QuoteRecord) {
  // generate new quote id
  quote.id = uuid();

  // set date created and updated
  quote.createDate = new Date().toLocaleDateString().replaceAll("/", "-");
  quote.authorBio = quote.authorBio.trim();
  quote.author = quote.author.trim();
  quote.tags = Array.isArray(quote.tags)
    ? quote.tags
    : quote.tags.split(",").map((el) => el.trim());
  // add and save quote
  quotes.push(quote);
  saveData();
}

/**
 * updateQuote()
 * @param id
 * @param updatedQuote
 */
function updateQuote(updatedQuote: QuoteRecord) {
  // quotes = quotes.filter((quote) => quote.id !== id);

  const updateDate = new Date().toLocaleDateString().replaceAll("/", "-");
  for (let quote of quotes) {
    if (quote.id === updatedQuote.id) {
      Object.assign(quote, { ...updatedQuote, updateDate });
    }
  }
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function deleteQuote(id: string) {
  // filter out deleted user and save
  quotes = quotes.filter((quote) => quote.id !== id);
  saveData();
}

// private helper functions

function saveData() {
  fs.writeFileSync("data/quotes.json", JSON.stringify(quotes, null, 4));
}
