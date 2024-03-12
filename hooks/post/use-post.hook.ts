import { useRouter } from "next/router";
import { PostType } from "@/types/post";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/**
 * This hook fetches from the api a post by a given id.
 * @param id the post's id to fetch
 * @returns `PostType`
 */
export const usePost = (id: string | undefined | any) => {
  const router = useRouter();

  const [post, setPost] = useState<PostType | null>();

  useEffect(() => {
    const fetchPostData = async () => {
      await axios
        .get(`/api/post/${id}`)
        .then((res) => setPost(res.data.message))
        .catch(() => {
          toast.error("Evento non trovato.");
          router.push("/");
        });
    };

    if (id === undefined) return;

    fetchPostData();
  }, [id, router]);

  return {
    post,
  };
};
