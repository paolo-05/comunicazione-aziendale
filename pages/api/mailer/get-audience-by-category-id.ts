import { Audience } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.status(405).end();
		return;
	}

	const session = await getServerSession(req, res, authOptions);
	if (session == null) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	const { categoryId } = req.query;

	if (!categoryId) {
		res.status(400).json({ message: 'Missing required parameters' });
		return;
	}

	try {
		const audience = await Audience.getByCategoryId(Number(categoryId));
		res.status(200).json({ message: audience });
	} catch (error) {
		res.status(500).end();
	}
}
