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

  const { token, id, email, canModifyUsers, name, lastName } = req.body;

  if (!id || !email || !canModifyUsers || !name || !lastName) {
    return res
      .status(400)
      .json({ message: "I campi non possono essere vuoti" });
  }
  try {
    isTokenExpired(token);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato." });
    }

    await User.editUser(id, email, canModifyUsers, name, lastName);

    res.status(201).json({ message: "Utente modificato con successo" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
