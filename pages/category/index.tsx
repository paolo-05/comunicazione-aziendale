import { CategoryFormModal } from "@/components/categoryComponents/categoryFormModal";
import { ColorPicker } from "@/components/forms";
import Header from "@/components/navbar";
import Container from "@/components/ui/container";
import { useUnrestrictedSession } from "@/hooks/session/useUnrestrictedSession";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ListAll() {
  const session = useUnrestrictedSession();

  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, name: "Marketing" },
    { id: 2, name: "IT" },
    { id: 3, name: "Administration" },
    // Add more initial categories as needed
  ]);

  const handleDelete = (id: any) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleCreate = (name: any) => {
    setCategories([...categories, { id: Date.now(), name }]);
  };

  const handleColorChange = (value: string) => {
    console.log(value);
  };

  // Add update and view functionalities as needed

  return (
    <>
      <Head>
        <title>Gestione Categorie</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <div className="relative pt-36">
          <Container>
            <h1 className="text-3xl font-semibold mb-4">Categorie di utenti</h1>

            {/* Category List */}
            <ul>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <span>{category.name}</span>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div className="m-4">
              <ColorPicker change={handleColorChange} />
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="max-w-screen text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800"
            >
              Crea una nuova categoria
            </button>

            {/* Category Creation */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Create Category</h2>
              <input
                type="text"
                placeholder="Category Name"
                className="border p-2"
              />

              <button
                // onClick={() => handleCreate(/* pass the category name from input */)}
                className="bg-blue-500 text-white p-2 mt-2"
              >
                Create
              </button>
            </div>
          </Container>
          <CategoryFormModal
            show={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
      </main>
    </>
  );
}
