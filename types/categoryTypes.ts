import { z } from "zod";

export type CategoryType = {
  id: number;
  name: string;
  description: string;
  colour: string;
};

export type CategoryFormModalProps = {
  initialFormData?: CategoryType | null;
  show: boolean;
  onClose: () => void;
};

export type CategoryAPIProps = {
  data: { id: number; name: string; description: string };
  selectedColor: string;
};

export const categoryFormSchema = z.object({
  id: z.number().min(0),
  name: z.string().min(1, "Campo richiesto"),
  description: z
    .string()
    .min(1, "Campo richiesto")
    .max(200, "Riduci il numero di parole!"),
});

export type CategoryFormFields = z.infer<typeof categoryFormSchema>;
