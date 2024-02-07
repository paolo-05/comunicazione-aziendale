import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => {
    return import("@/components/customEditor");
  },
  { ssr: false }
);

export const PostForm = () => {
  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg shadow dark:border-gray-700">
      <div className="py-8 px-10 mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Aggiunta nuovo annuncio
        </h2>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="titoloA"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Titolo
              </label>
              <input
                type="text"
                name="titoloA"
                id="titolo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Titolo Annuncio"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="dataStart"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Aggiungi Data Inizio Annuncio
              </label>
              <input
                type="date"
                name="data"
                id="data"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="startDate"
                required
              />
            </div>
            <div>
              <label
                htmlFor="dataFine"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Aggiungi Data Fine Annuncio
              </label>
              <input
                type="date"
                name="data"
                id="data"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="startDate"
                required
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Descrizione
              </label>
              <div className=""></div>
              <CustomEditor initialData="<h1></h1>" />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Aggiungi annuncio
          </button>
        </form>
      </div>
    </section>
  );
};
