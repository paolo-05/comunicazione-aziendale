// Alexis Rossi 20/02/2024
import { Post } from "@/models/postModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // again, here no check if user is authenticated

  try {
    const posts = await Post.getNextFiveShort();

    return res.status(200).json({ message: posts });
  } catch (err: any) {
    return res.status(500).json({ error: "Error in server" });
  }
}
