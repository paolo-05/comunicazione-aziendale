import Header from "@/components/navbar";
import { PostForm } from "@/components/postComponents";
import Container from "@/components/ui/container";
import { useUnrestrictedSession } from "@/hooks/session/useUnrestrictedSession";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Head from "next/head";
import { SetStateAction, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const inter = Inter({ subsets: ["latin"] });

const CustomEditor = dynamic(
  () => {
    return import("@/components/customEditor");
  },
  { ssr: false }
);

export default function New() {
  const session = useUnrestrictedSession();

  const [value, setValue] = useState<any>({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

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
            <Datepicker
              i18n="it"
              startFrom={new Date()}
              separator="-->"
              placeholder="Inserisci il range di visibilità"
              primaryColor="green"
              value={value}
              onChange={handleValueChange}
              displayFormat="DD/MM/YYYY"
              startWeekOn="mon"
            />
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
