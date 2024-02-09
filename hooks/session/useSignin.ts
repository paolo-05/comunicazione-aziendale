import { SignInFormFields, signInSchema } from "@/types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

/**
 * This hook handles the signin process
 * @returns a bunch of utilities for registering forms and displaying errors
 */
export const useSignin = () => {
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
      signIn("credentials", {
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

  const closeAlert = () => {
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
