import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/style.css";

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
