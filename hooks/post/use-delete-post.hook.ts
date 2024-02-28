import { PostType } from "@/types/post";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export const useDeletePost = (post: PostType) => {
  const router = useRouter();

  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);

  const deletePost = useCallback(() => {
    setStatus("deleting");
    axios
      .delete(`/api/post/delete/${post?.id}`)
      .then(() => router.push("/dashboard"))
      .finally(() => setStatus("idle"));
  }, [post?.id, router]);

  const handleModal = (confirm: boolean) => {
    if (confirm && status !== "deleting") {
      // delete the user
      deletePost();
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
