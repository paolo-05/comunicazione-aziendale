import { RecentPostEdit } from "@/types/post";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useLastEdits = () => {
  const [lastEdits, setLastEdits] = useState<Array<RecentPostEdit>>([]);

  useEffect(() => {
    axios
      .get("/api/post/get-last-updates")
      .then((res) => setLastEdits(res.data.message))
      .catch(() => toast.error("Network error"));
  }, []);

  return { lastEdits };
};
