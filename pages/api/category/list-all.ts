// Alexis Rossi 31/1/2024
import { Category } from "@/models/categoryModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role === 0) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const categories = await Category.listAll();

    return res.status(200).json({ message: categories });
  } catch (err: any) {
    return res.status(500).json({ error: "Error in server" });
  }
}
