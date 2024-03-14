// Andrea Polli, 15/02/2024
// The following code provides the methods about the posts

import { type PostType, type RecentPostEdit } from '@/types/post';
import { type RowDataPacket } from 'mysql2';
import { db } from '.';

/**
 * This object is responsible for all the db interaction methods
 * about the Post
 */
export const Post = {
	/**
	 * Creating a post defining all its values.
	 */
	createPost: async (post: PostType): Promise<boolean> => {
		await db
			.promise()
			.query(
				'INSERT INTO posts (imageURL, title, description, actualDate, startDate, endDate, creatorId, lastModificatorId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
				[
					post.imageURL,
					post.title,
					post.description,
					post.actualDate,
					post.startDate,
					post.endDate,
					post.creatorId,
					post.creatorId,
				],
			);

		return true;
	},
	delete: async (id: number): Promise<void> => {
		await db.promise().query('DELETE FROM posts WHERE id = ?', [id]);
	},
	edit: async (
		id: number,
		imageURL: string,
		title: string,
		description: string,
		actualDate: Date,
		startDate: Date,
		endDate: Date,
		lastModificatorId: number,
	): Promise<boolean> => {
		await db
			.promise()
			.query<
				RowDataPacket[]
			>('UPDATE posts SET imageURL = ?, title = ?,  description = ?, actualDate = ?, startDate = ?, endDate = ?, lastModificatorId = ? WHERE id = ?', [imageURL, title, description, actualDate, startDate, endDate, lastModificatorId, id]);
		return true;
	},
	getNextFiveShort: async (): Promise<PostType[] | null> => {
		const [rows] = await db
			.promise()
			.query<
				RowDataPacket[]
			>('SELECT id, title, actualDate, startDate, endDate FROM posts WHERE actualDate >= CURDATE() ORDER BY actualDate LIMIT 5');
		return rows as PostType[] | null;
	},
	getCalendarizedEvents: async (): Promise<PostType[] | null> => {
		const [rows] = await db.promise().query('SELECT id, title, actualDate FROM posts');

		return rows as PostType[];
	},
	findById: async (id: number): Promise<PostType | undefined> => {
		const [rows] = await db.promise().query<RowDataPacket[]>('SELECT * FROM posts WHERE id = ?', [id]);

		return rows[0] as PostType | undefined;
	},
	listAll: async (): Promise<PostType[]> => {
		const [rows] = await db.promise().query<RowDataPacket[]>('SELECT * FROM posts');
		return rows as PostType[];
	},
	getLastUpdates: async (): Promise<RecentPostEdit[] | undefined> => {
		const [rows] = await db
			.promise()
			.query<
				RowDataPacket[]
			>('SELECT p.id, p.title, p.updated_at, a.name, a.lastName FROM posts p JOIN admins a ON p.lastModificatorId = a.id ORDER BY p.updated_at DESC LIMIT 5');
		return rows as RecentPostEdit[] | undefined;
	},
};
