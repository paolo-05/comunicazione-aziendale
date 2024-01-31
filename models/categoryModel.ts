// Alexis Rossi, 27/01/2024
// The following code provides the methods about the category

import bcrypt from "bcrypt";
import { db } from "./db";
import { RowDataPacket } from "mysql2";
import { CategoryType } from "@/types/categoryType";

/**
 * This object is responsible for all the db interaction methods
 * about the category
 */
export const Category = {
  /**
   * Searching for a category by an id
   * @param id the id we're searching
   * @returns a category tuple if found otherwise null
   */
  findById: async (id: number): Promise<CategoryType | undefined> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0] as CategoryType | undefined;
  },
  /**
   * Creating a category defining all its values
   */
  createCategory: async (
    name: string,
    description: string,
    colour: string
  ): Promise<boolean> => {
    await db
      .promise()
      .query(
        "INSERT INTO categories (name, description, colour) VALUES (?, ?, ?)",
        [name, description, colour]
      );
    return true;
  },
  /**
   *
   * @returns All the categories saved
   */
  listAll: async (): Promise<CategoryType[]> => {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>("SELECT * FROM categories");
    return rows as CategoryType[];
  },
  editCategory: async (
    id: number,
    name: string,
    description: string,
    colour: string
  ): Promise<boolean> => {
    await db
      .promise()
      .query<RowDataPacket[]>(
        "UPDATE categories SET name = ?, description = ?, colour = ? WHERE id = ?",
        [name, description, colour, id]
      );
    return true;
  },
  deleteCategory: async (id: number): Promise<void> => {
    await db.promise().query("DELETE FROM categories WHERE id = ?", [id]);
  },
};