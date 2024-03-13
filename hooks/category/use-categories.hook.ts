import { type CategoryType } from "@/types/category";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useCategories = (): {
  categories: CategoryType[];
  showModal: boolean;
  categoryToEdit: CategoryType | null;
  handleEditCategoryTabOpened: (category: CategoryType) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseModal: () => void;
} => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryType | null>(
    null,
  );

  useEffect(() => {
    axios
      .get("/api/category/list-all")
      .then((res) => {
        setCategories(res.data.message as CategoryType[]);
      })
      .catch(() => toast.error("Network error"));
  }, []);

  const handleEditCategoryTabOpened = (category: CategoryType): void => {
    setShowModal(true);

    setCategoryToEdit(category);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setCategoryToEdit(null);
  };

  return {
    categories,
    showModal,
    categoryToEdit,
    handleEditCategoryTabOpened,
    setShowModal,
    handleCloseModal,
  };
};
