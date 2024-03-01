import { PostType } from "@/types/post";
import axios from "axios";
import { useEffect, useState } from "react";

export const useNextFivePots = () => {
  const [posts, setPosts] = useState<Array<PostType>>([]);

  useEffect(() => {
    axios
      .get("/api/post/get-next-five-sum")
      .then((res) => setPosts(res.data.message));
  }, []);

  return posts;
};
