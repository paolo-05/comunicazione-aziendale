// Paolo Bianchessi, 8/11/2023
// Here we send back the user object by given ID in the request.

import { User } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role === 0) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Missing arguments' });
    return;
  }

  try {
    const user = await User.findById(parseInt(id.toString()));

    if (!user) {
      return res.status(404).end();
    }

    res.status(200).json({ message: user });
  } catch (err: any) {
    res.status(500).json({ error: 'Error in server' });
  }
}
