import { useDeletePost } from "@/hooks/post";
import { type PostItemProps } from "@/types/post";
import React from "react";
import { Modal } from "../ui";

export default function DeletePostButton({
  post,
}: PostItemProps): React.ReactElement {
  const { showModal, status, handleModal, toggleModal } = useDeletePost(post);

  return (
    <>
      <Modal
        id={`delete${post?.id}`}
        show={showModal}
        content={`Procedere con l'eliminazione del post ${post?.title}?`}
        discardText="Annulla"
        confirmText="Continua"
        confirmDisabled={status === "delete"}
        action={handleModal}
      />

      <button
        onClick={toggleModal}
        type="button"
        className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5 mr-1.5 -ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        Elimina
      </button>
    </>
  );
}
