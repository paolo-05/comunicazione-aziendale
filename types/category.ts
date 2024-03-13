import { type Session } from 'next-auth';
import { z } from 'zod';

export interface CategoryType {
  id: number;
  name: string;
  description: string;
  colour: string;
}

export interface CategoryItemProps {
  session: Session | null;
  category: CategoryType;
  setEditCategory?: (category: CategoryType) => void;
}

export interface CategoryFormModalProps {
  initialFormData?: CategoryType | null;
  show: boolean;
  onClose: () => void;
}

export interface CategoryAPIProps {
  data: { id: number; name: string; description: string };
  selectedColor: string;
}

export const categoryFormSchema = z.object({
  id: z.number().min(0),
  name: z.string().min(1, 'Campo richiesto'),
  description: z
    .string()
    .min(1, 'Campo richiesto')
    .max(200, 'Riduci il numero di parole!'),
});

export type CategoryFormFields = z.infer<typeof categoryFormSchema>;
