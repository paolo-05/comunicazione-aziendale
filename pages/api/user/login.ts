// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/models/userModel";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  const user = await User.findByEmail(email.toLowerCase());

  if (!user) {
    return res.status(401).json({ message: "Email or password incorrect." });
  }

  const passwordsMatch = await User.comparePassword(password, user.password);

  if (!passwordsMatch) {
    return res.status(401).json({ message: "Email or password incorrect." });
  }

  // Create a JWT token
  const secret = "secret"; // Replace with the same secret used in the auth middleware
  const token = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });

  // Set HTTP-only cookie
  res.setHeader(
    "Set-Cookie",
    `token=${token}; Path=/; HttpOnly; SameSite=Strict; Secure`
  );

  res.status(200).json({ message: "Authentication successful" });
}
