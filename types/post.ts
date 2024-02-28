import { Session } from "next-auth";
import { z } from "zod";

export type PostType = {
  id: number;
  title: string;
  description: string;
  actualDate: Date;
  startDate: Date;
  endDate: Date;
  creatorId: number;
  lastModificatorId: number;
};

export type PostItemProps = {
  session: Session | null;
  post: PostType;
};

export type PostSummary = {
  id: number;
  title: string;
  actualDate: string;
};

export type PostSummaryProps = {
  posts: Array<PostType>;
  session: Session | null;
};

export const postSchema = z.object({
  id: z.number().default(-1),
  title: z.string().min(1, "Campo richiesto."),
});

export type PostFormField = z.infer<typeof postSchema>;

export type PostFormProps = { initialData?: PostType | null };
