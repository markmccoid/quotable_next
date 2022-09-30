import { useEffect } from "react";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "@smastrom/react-rating/style.css";

const queryClient = new QueryClient();
// Initialize Firebase
import "../queries/firebase";
import useStore from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  const initQuotes = useStore((state) => state.initQuotes);
  // Initialize Zuzstand store
  // This will be async, so anything loads on start of app must
  // check isInitialized flag from store before accessing store functions
  useEffect(() => {
    const getInitialQuote = async () => {
      await initQuotes();
    };
    getInitialQuote();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
