import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/userModel";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email e Password Richieste" });
  }
  try {
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
    const cookies = cookie.serialize("token", token);
    return res
      .status(200)
      .json({ message: "Authentication successful", cookies });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
