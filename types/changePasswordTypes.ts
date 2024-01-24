import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPsw: z.string().min(1, "Campo richiesto."),
  newPsw: z
    .string()
    .min(8, "Per motivi di sicurezza la password deve contenere 8 caratteri"),
  confirmPsw: z.string().min(1, "Campo richiesto."),
});

export type ChangePasswordFormFields = z.infer<typeof changePasswordSchema>;
