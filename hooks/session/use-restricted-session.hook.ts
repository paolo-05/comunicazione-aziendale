import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

/**
 * This Hooks is responsible to check if a user is authenticated and if he has the admin role
 * @returns a session object from NextAuth
 */
export const useRestrictedSession = () => {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      signIn();
    },
  });

  if (session?.user.role == 0) {
    router.push("/dashboard");
  }

  return session;
};
