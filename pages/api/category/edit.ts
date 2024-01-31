// Alexis Rossi
import { Category } from "@/models/categoryModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
//import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  /*
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role === 0) {
    return res.status(401).json({ error: "Unauthorized" });
  }
*/
  const { id, name, description, colour } = req.body;

  if (id <= 0 || !name || !description || !colour) {
    return res.status(400).json({ error: "Missing Arguments" });
  }
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Not found" });
    }

    const categoryWithExistingName = await Category.findByName(name);
    if (
      categoryWithExistingName &&
      category.id !== categoryWithExistingName.id
    ) {
      return res.status(400).json({ message: "Existing name" });
    }

    await Category.editCategory(id, name, description, colour);

    res.status(201).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ error: "Error in server" });
  }
}
