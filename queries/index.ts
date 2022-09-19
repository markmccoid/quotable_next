import {
  mergeQueryKeys,
  inferQueryKeyStore,
} from "@lukemorales/query-key-factory";
import { authorsKey } from "./authorKeys";
import { quotesKeys } from "./quotesKeys";

// export
export const queryKeys = mergeQueryKeys(authorsKey, quotesKeys);

export type QueryKeys = inferQueryKeyStore<typeof queryKeys>;
