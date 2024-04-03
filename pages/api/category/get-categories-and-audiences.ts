import { Category } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	const session = await getServerSession(req, res, authOptions);

	if (session == null) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	try {
		const categoriesWithUsers = await Category.getCategoriesAndAudiences();
		return res.status(200).json({ message: categoriesWithUsers });
	} catch (error) {
		console.log(error);
		return res.status(500).end();
	}
}
