// Paolo Bianchessi, 2/11/2023
// This is the resolve API endpoint, using the jwt library
// we verify the user's token

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
    const data = isTokenExpired(token);
    const email = data.payload.email.toLowerCase();
    const userAll = await User.findByEmail(email);
    if (!userAll) {
      throw new Error("User not found");
    }
    const user = {
      id: userAll.id,
      email: userAll.email,
      canModifyUsers: userAll.canModifyUsers,
      name: userAll.name,
      lastName: userAll.lastName,
    };
    res.status(200).json({ message: user });
  } catch (err) {
    res.status(401).json({ message: err });
  }
}
