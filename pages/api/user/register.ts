import { User } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	const session = await getServerSession(req, res, authOptions);

	if (!session || session.user.role === 0) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	const { email, password, role, name, lastName } = req.body;

	if (email === '' || password === '' || name === '' || lastName === '') {
		res.status(400).json({ message: 'Missing arguments' });
		return;
	}

	try {
		// Check if the email is already registered
		const existingUser = await User.findByEmail(email);
		if (existingUser) {
			res.status(400).json({ message: 'Invalid email' });
			return;
		}

		// Create a new user in the database
		await User.createUser(email.toLowerCase(), password, role, name, lastName);

		res.status(201).json({ message: 'OK' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
}
