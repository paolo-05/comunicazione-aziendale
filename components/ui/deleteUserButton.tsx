import axios from "axios";
import { useCallback, useState } from "react";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/router";
import { UserSecure } from "@/types";

type DeleteUserButtonProps = {
  token: string;
  activeAdmin: UserSecure | null;
  userToDelete: UserSecure;
};

export default function DeleteUserButton({
  token,
  activeAdmin,
  userToDelete,
}: DeleteUserButtonProps) {
  const areTheyTheSamePerson = activeAdmin?.id === userToDelete.id;
  const router = useRouter();

  const deleteUser = useCallback(() => {
    axios
      .post("/api/user/delete", {
        token: token,
        id: userToDelete.id,
      })
      .then(() => router.reload())
      .catch((error) => {
        console.log(error);
      });
  }, [router, token, userToDelete.id]);
  const handleModal = (confirm: boolean) => {
    if (confirm) {
      // delete the user
      deleteUser();
    }
  };
  return (
    <>
      <Modal
        id={`deleteUser${userToDelete.id}`}
        title="Attenzione!"
        description="L'eliminazione di un utente è un'azione irreversibile."
        discardText="Annulla"
        saveText="Ho capito. Voglio proseguire"
        action={handleModal}
      />
      <button
        data-bs-toggle="modal"
        data-bs-target={`#deleteUser${userToDelete.id}`}
        type="button"
        className="btn btn-danger"
        disabled={areTheyTheSamePerson}
      >
        Elimina
      </button>
    </>
  );
}
