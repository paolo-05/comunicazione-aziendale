import { User } from "@/models/userModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ChangePasswordFormFields } from "@/types/changePasswordTypes";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { email, data }: { email: string; data: ChangePasswordFormFields } =
    req.body;

  if (!email || !data.oldPsw || !data.newPsw || !data.confirmPsw) {
    return res.status(400).json({ error: "Missing Arguments" });
  }
  try {
    const user = await User.findByEmail(session.user.email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordsMatch = await User.comparePassword(
      data.oldPsw,
      user.password
    );
    if (!passwordsMatch) {
      return res.status(400).json({ error: "Error with old password" });
    }

    await User.updatePassword(user.id, data.newPsw);

    return res
      .status(201)
      .json({ message: "Password modifcata con successo." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in server." });
  }
}
