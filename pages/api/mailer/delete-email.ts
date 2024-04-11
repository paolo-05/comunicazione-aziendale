import { Audience } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'DELETE') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const session = await getServerSession(req, res, authOptions);

	if (session == null) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	const { email, categoryId } = req.query;

	if (email == null || categoryId == null) {
		return res.status(400).json({ error: 'Missing arguments' });
	}

	try {
		// Delete the email from the database
		await Audience.deleteEmailFromAudience(Number(categoryId), email as string);

		return res.status(200).json({ message: 'OK' });
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}
}
