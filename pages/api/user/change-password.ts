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
  const { token, id, oldPassword, newPassword, confirmPassword } = req.body;

  if (!id || !oldPassword || !newPassword || !confirmPassword) {
    console.log("campi vuoti");

    return res
      .status(400)
      .json({ message: "I campi non possono essere vuoti." });
  }
  try {
    const data = isTokenExpired(token);

    const user = await User.findByEmail(data.payload.email);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato." });
    }
    const passwordsMatch = await User.comparePassword(
      oldPassword,
      user.password
    );
    if (!passwordsMatch) {
      console.log("pass sbagliata");

      return res
        .status(400)
        .json({ message: "La vecchia password non coirrisponde." });
    }
    await User.updatePassword(id, newPassword);
    return res
      .status(201)
      .json({ message: "Password modifcata con successo." });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
}
