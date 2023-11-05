// pages/api/register.js
import { User } from "@/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password, power, name, lastName } = req.body;

  if (
    email === "" ||
    password === "" ||
    power === "" ||
    name === "" ||
    lastName === ""
  ) {
    return res
      .status(400)
      .json({ message: "I campi non possono essere vuoti" });
  }

  // Check if the email is already registered
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email già registrata" });
  }

  try {
    // Create a new user in the database
    await User.createUser(email.toLowerCase(), password, power, name, lastName);

    res.status(201).json({ message: "Utente registrato con successo" });
  } catch (error) {
    res.status(400).json({ message: "Errore nella registrazione dell'utente" });
  }
}
