import { Post } from "@/models/postModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
//import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }
  /*
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role === 0) {
    return res.status(401).json({ error: "Unauthorized" });
  }
*/
  const { id, title, description, startDate, endDate } = req.body;

  if (!id || !title || !description || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing Arguments" });
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Not found" });
    }

    await Post.editUser(id, title, description, startDate, endDate);

    res.status(201).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ error: "Error in server" });
  }
}
