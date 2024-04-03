// Alexis Rossi, 27/01/2024
// The following code provides the methods about the category

import { CategoryTypeWithUsers, type CategoryType } from '@/types/category';
import { type RowDataPacket } from 'mysql2';
import { db } from '.';

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
		const [rows] = await db.promise().query<RowDataPacket[]>('SELECT * FROM categories WHERE id = ?', [id]);
		return rows[0] as CategoryType | undefined;
	},

	/**
	 *Searching for a category by name
	 */
	findByName: async (name: string): Promise<CategoryType | undefined> => {
		const [rows] = await db.promise().query<RowDataPacket[]>('SELECT * FROM categories WHERE name = ?', [name]);
		return rows[0] as CategoryType | undefined;
	},

	/**
	 * Creating a category defining all its values
	 */
	createCategory: async (name: string, description: string, colour: string): Promise<boolean> => {
		await db
			.promise()
			.query('INSERT INTO categories (name, description, colour) VALUES (?, ?, ?)', [name, description, colour]);
		return true;
	},

	/**
	 *
	 * @returns All the categories saved
	 */
	listAll: async (): Promise<CategoryType[]> => {
		const [rows] = await db.promise().query<RowDataPacket[]>('SELECT * FROM categories');
		return rows as CategoryType[];
	},

	/**
	 * Returns all the categories that are related to a post
	 * @param postId
	 */
	getByPostId: async (postId: number): Promise<CategoryType[]> => {
		const [rows] = await db
			.promise()
			.query<
				RowDataPacket[]
			>('SELECT c.* FROM categories c INNER JOIN post_targets pc ON c.id = pc.categoryId WHERE pc.postId = ?', [postId]);
		return rows as CategoryType[];
	},

	/**
	 * Edits a category.
	 */
	editCategory: async (id: number, name: string, description: string, colour: string): Promise<boolean> => {
		await db
			.promise()
			.query<
				RowDataPacket[]
			>('UPDATE categories SET name = ?, description = ?, colour = ? WHERE id = ?', [name, description, colour, id]);
		return true;
	},

	/**
	 * Deletes a category by a given id.
	 * @param id
	 */
	deleteCategory: async (id: number): Promise<void> => {
		await db.promise().query('DELETE FROM categories WHERE id = ?', [id]);
	},

	/**
	 * Returns all the categories with their audiences
	 */
	getCategoriesAndAudiences: async (): Promise<CategoryTypeWithUsers[] | undefined> => {
		const [rows] = await db.promise().query<RowDataPacket[]>(`
			SELECT
				c.id AS categoryId,
				c.name AS categoryName,
				c.description AS categoryDescription,
				c.colour AS categoryColour,
				a.id AS userId,
				a.email AS userEmail
			FROM
				categories c
			LEFT JOIN
				audiences a ON c.id = a.categoryId
		`);

		const categories: CategoryTypeWithUsers[] = [];
		rows.forEach((row) => {
			const category = categories.find((c) => c.id === row.categoryId);
			if (category) {
				category.users.push({
					id: row.userId,
					email: row.userEmail,
					categoryId: row.categoryId,
				});
			} else {
				categories.push({
					id: row.categoryId,
					name: row.categoryName,
					description: row.categoryDescription,
					colour: row.categoryColour,
					users: row.userId
						? [
								{
									id: row.userId,
									email: row.userEmail,
									categoryId: row.categoryId,
								},
							]
						: [],
				});
			}
		});
		return categories;
	},
};
