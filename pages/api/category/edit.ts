// Alexis Rossi, Edoardo Barlassina 31/1/2024
import { Category } from "@/models";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { type CategoryAPIProps } from "@/types/category";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "PUT") {
    res.status(405).end();
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (session == null) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { data, selectedColor }: CategoryAPIProps = req.body;

  if (
    data.id == null ||
    data.name == null ||
    data.description == null ||
    selectedColor == null
  ) {
    res.status(400).json({ error: "Missing Arguments" });
    return;
  }
  try {
    const category = await Category.findById(data.id);
    if (category == null) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    const categoryWithExistingName = await Category.findByName(data.name);
    if (
      categoryWithExistingName != null &&
      category.id !== categoryWithExistingName.id
    ) {
      res.status(400).json({ message: "Existing name" });
      return;
    }

    await Category.editCategory(
      data.id,
      data.name,
      data.description,
      selectedColor,
    );

    res.status(201).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ error: "Error in server" });
  }
}
