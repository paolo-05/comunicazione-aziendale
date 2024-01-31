import { User } from "@/models/userModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role === 0) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id, email, role, name, lastName } = req.body;

  if (id <= 0 || !email || role === -1 || !name || !lastName) {
    return res.status(400).json({ error: "Missing Arguments" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Not found" });
    }

    const userWithExisintigMail = await User.findByEmail(email);
    if (userWithExisintigMail && user.id !== userWithExisintigMail.id) {
      return res.status(400).json({ message: "Existing Email" });
    }

    await User.editUser(id, email, role, name, lastName);

    res.status(201).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ error: "Error in server" });
  }
}
