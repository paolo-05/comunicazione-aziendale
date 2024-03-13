// Alexis Rossi, Edoardo Barlassina 27-31/1/2024
import { Category } from "@/models";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { type CategoryAPIProps } from "@/types/category";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (session == null) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { data, selectedColor }: CategoryAPIProps = req.body;

  if (data.name == null || data.description == null || selectedColor == null) {
    res.status(400).json({ message: "Missing arguments" });
    return;
  }

  try {
    // Check if the name is already registered
    const existingCategory = await Category.findByName(data.name);
    if (existingCategory != null) {
      res.status(400).json({ message: "Invalid name" });
      return;
    }

    // Create a new Category in the database
    await Category.createCategory(data.name, data.description, selectedColor);

    res.status(201).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
