import { type Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * This Hooks is responsible to check if a user is authenticated and if he has the admin role
 * @returns a session object from NextAuth
 */
export const useRestrictedSession = () => {
	const router = useRouter();

	const { data: session } = useSession({
		required: true,
		onUnauthenticated: () => {
			void signIn();
		},
	});

	useEffect(() => {
		if (session?.user.role === 0) {
			void router.push('/dashboard');
			toast.info('Non hai il permesso di accedere a questa parte.');
		}
	}, [router, session?.user.role]);

	return session;
};
