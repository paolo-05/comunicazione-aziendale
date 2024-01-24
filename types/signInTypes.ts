import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email().min(1, "Campo richiesto."),
  password: z.string().min(1, "Campo richiesto."),
});

export type SignInFormFields = z.infer<typeof signInSchema>;
