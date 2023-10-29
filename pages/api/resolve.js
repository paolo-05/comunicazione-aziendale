// pages/api/resolve.js
import jwt from "jsonwebtoken";
import { User } from "@/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Non autorizzato" });
  }

  const user = await User.findByEmail(jwt.decode(token).email.toLowerCase());

  res.status(200).json({ message: user });
}
