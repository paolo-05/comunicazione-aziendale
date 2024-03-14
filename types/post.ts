import { type Session } from 'next-auth';
import { z } from 'zod';

export interface PostType {
	id: number;
	imageURL: string;
	title: string;
	description: string;
	actualDate: Date;
	startDate: Date;
	endDate: Date;
	creatorId: number;
	lastModificatorId: number;
	created_at: Date;
	updated_at: Date;
}

export interface PostItemProps {
	session: Session | null;
	post: PostType;
}

export interface PostSummary {
	id: number;
	title: string;
	actualDate: string;
}

export interface RecentPostEdit {
	id: number;
	title: string;
	updated_at: Date;
	name: string;
	lastName: string;
}

export interface PostSummaryProps {
	posts: PostType[];
	session: Session | null;
}

export const postSchema = z.object({
	id: z.number().default(-1),
	title: z.string().min(1, 'Campo richiesto.'),
});

export type PostFormField = z.infer<typeof postSchema>;

export interface PostFormProps {
	initialData?: PostType | null;
}

export interface UploadCoverImageModalProps {
	imageURL: string | null;
	show: boolean;
	onClose: () => void;
	setImageURL: (url: string) => void;
}
