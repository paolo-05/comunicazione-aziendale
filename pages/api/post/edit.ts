import { Post } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { PostType } from '@/types/post';
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

	const { id, title, description, actualDate, startDate, endDate, imageURL, targets } = req.body;

	if (
		!id ||
		title == null ||
		description == null ||
		actualDate == null ||
		startDate == null ||
		endDate == null ||
		imageURL == null ||
		targets == null
	) {
		res.status(400).json({ error: 'Missing Arguments' });
		return;
	}
	try {
		const post = await Post.findById(parseInt(id.toString()));
		if (!post) {
			res.status(404).json({ error: 'Not found' });
			return;
		}

		const postToEdit: PostType = {
			id: parseInt(id.toString()),
			title,
			description,
			actualDate: new Date(actualDate),
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			imageURL,
			targetIds: targets,
			creatorId: post.creatorId,
			lastModificatorId: session.user.id,
			created_at: post.created_at,
			updated_at: new Date(),
		};

		await Post.edit(postToEdit);

		res.status(201).json({ message: 'OK' });
	} catch (error) {
		res.status(500).json({ error: 'Error in server' });
	}
}
