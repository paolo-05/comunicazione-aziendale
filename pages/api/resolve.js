// Paolo Bianchessi, 2/11/2023
// This is the resolve API endpoint, using the jwt library
// we verify the user's token
import { User } from "@/models/userModel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Non autorizzato" });
  }

  try {
    const data = jwt.verify(token, "secret");

    // Check if the token has expired
    if (data.exp && data.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ message: "Autorizzazione scaduta" });
    }

    const email = data.email.toLowerCase();
    const user = await User.findByEmail(email);

    res.status(200).json({ message: user });
  } catch (err) {
    return res.status(401).json({ message: "Non autorizzato" });
  }
}
