// Alexis Rossi 27/1/2024
import { Category } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'DELETE') {
		res.status(405).end();
		return;
	}

	const session = await getServerSession(req, res, authOptions);

	if (session == null) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	const { id } = req.query;

	if (id == null) {
		res.status(400).json({ error: 'Missing arguments' });
		return;
	}

	try {
		await Category.deleteCategory(parseInt(id.toString()));
		res.status(200).json({ message: 'OK' });
	} catch (error) {
		res.status(500).json({ error: 'Error in server' });
	}
}
