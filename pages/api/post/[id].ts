import { Post } from "@/models/postModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // no session check here
  // the posts should be accessible to everyone.

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing arguments" });
  }

  try {
    const user = await Post.findById(parseInt(id.toString()));

    res.status(200).json({ message: user });
  } catch (err: any) {
    console.log(err);

    return res.status(500).json({ error: "Error in server" });
  }
}
