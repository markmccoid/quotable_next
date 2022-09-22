export type QuoteRecord = {
  id: string;
  author: string;
  quote: string;
  authorBio: string;
  // an array of tags or a comma delimited string of tags
  tags: string[];
  rating: number;
  createDate?: string;
  updateDate?: string;
};
