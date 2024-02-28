import { CategoryType } from "@/types/category";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export const useDeleteCategory = (category: CategoryType) => {
  const router = useRouter();

  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);

  const deleteCategory = useCallback(() => {
    setStatus("deleting");
    axios
      .delete(`/api/category/delete/${category?.id}`)
      .then(() => router.reload())
      .catch((error) => console.log(error))
      .finally(() => setStatus("idle"));
  }, [category?.id, router]);

  const handleModal = (confirm: boolean) => {
    if (confirm && status !== "deleting") {
      // delete the user
      deleteCategory();
    }
    setShowModal(false);
  };

  const toggleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowModal(!showModal);
  };

  return {
    showModal,
    status,
    handleModal,
    toggleModal,
  };
};
