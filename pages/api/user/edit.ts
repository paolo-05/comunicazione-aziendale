import { User } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role === 0) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { id, email, role, name, lastName } = req.body;

  if (!id || !email || role === -1 || !name || !lastName) {
    res.status(400).json({ error: 'Missing Arguments' });
    return;
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    const userWithExistingMail = await User.findByEmail(email);
    if (userWithExistingMail && user.id !== userWithExistingMail.id) {
      res.status(400).json({ message: 'Existing Email' });
      return;
    }

    await User.editUser(id, email, role, name, lastName);

    res.status(201).json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ error: 'Error in server' });
  }
}
