export type QuoteRecord = {
  id: string;
  author: string;
  quote: string;
  authorBio: string;
  tags: string[];
  rating: number;
  createDate?: string;
  updateDate?: string;
};
