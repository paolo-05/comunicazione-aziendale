import Header from "@/components/navbar";
import { PostForm } from "@/components/postComponents";
import Container from "@/components/ui/container";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const CustomEditor = dynamic(
  () => {
    return import("@/components/customEditor");
  },
  { ssr: false }
);

export default function New() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      signIn();
    },
  });

  return (
    <>
      <Head>
        <title>Creazione di un nuovo annuncio</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <Container>
          <div className="relative pt-36">
            <PostForm />
          </div>
        </Container>

        {/* <section className="space-y-40 mb-40">
          <Container>
            <div className="relative pt-36">
              <h1>Pagina per la creazione di un nuovo post</h1>
              <CustomEditor initialData="<h1>Hello from CKEditor in Next.js!</h1>" />
            </div>
          </Container>
        </section> */}
      </main>
    </>
  );
}
