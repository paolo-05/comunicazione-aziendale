import { usePostForm } from "@/hooks/post";
import { PostFormProps } from "@/types/post";
import dynamic from "next/dynamic";
import Datepicker from "react-tailwindcss-datepicker";
import { UploadCoverImageModal } from ".";
import { useEffect, useState } from "react";
import { CategoryType } from "@/types/category";
import axios from "axios";

const CustomEditor = dynamic(
  () => {
    return import("@/components/customEditor/index");
  },
  { ssr: false }
);

export const PostForm = ({ initialData }: PostFormProps) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    range,
    handleRangeChange,
    rangeError,
    value,
    handleValueChange,
    showImageModal,
    handleModalChange,
    imageURL,
    handleImageUrlChange,
    imageURLError,
    valueError,
    editorData,
    handleEditorDataChange,
    editorError,
    isSubmitting,
  } = usePostForm({ initialData });

  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    axios
      .get("/api/category/list-all")
      .then((res) => setCategories(res.data.message));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg shadow dark:border-gray-700">
      <UploadCoverImageModal
        show={showImageModal}
        onClose={handleModalChange}
        setImageURL={handleImageUrlChange}
        imageURL={initialData?.imageURL || null}
      />

      <div className="py-8 px-10 mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Creazione nuovo annuncio
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-4">
            <div className="sm:col-span-2">
              <input type="hidden" id="id" {...register("id")} />
              <label
                htmlFor="titoloA"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Titolo (richiesto)
              </label>
              <input
                id="titoloA"
                {...register("title")}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Gita Aziendale"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="dataRange"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Range di visibilità
              </label>
              <Datepicker
                i18n="it"
                startFrom={new Date()}
                separator="~"
                placeholder="25/01/2023 ~ 26/02/2023"
                primaryColor="green"
                value={range}
                onChange={handleRangeChange}
                displayFormat="DD/MM/YYYY"
                startWeekOn="mon"
                inputId="dataRange"
                inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
              {rangeError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {rangeError}
                </p>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="dataStart"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Data effettiva evento
              </label>
              <Datepicker
                i18n="it"
                placeholder="25/12/2024"
                primaryColor="green"
                value={value}
                onChange={handleValueChange}
                displayFormat="DD/MM/YYYY"
                startWeekOn="mon"
                inputId="dataStart"
                useRange={false}
                asSingle={true}
                inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
              {valueError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {valueError}
                </p>
              )}
            </div>
            <div className="w-full">
              <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Immagine di copertina
              </span>
              <button
                type="button"
                className="text-white bg-secondary hover:bg-secondary/90 focus:ring-4 focus:outline-none focus:ring-secondary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-secondary/55 me-2 mb-2"
                onClick={handleModalChange}
              >
                <svg
                  className="w-6 h-6 mr-2 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M13 10c0-.6.4-1 1-1a1 1 0 1 1 0 2 1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12c0 .6-.2 1-.6 1.4a1 1 0 0 1-.9.6H4a2 2 0 0 1-2-2V6Zm6.9 12 3.8-5.4-4-4.3a1 1 0 0 0-1.5.1L4 13V6h16v10l-3.3-3.7a1 1 0 0 0-1.5.1l-4 5.6H8.9Z"
                    clipRule="evenodd"
                  />
                </svg>
                {initialData ? "Cambia Immagine" : "Carica"}
              </button>
              {imageURL && initialData?.imageURL !== imageURL && (
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Bene, hai caricato l&apos;immagine di copertina!
                </p>
              )}
              {imageURLError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {imageURLError}
                </p>
              )}
            </div>

            <div className="w-full">
              <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Descrizione
              </span>
              <div className=" max-w-full" id="descrizione">
                <CustomEditor
                  initialData={editorData}
                  setData={handleEditorDataChange}
                />
              </div>
              {editorError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {editorError}
                </p>
              )}
            </div>
            <div className="w-full">
              <span>Categorie Target</span>
              {categories &&
                categories.map((category) => (
                  <div key={category.id}>
                    <input
                      type="checkbox"
                      name={category.name}
                      id={category.name}
                    />
                    <label htmlFor={category.name}>{category.name}</label>
                  </div>
                ))}
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11h2v5m-2 0h4m-2.6-8.5h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Caricamento
              </>
            ) : initialData ? (
              <>
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2"
                  />
                </svg>
                Modifica
              </>
            ) : (
              <>
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Crea un nuovo annuncio
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
