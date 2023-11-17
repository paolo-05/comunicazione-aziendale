import { User } from "@/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Non autorizzato" });
  }

  try {
    const users = await User.listAll();
    return res.status(200).json({ message: users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
