// pages/api/login.js
import jwt from "jsonwebtoken";
import { User } from "@/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  const user = await User.findByEmail(email.toLowerCase());

  if (!user) {
    return res.status(401).json({ message: "Email o password errate." });
  }

  const passwordsMatch = await User.comparePassword(password, user.password);

  if (!passwordsMatch) {
    return res.status(401).json({ message: "Email o password errate." });
  }

  // Create a JWT token
  const secret = "secret"; // Replace with the same secret used in the auth middleware
  const token = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });

  res.status(200).json({ message: token });
}
