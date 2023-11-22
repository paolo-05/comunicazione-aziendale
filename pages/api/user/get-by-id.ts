// Paolo Bianchessi, 8/11/2023
// Here we send back the user object by given ID in the request.
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

  const { token, id } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Non autorizzato" });
  }
  if (!id) {
    return res.status(400).json({ message: "ID richiesto" });
  }

  try {
    isTokenExpired(token);
    const user = await User.findById(id);

    res.status(200).json({ message: user });
  } catch (err: any) {
    return res.status(500).json({ message: err });
  }
}
