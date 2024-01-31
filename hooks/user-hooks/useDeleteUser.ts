import { UserSecure } from "@/types/types";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

/**
 * This hook handles the process of a user deletion
 * @param session the current admin session
 * @param user the user to delete
 * @returns utlities for showing modals
 */
export const useDeleteUser = (
  session: Session | null,
  user: UserSecure | null
) => {
  const areTheyTheSamePerson = user?.id === session?.user.id;
  const router = useRouter();

  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);

  const deleteUser = useCallback(() => {
    setStatus("deleting");
    axios
      .delete(`/api/user/delete/${user?.id}`)
      .then(() => router.reload())
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

  return { showModal, handleModal, toggleModal, status, areTheyTheSamePerson };
};
