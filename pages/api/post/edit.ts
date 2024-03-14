import { Post } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'PUT') {
		return res.status(405).end();
	}

	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	const { id, title, description, actualDate, startDate, endDate, imageURL } = req.body;

	if (!id || !title || !description || !startDate || !endDate) {
		res.status(400).json({ error: 'Missing Arguments' });
		return;
	}
	try {
		const post = await Post.findById(parseInt(id.toString()));
		if (!post) {
			res.status(404).json({ error: 'Not found' });
			return;
		}

		await Post.edit(
			parseInt(id.toString()),
			imageURL,
			title,
			description,
			new Date(actualDate),
			new Date(startDate),
			new Date(endDate),
			session.user.id,
		);

		res.status(201).json({ message: 'OK' });
	} catch (error) {
		res.status(500).json({ error: 'Error in server' });
	}
}
