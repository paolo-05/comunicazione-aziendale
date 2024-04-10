import { Post } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.status(405).end();
		return;
	}

	const { postId } = req.query;

	if (!postId) {
		res.status(400).end();
		return;
	}

	try {
		// get the next and previous posts ids
		// for the given post id
		const nextPostId = await Post.getNextPostId(Number(postId));
		const previousPostId = await Post.getPreviousPostId(Number(postId));
		res.status(200).json({
			nextPostId,
			previousPostId,
		});
	} catch (error) {
		console.log(error);

		res.status(500).end();
		return;
	}
}
