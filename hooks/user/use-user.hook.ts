import { type UserSecure } from "@/types/user";
import axios from "axios";
import { type Session } from "next-auth";
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
  session: Session | null,
): {
  user: UserSecure | null;
} => {
  const router = useRouter();

  const [user, setUser] = useState<UserSecure | null>(null);

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      await axios
        .get(`/api/user/${id}`)
        .then((res) => {
          setUser(res.data.message as UserSecure | null);
        })
        .catch(() => {
          toast.error("Utente non trovato.");
          void router.push("/dashboard");
        });
    };

    if (id === undefined) return;

    if (id === session?.user.id) {
      void router.push("/dashboard");
    } else {
      void fetchUserData();
    }
  }, [id, router, session?.user.id]);

  return {
    user,
  };
};
