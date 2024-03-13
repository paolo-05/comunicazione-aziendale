import { UserSecure } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/**
 * This hook fetches the users and handles alert for CRUD operations
 * @returns an array containing the users
 */
export const useUserList = () => {
  const [users, setUsers] = useState<Array<UserSecure> | null>(null);

  useEffect(() => {
    axios
      .get("/api/user/list-all")
      .then((res) => {
        const users: Array<UserSecure> = res.data.message;
        setUsers(users);
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status !== 401) {
          toast.error("Network Error");
        }
      });
  }, []);

  return {
    users,
  };
};
