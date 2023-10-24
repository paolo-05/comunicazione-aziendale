// pages/api/register.js
import User from "@/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password, name, lastName } = req.body;

  // Check if the email is already registered
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  try {
    // Create a new user in the database
    await User.createUser(email.toLowerCase(), password, name, lastName);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
