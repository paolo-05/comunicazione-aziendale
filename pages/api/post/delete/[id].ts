// Alexis Rossi 20/02/2024
// Here we delete the post object by given ID in the request.
import { Post } from "@/models/postModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing arguments" });
  }

  try {
    await Post.delete(parseInt(id.toString()));

    res.status(200).json({ message: "OK" });
  } catch (err: any) {
    return res.status(500).json({ error: "Error in server" });
  }
}
