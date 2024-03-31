// Paolo Bianchessi 31/3/2024
// Here we send back the category objects by given post ID in the request.
import { Category } from '@/models';
import { type NextApiRequest, type NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.status(405).end();
		return;
	}

	const { postId } = req.query;

	if (postId == null) {
		res.status(400).json({ error: 'Missing arguments' });
		return;
	}

	try {
		const categories = await Category.getByPostId(parseInt(postId.toString()));

		res.status(200).json({ message: categories });
	} catch (err: any) {
		res.status(500).json({ error: 'Error in server' });
	}
}
