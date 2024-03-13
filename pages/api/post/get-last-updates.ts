import { Post } from "@/models/postModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const lastEdits = await Post.getLastUpdates();

    return res.status(200).json({ message: lastEdits });
  } catch (err: any) {
    return res.status(500).json({ error: "Error in server" });
  }
}
