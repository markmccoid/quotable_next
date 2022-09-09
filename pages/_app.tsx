import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@smastrom/react-rating/style.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
