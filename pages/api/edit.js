// pages/api/register.js
import { User } from "@/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { id, email, oldPassword, password, power, name, lastName } = req.body;

  if (email === "" || power === "" || name === "" || lastName === "") {
    return res
      .status(400)
      .json({ message: "I campi non possono essere vuoti" });
  }

  if (password !== "") {
    const oldUser = await User.findById(id);
    // Check if the old password is correct
    const passwordsMatch = await User.comparePassword(
      oldUser.password,
      oldPassword
    );

    if (!passwordsMatch) {
      return res
        .status(401)
        .json({ message: "La vecchia password non corrisponde." });
    }
  }

  try {
    // Create a new user in the database
    await User.editUser(
      id,
      email.toLowerCase(),
      password,
      power,
      name,
      lastName
    );

    res.status(201).json({ message: "Utente modificato con successo" });
  } catch (error) {
    res.status(400).json({ message: "Errore nella modifica dell'utente" });
  }
}
