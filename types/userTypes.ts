import { z } from "zod";
import { Session } from "next-auth";

export type UserType = {
  id: number;
  email: string;
  password: string;
  role: number;
  name: string;
  lastName: string;
};

export type UserSecure = {
  id: number;
  email: string;
  role: number;
  name: string;
  lastName: string;
};

export type UserItemProps = {
  user: UserSecure | null;
  session: Session | null;
};

export const signInSchema = z.object({
  email: z.string().email().min(1, "Campo richiesto."),
  password: z.string().min(1, "Campo richiesto."),
});

export type SignInFormFields = z.infer<typeof signInSchema>;

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

export const changePasswordSchema = z.object({
  oldPsw: z.string().min(1, "Campo richiesto."),
  newPsw: z
    .string()
    .min(8, "Per motivi di sicurezza la password deve contenere 8 caratteri"),
  confirmPsw: z.string().min(1, "Campo richiesto."),
});

export type ChangePasswordFormFields = z.infer<typeof changePasswordSchema>;
