// Alexis Rossi, Edoardo Barlassina 31/1/2024
import { Category } from "@/models/categoryModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { CategoryAPIProps } from "@/types/category";
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

  if (!session || session.user.role === 0) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data, selectedColor }: CategoryAPIProps = req.body;

  if (!data.id || !data.name || !data.description || !selectedColor) {
    return res.status(400).json({ error: "Missing Arguments" });
  }
  try {
    const category = await Category.findById(data.id);
    if (!category) {
      return res.status(404).json({ error: "Not found" });
    }

    const categoryWithExistingName = await Category.findByName(data.name);
    if (
      categoryWithExistingName &&
      category.id !== categoryWithExistingName.id
    ) {
      return res.status(400).json({ message: "Existing name" });
    }

    await Category.editCategory(
      data.id,
      data.name,
      data.description,
      selectedColor
    );

    res.status(201).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ error: "Error in server" });
  }
}
