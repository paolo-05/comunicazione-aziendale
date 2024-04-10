import { PostPreviewTemplate } from '@/mailer';
import { Audience, Post, resend } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	const { targetsIds, postId } = req.body;

	if (!targetsIds || !postId) {
		return res.status(400).json({ message: 'Invalid request' });
	}

	const post = await Post.findById(postId);

	if (!post) {
		return res.status(404).json({ message: 'Post not found' });
	}

	// Send the post to the audience
	const targets: string[] = [];

	for (const id of targetsIds) {
		const audience = await Audience.getByCategoryId(id);

		audience.forEach((target) => {
			if (!targets.includes(target.email)) {
				targets.push(target.email);
			}
		});
	}

	if (targets.length === 0) {
		return res.status(404).json({ message: 'No audience found' });
	}

	await resend.emails.send({
		from: 'News <news@posijar.com>',
		to: targets,
		subject: 'È stato pubblicato un nuovo annuncio che ti riguarda!',
		text: 'È stato pubblicato un nuovo annuncio che ti riguarda!',
		react: PostPreviewTemplate({ post }),
	});

	res.status(200).json({ message: 'Post sent to audience' });
}
