import { QuoteRecord } from "./../types/index";
import { getQuotes } from "../queries/getQuotes";

export class QuotableData {
  #quoteData: QuoteRecord[];

  /**
   * Once again, we set the `constructor` to be private.
   * This ensures that all consumers of this class will use
   * the factory function as the entry point.
   */
  private constructor(quoteData: QuoteRecord[]) {
    this.#quoteData = quoteData;
  }

  /**
   * Exchanges the authorization code for an access token.
   * @param code - The authorization code from Spotify.
   */
  static async initialize() {
    const data = await getQuotes();
    return new QuotableData(data);
  }
}
