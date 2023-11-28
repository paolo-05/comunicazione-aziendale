// Paolo Bianchessi, 2/11/2023
// This is the resolve API endpoint, using the jwt library
// we verify the user's token

import { User } from "@/models/userModel";
import isTokenExpired from "@/models/verifyToken";
import cookie from "cookie";
import jwt from "jsonwebtoken";
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

    // Re-generate the token so the session doesn't end
    const secret = "secret"; // Replace with the same secret used in the auth middleware
    const newToken = jwt.sign({ email: user.email }, secret, {
      expiresIn: "1h",
    });
    const cookies = cookie.serialize("token", newToken);
    res.status(200).json({ message: user, cookies });
  } catch (err) {
    res.status(401).json({ message: err });
  }
}
