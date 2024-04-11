import { AudienceType } from '@/types/audience';
import { RowDataPacket } from 'mysql2';
import { db } from '.';

export const Audience = {
	/**
	 * Searching for an audience by an id
	 * @param id the id we're searching
	 * @returns an audience tuple if found otherwise null
	 */
	findById: async (id: number): Promise<AudienceType | undefined> => {
		const [rows] = await db.promise().query<RowDataPacket[]>('SELECT * FROM audiences WHERE id = ?', [id]);
		return rows[0] as AudienceType | undefined;
	},

	/**
	 * Searching for an audience by email
	 * @param email the email we're searching
	 */
	findByEmail: async (email: string): Promise<AudienceType | undefined> => {
		const [rows] = await db.promise().query<RowDataPacket[]>('SELECT * FROM audiences WHERE email = ?', [email]);
		return rows[0] as AudienceType | undefined;
	},

	/**
	 * Creating an audience defining all its values
	 */
	createAudience: async (email: string, categoryId: number): Promise<boolean> => {
		await db.promise().query('INSERT INTO audiences (email, categoryId) VALUES (?, ?)', [email, categoryId]);
		return true;
	},

	/**
	 *
	 * @returns All the audiences saved
	 */
	listAll: async (): Promise<AudienceType[]> => {
		const [rows] = await db.promise().query<RowDataPacket[]>('SELECT * FROM audiences');
		return rows as AudienceType[];
	},

	/**
	 * Returns all the audiences that are related to a category
	 * @param categoryId the id of the category we're searching
	 */
	getByCategoryId: async (categoryId: number): Promise<AudienceType[]> => {
		const [rows] = await db
			.promise()
			.query<RowDataPacket[]>('SELECT * FROM audiences WHERE categoryId = ?', [categoryId]);
		return rows as AudienceType[];
	},

	/**
	 * deletes an audience.
	 * @param id the id of the audience we're deleting
	 */
	deleteEmailFromAudience: async (categoryId: number, email: string): Promise<boolean> => {
		await db.promise().query('DELETE FROM audiences WHERE categoryId = ? AND email = ?', [categoryId, email]);
		return true;
	},
};
