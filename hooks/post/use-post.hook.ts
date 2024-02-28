import { PostType } from "@/types/post";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * This hook fetches from the api a post by a given id.
 * @param id the post's id to fetch
 * @returns `PostType`
 */
export const usePost = (id: string | undefined | any) => {
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await axios.get(`/api/post/${id}`);
        setPost(res.data.message);
      } catch (err) {
        console.log(err);
      }
    };

    if (id === undefined) return;

    fetchPostData();
  }, [id]);

  return {
    post,
  };
};
