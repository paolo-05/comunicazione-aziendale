// Paolo Bianchessi, 24/10/2023
// This component is used in every page for creating a
// dinamic page title and importing only once the Boostrap's JS

import Head from "next/head";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.css";

export default function Layout({
  children,
  title = "Comunicazione Aziendale",
}) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {children}
    </div>
  );
}
