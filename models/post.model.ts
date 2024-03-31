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
					post.creatorId, // Assuming creatorId is the same as lastModificatorId for the initial creation
				],
			);

		// Retrieve the last inserted ID using LAST_INSERT_ID()
		const [result] = await db.promise().query<RowDataPacket[]>('SELECT LAST_INSERT_ID() as id FROM posts');
		const insertedId = result[0].id as number;

		post.targetIds.forEach(async (target) => {
			await db.promise().query('INSERT INTO post_targets (postId, categoryId) VALUES (?, ?)', [insertedId, target]);
		});

		return true;
	},
	/**
	 * Deleting a post by its id
	 */
	delete: async (id: number): Promise<void> => {
		await db.promise().query('DELETE FROM posts WHERE id = ?', [id]);
	},
	/**
	 * Editing a post by its id
	 */
	edit: async (post: PostType): Promise<boolean> => {
		await db
			.promise()
			.query(
				'UPDATE posts SET imageURL = ?, title = ?,  description = ?, actualDate = ?, startDate = ?, endDate = ?, lastModificatorId = ? WHERE id = ?',
				[
					post.imageURL,
					post.title,
					post.description,
					post.actualDate,
					post.startDate,
					post.endDate,
					post.lastModificatorId,
					post.id,
				],
			);

		// Delete all the previous targets
		await db.promise().query('DELETE FROM post_targets WHERE postId = ?', [post.id]);

		// Insert the new targets
		post.targetIds.forEach(async (target) => {
			await db.promise().query('INSERT INTO post_targets (postId, categoryId) VALUES (?, ?)', [post.id, target]);
		});

		return true;
	},
	/**
	 * Retrieve the next 5 posts
	 */
	getNextFiveShort: async (): Promise<PostType[] | null> => {
		const [rows] = await db
			.promise()
			.query<
				RowDataPacket[]
			>('SELECT id, title, actualDate, startDate, endDate FROM posts WHERE actualDate >= CURDATE() ORDER BY actualDate LIMIT 5');
		return rows as PostType[] | null;
	},
	/**
	 * Retrieve all the posts to put in the calendar
	 */
	getCalendarizedEvents: async (): Promise<PostType[] | null> => {
		const [rows] = await db.promise().query('SELECT id, title, actualDate FROM posts');

		return rows as PostType[];
	},
	/**
	 * Retrieve a post by its id
	 */
	findById: async (id: number): Promise<PostType | undefined> => {
		const [rows] = await db.promise().query<RowDataPacket[]>('SELECT * FROM posts WHERE id = ?', [id]);

		const post = rows[0] as PostType | undefined;

		const [targets] = await db
			.promise()
			.query<RowDataPacket[]>('SELECT categoryId FROM post_targets WHERE postId = ?', [id]);

		if (post != null) {
			post.targetIds = targets.map((target) => target.categoryId);
		}

		return rows[0] as PostType | undefined;
	},
	/**
	 * Retrieve all the posts
	 */
	listAll: async (): Promise<PostType[]> => {
		const [rows] = await db.promise().query<RowDataPacket[]>('SELECT * FROM posts');
		return rows as PostType[];
	},
	/**
	 * Retrieve the last 5 posts edited
	 */
	getLastUpdates: async (): Promise<RecentPostEdit[] | undefined> => {
		const [rows] = await db
			.promise()
			.query<
				RowDataPacket[]
			>('SELECT p.id, p.title, p.updated_at, a.name, a.lastName FROM posts p JOIN admins a ON p.lastModificatorId = a.id ORDER BY p.updated_at DESC LIMIT 5');
		return rows as RecentPostEdit[] | undefined;
	},
};
