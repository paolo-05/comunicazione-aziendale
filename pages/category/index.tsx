import { CategoryFormModal, Item } from "@/components/categoryComponents";
import Header from "@/components/navbar";
import Container from "@/components/ui/container";
import { useUnrestrictedSession } from "@/hooks/session/useUnrestrictedSession";
import { CategoryType } from "@/types/categoryTypes";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Category() {
  const session = useUnrestrictedSession();

  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      await axios.get("/api/category/list-all").then((res) => {
        setCategories(res.data.message);
      });
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Head>
        <title>Categorie di utenti</title>
      </Head>
      <main className={inter.className}>
        <CategoryFormModal
          show={showModal}
          onClose={() => setShowModal(false)}
        />
        <Header session={session} />
        <section className="relative pt-36">
          <Container>
            <div className="bg-gray-100 dark:bg-gray-900">
              <section className="w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-800 shadow-md">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Categorie di utenti
                </h1>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Crea nuova categoria
                </button>
              </section>
              <section className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  La creazione di categorie ti aiuta a organizzare i tuoi
                  dipendenti in base al loro roulo in azienda e alla loro fascia
                  di età. Permette una mirata comunicazione e una migliore
                  gestione degli utenti.
                </p>
                <div className="grid gap-4">
                  {categories?.map((category, index) => (
                    <Item key={index} category={category} />
                  ))}
                </div>
              </section>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
