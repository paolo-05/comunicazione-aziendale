import Layout from "@/components/layout";

import dynamic from 'next/dynamic'

var Editor = dynamic(() => import("@/components/editor"), {
  ssr: false
})

function New(){
   return(
    <Layout title="Nuovo annuncio">
        <Editor/>
    </Layout>
   );
}

export default New;