// Paolo Bianchessi 21/2/2024
// this endpoint returns events to put in the calendar

import { Post } from '@/models';
import { type NextApiRequest, type NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  // no session check here
  // the posts should be accessible to everyone.

  try {
    const posts = await Post.getCalendarizedEvents();

    res.status(200).json({ message: posts });
  } catch (err: any) {
    res.status(500).json({ error: 'Error in server' });
  }
}
