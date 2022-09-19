import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const authorsKey = createQueryKeys("authors", {
  authorQuotes: (authorName: string) => authorName,
});

export type AuthorsKeys = inferQueryKeys<typeof authorsKey>;
