import { Post } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.status(405).end();
	}

	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	try {
		const lastEdits = await Post.getLastUpdates();

		res.status(200).json({ message: lastEdits });
	} catch (err: any) {
		res.status(500).json({ error: 'Error in server' });
	}
}
