// Alexis Rossi 31/1/2024
// Here we send back the category object by given ID in the request.
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

	const { id } = req.query;

	if (id == null) {
		res.status(400).json({ error: 'Missing arguments' });
		return;
	}

	try {
		const post = await Category.findById(parseInt(id.toString()));

		res.status(200).json({ message: post });
	} catch (err: any) {
		res.status(500).json({ error: 'Error in server' });
	}
}
