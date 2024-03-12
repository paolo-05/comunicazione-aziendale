import { UserSecure } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/**
 * This hook fetches the users and handles alert for CRUD operations
 * @returns an array containing the users
 */
export const useUserList = () => {
  const router = useRouter();

  const [users, setUsers] = useState<Array<UserSecure> | null>(null);

  useEffect(() => {
    axios
      .get("/api/user/list-all")
      .then((response: any) => {
        const users: Array<UserSecure> = response.data.message;
        setUsers(users);
      })
      .catch(() => toast.error("Network error"));
  }, []);

  return {
    users,
  };
};
