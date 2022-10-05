import { useEffect } from "react";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "@smastrom/react-rating/style.css";

// Initialize Firebase
// import { app } from "../firebase/firebase";
// import useStore from "../store";
import { useFirebase } from "../firebase/useFirebase";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // Initialize firebase and setup listening to keep
  // data in sync with our store.
  const app = useFirebase();
  // Initialize Zuzstand store
  // This will be async, so anything loads on start of app must
  // check isInitialized flag from store before accessing store functions

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
