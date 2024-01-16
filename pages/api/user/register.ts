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

  const { email, password, canModifyUsers, name, lastName } = req.body;

  if (email === "" || password === "" || name === "" || lastName === "") {
    return res.status(400).json({ message: "Missing arguments" });
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Create a new user in the database
    await User.createUser(
      email.toLowerCase(),
      password,
      canModifyUsers,
      name,
      lastName
    );

    res.status(201).json({ message: "OK" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
}
