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

  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: "Missing Arguments" });
  }
  try {
    const user = await User.findByEmail(session.user.email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordsMatch = await User.comparePassword(
      oldPassword,
      user.password
    );
    if (!passwordsMatch) {
      return res.status(400).json({ errro: "Error with old password" });
    }

    await User.updatePassword(user.id, newPassword);

    return res
      .status(201)
      .json({ message: "Password modifcata con successo." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in server." });
  }
}
