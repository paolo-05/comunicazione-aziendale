import { User } from "@/models/userModel";
import isTokenExpired from "@/models/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { token, id } = req.body;
  console.log(token);
  console.log(id);

  if (id === "") {
    return res.status(400).json({ message: "id is required" });
  }
  try {
    isTokenExpired(token);
    const user = await User.findById(id);

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
