import { type Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";

/**
 * This Hooks is responsible to check if a user is authenticated
 * @returns a session object from NextAuth
 */
export const useUnrestrictedSession = (): Session | null => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      void signIn();
    },
  });

  return session;
};
