import { UserSecure } from "@/types/user";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
      await axios
        .get(`/api/user/${id}`)
        .then((res) => setUser(res.data.message))
        .catch(() => {
          {
            toast.error("Utente non trovato.");
            router.push("/dashboard");
          }
        });
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
