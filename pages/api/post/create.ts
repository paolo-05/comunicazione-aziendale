// Alexis Rossi 20/02/2024
// This endpoint creates a new Post

import { Post } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type PostType } from '@/types/post';
import axios from 'axios';
import { log } from 'console';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

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

	const { title, description, actualDate, startDate, endDate, imageURL, targets } = req.body;

	if (
		title == null ||
		description == null ||
		actualDate == null ||
		startDate == null ||
		endDate == null ||
		imageURL == null ||
		targets == null
	) {
		res.status(400).json({ message: 'Missing arguments' });
		return;
	}

	const post: PostType = {
		id: 0,
		imageURL,
		title,
		description,
		actualDate,
		startDate,
		endDate,
		targetIds: targets,
		creatorId: session.user.id,
		lastModificatorId: 0,
		created_at: new Date(),
		updated_at: new Date(),
	};

	try {
		// Create a new Category in the database
		const postId = await Post.createPost(post);

		await axios.post(`${process.env.NEXTAUTH_URL}/api/mailer/send-post-to-audience`, {
			targetsIds: targets,
			postId: postId,
		});

		res.status(201).json({ message: 'OK' });
	} catch (error) {
		log(error);
		res.status(500).json({ message: 'Error in server' });
	}
}
