import { type SignInFormFields, signInSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

/**
 * This hook handles the signin process
 * @returns a bunch of utilities for registering forms and displaying errors
 */
export const useSignin = (): {
  handleSubmit: any;
  onSubmit: SubmitHandler<SignInFormFields>;
  register: any;
  errors: any;
  isSubmitting: boolean;
  showAlert: boolean;
  alertMessage: string;
  closeAlert: () => void;
} => {
  const router = useRouter();
  const { error } = router.query;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormFields> = async (data) => {
    try {
      void signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (e) {
      setError("root", { message: "Email o password errate." });
    }
  };

  useEffect(() => {
    if (error === "CredentialsSignin") {
      setShowAlert(true);
      setAlertMessage("Email o password errate.");
    }
  }, [error]);

  const closeAlert = (): void => {
    setShowAlert(false);
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isSubmitting,
    showAlert,
    alertMessage,
    closeAlert,
  };
};
