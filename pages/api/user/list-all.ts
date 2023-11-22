import { User } from "@/models/userModel";
import isTokenExpired from "@/models/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Non autorizzato" });
  }

  try {
    isTokenExpired(token);
    const users = await User.listAll();
    return res.status(200).json({ message: users });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
