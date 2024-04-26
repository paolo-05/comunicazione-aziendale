import { type Session } from 'next-auth';
import { z } from 'zod';
import { CategoryType } from './category';

export interface PostType {
	id: number;
	imageURL: string;
	title: string;
	description: string;
	actualDate: Date;
	startDate: Date;
	endDate: Date;
	targetIds: number[];
	creatorId: number;
	lastModificatorId: number;
	created_at: Date;
	updated_at: Date;
	nextPostId?: number | undefined;
	previousPostId?: number | undefined;
}

export interface PostItemProps {
	session: Session | null;
	post: PostType;
	categories?: CategoryType[];
}

export interface PostSummary {
	id: number;
	title: string;
	imageURL: string;
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

export interface VisibilePostType {
	id: number;
	title: string;
	imageURL: string;
	actualDate: Date;
	startDate: Date;
	endDate: Date;
	targets: CategoryType[];
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
