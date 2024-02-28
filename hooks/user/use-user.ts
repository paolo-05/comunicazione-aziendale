import { UserSecure } from "@/types/user";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * This hook fetches from the api a user by a given id.
 * @param id the user's id to fetch
 * @param session the current admin session
 * @returns `UserSecure`
 */
export const useUser = (
  id: string | undefined | any,
  session: Session | null
) => {
  const router = useRouter();

  const [user, setUser] = useState<UserSecure | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/user/${id}`);
        setUser(res.data.message);
      } catch (err) {
        console.log(err);
      }
    };

    if (id === undefined) return;

    if (id === session?.user.id) {
      router.push("/dashboard");
    } else {
      fetchUserData();
    }
  }, [id, router, session?.user.id]);

  return {
    user,
  };
};
