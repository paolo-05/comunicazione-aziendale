// Alexis Rossi 20/02/2024
// This endpoint creates a new Post

import { Post } from "@/models/postModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PostType } from "@/types/postType";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role === 0) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { title, description, actualDate, startDate, endDate } = req.body;

  if (!title || !description || !actualDate || !startDate || !endDate) {
    return res.status(400).json({ message: "Missing arguments" });
  }

  const post: PostType = {
    id: 0,
    title,
    description,
    actualDate,
    startDate,
    endDate,
    creatorId: session.user.id,
    lastModificatorId: 0,
  };

  try {
    // Create a new Category in the database
    await Post.createPost(post);

    res.status(201).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
