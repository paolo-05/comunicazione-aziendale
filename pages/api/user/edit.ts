import { User } from "@/models/userModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id, email, canModifyUsers, name, lastName } = req.body;

  if (!id || !email || !canModifyUsers || !name || !lastName) {
    return res
      .status(400)
      .json({ message: "I campi non possono essere vuoti" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato." });
    }

    const userWithExisintigMail = await User.findByEmail(email);
    if (userWithExisintigMail && user.id !== userWithExisintigMail.id) {
      return res.status(400).json({ message: "Email non valida." });
    }

    await User.editUser(id, email, canModifyUsers, name, lastName);

    res.status(201).json({ message: "Utente modificato con successo" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
}
