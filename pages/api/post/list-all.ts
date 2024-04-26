// Alexis Rossi 31/1/2024
import { Post } from '@/models';
import { type NextApiRequest, type NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	try {
		const posts = await Post.listAll();

		res.status(200).json({ message: posts });
	} catch (err: any) {
		console.log(err);

		res.status(500).json({ error: 'Error in server' });
	}
}
