import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

/**
 * This Hooks is responsible to check if a user is authenticated
 * @returns a session object from NextAuth
 */
export const useUnrestrictedSession = () => {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      signIn();
    },
  });

  return session;
};
