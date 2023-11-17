// 9/11/2023 this API endpoint deletes a user by a given ID.

import { User } from "@/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { id } = req.body;
  if (id === "") {
    return res.status(400).json({ message: "id is required" });
  }
  try {
    const user = await User.findById(id);
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
}
