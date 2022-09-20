import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const authorsKey = createQueryKeys("authors");

export type AuthorsKeys = inferQueryKeys<typeof authorsKey>;
