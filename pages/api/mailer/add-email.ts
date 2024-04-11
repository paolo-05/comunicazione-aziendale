import { Audience } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}

	const session = await getServerSession(req, res, authOptions);

	if (session == null) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	const { email, selectedCategory } = req.body;

	if (!email || !selectedCategory) {
		res.status(400).end();
		return;
	}

	try {
		await Audience.createAudience(email, selectedCategory);
		res.status(201).end();
	} catch (error) {
		res.status(500).end();
	}
}
