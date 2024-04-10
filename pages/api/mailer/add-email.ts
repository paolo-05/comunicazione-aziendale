import { Audience } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}

	const { email, selectedCategory } = req.body;

	if (!email || !selectedCategory) {
		res.status(400).end();
		return;
	}

	try {
		await Audience.createAudience(email, selectedCategory);
		res.status(201).end();
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}
