import Modal from "@/components/ui/modal";
import { ItemProps } from "@/types/itemProps";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export default function DeleteUserButton({ user, session }: ItemProps) {
  const areTheyTheSamePerson = user?.id === session?.user.id;
  const router = useRouter();

  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);

  const deleteUser = useCallback(() => {
    setStatus("deleting");
    axios
      .post("/api/user/delete", {
        deletingId: user?.id,
      })
      .then(() => router.push("/user/list-all"))
      .catch((error) => console.log(error))
      .finally(() => setStatus("idle"));
  }, [router, user?.id]);

  const handleModal = (confirm: boolean) => {
    if (confirm) {
      // delete the user
      deleteUser();
    }
    setShowModal(false);
  };

  const toggleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowModal(!showModal);
  };

  return (
    <>
      <Modal
        id={`delete${user?.id}`}
        show={showModal}
        content="Procedere con l'eliminazione dell'utente?"
        discardText="Annulla"
        confirmText="Continua"
        confirmDisabled={status === "delete"}
        action={handleModal}
      />
      <div className="py-1">
        <button
          onClick={(e) => toggleModal(e)}
          className="block w-full text-left py-2 px-4 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
        >
          {areTheyTheSamePerson ? "Non eliminabile" : "Elimina"}
        </button>
      </div>
    </>
  );
}
