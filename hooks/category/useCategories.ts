import { CategoryType } from "@/types/categoryTypes";
import axios from "axios";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryType | null>(
    null
  );

  useEffect(() => {
    axios.get("/api/category/list-all").then((res) => {
      setCategories(res.data.message);
    });
  }, []);

  const handleEditCategoryTabOpened = (category: CategoryType) => {
    setShowModal(true);

    setCategoryToEdit(category);
  };

  const handleCloseModal = () => {
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
