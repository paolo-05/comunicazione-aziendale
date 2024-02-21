// Paolo Bianchessi 21/2/2024
// this endpoint returns events to put in the calendar

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Post } from "@/models/postModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const posts = await Post.getCalendarizedEvents();

    return res.status(200).json({ message: posts });
  } catch (err: any) {
    return res.status(500).json({ error: "Error in server" });
  }
}
