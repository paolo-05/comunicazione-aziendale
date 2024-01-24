import { z } from "zod";

export const userFormSchema = z.object({
  id: z.number().default(-1),
  email: z
    .string()
    .email({ message: "Formato non valido" })
    .min(1, "Campo richiesto."),
  password: z
    .string()
    .min(1, "Campo richiesto.")
    .min(8, "Per motivi di sicurezza la password deve contenere 8 caratteri"),
  confirmPassword: z.string().min(1, "Campo richiesto."),
  name: z.string().min(4, "Campo richiesto."),
  lastName: z.string().min(4, "Campo richiesto."),
  role: z.string().min(1, "Campo richiesto.").max(2, "Formato non valido"),
});

export type UserFormFieds = z.infer<typeof userFormSchema>;
