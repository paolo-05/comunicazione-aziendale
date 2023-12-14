import axios from "axios";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/router";

export default function Delete({ id, token }: { id: number; token: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [deletingID, setDeletingID] = useState<number | null>(null);
  const deleteUser = (id: number) => {
    setLoading(true);
    axios
      .post("/api/user/delete", {
        token: token,
        id: id,
      })
      .then(() => router.reload())
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };
  const handleModal = (confirm: boolean) => {
    if (confirm && deletingID) {
      // delete the user
      deleteUser(deletingID);
    }
  };
  return (
    <>
      <Modal
        id="deleteUser"
        title="Attenzione!"
        description="L'eliminazione di un utente è un'azione irreversibile."
        discardText="Annulla"
        saveText="Ho capito. Voglio proseguire"
        action={handleModal}
      />
      <button
        data-bs-toggle="modal"
        data-bs-target="#deleteUser"
        type="button"
        className="btn btn-danger"
        disabled={loading}
        onClick={(e) => setDeletingID(id)}
      >
        Elimina
      </button>
    </>
  );
}
