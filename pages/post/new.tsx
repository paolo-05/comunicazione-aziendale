// Paolo Bianchessi, 25/10/2023
// This is the page for creating a new post

import Navbar from "@/components/navbar/index";
import dynamic from "next/dynamic";

var Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

function New() {
  return (
    <>
      <Navbar position={""} shouldFetch={false} />
      <div className="container mt-3">
        <Editor mode="new" />
      </div>
    </>
  );
}

export default New;
