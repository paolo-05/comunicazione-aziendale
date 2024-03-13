import { Post } from "@/models";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  // no session check here
  // the posts should be accessible to everyone.

  const { id } = req.query;

  if (id == null) {
    res.status(400).json({ error: "Missing arguments" });
    return;
  }

  try {
    const post = await Post.findById(parseInt(id.toString()));

    if (post == null) {
      res.status(404).end();
      return;
    }

    res.status(200).json({ message: post });
  } catch (err: any) {
    res.status(500).json({ error: "Error in server" });
  }
}
