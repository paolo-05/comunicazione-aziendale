// pages/api/register.js
import { User } from "@/models/userModel";
import isTokenExpired from "@/models/verifyToken";
import { UserType } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { token, email, password, canModifyUsers, name, lastName } = req.body;

  try {
    isTokenExpired(token);

    if (email === "" || password === "" || name === "" || lastName === "") {
      return res
        .status(400)
        .json({ message: "I campi non possono essere vuoti" });
    }

    // Check if the email is already registered
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email già registrata" });
    }

    // Create a new user in the database
    await User.createUser(
      email.toLowerCase(),
      password,
      canModifyUsers,
      name,
      lastName
    );

    res.status(201).json({ message: "Utente registrato con successo" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
}
