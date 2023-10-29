// Paolo Bianchessi, 25/10/2023
// This is the page for creating a new post

import dynamic from "next/dynamic";
import Layout from "@/components/layout";
import Navbar from "@/components/navbar";

var Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

function New() {
  return (
    <Layout title="Nuovo annuncio">
      <Navbar />
      <div className="container mt-3">
        <Editor context="new" />
      </div>
    </Layout>
  );
}

export default New;
