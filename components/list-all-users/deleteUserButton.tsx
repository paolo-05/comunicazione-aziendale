import Modal from "@/components/ui/modal";
import { useDeleteUser } from "@/hooks/user";
import { UserItemProps } from "@/types/user";

export default function DeleteUserButton({ user, session }: UserItemProps) {
  const { showModal, handleModal, toggleModal, status, areTheyTheSamePerson } =
    useDeleteUser(session, user);

  return (
    <>
      <Modal
        id={`delete${user?.id}`}
        show={showModal}
        content={`Procedere con l'eliminazione dell'utente ${user?.name} ${user?.lastName}?`}
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
