import { User } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type ChangePasswordFormFields } from '@/types/user';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'PUT') {
		return res.status(405).end();
	}

	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	const { email, data }: { email: string; data: ChangePasswordFormFields } = req.body;

	if (!email || !data.oldPsw || !data.newPsw || !data.confirmPsw) {
		res.status(400).json({ error: 'Missing Arguments' });
		return;
	}
	try {
		const user = await User.findByEmail(session.user.email);

		if (!user) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		const passwordsMatch = await User.comparePassword(data.oldPsw, user.password);
		if (!passwordsMatch) {
			res.status(400).json({ error: 'Error with old password' });
			return;
		}

		await User.updatePassword(user.id, data.newPsw);

		res.status(201).json({ message: 'Password modifcata con successo.' });
	} catch (error) {
		res.status(500).json({ error: 'Error in server.' });
	}
}
