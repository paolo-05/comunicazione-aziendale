// Alexis Rossi 31/1/2024
import { Category } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.status(405).end();
		return;
	}

	const session = await getServerSession(req, res, authOptions);

	if (session == null) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	try {
		const categories = await Category.listAll();

		res.status(200).json({ message: categories });
	} catch (err: any) {
		res.status(500).json({ error: 'Error in server' });
	}
}
