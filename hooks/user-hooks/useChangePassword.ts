import {
  ChangePasswordFormFields,
  changePasswordSchema,
} from "@/types/changePasswordTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useChangePassword = (session: Session | null) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormFields>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [showPsw, setShowPsw] = useState(0);

  const handleShowPswChange = () => {
    setShowPsw(showPsw ^ 1);
  };

  const onSubmit: SubmitHandler<ChangePasswordFormFields> = async (data) => {
    if (data.newPsw !== data.confirmPsw) {
      setError("confirmPsw", {
        message: "Le nuove password non corrispondono.",
      });
      return;
    }

    try {
      await axios.put("/api/user/change-password", {
        email: session?.user.email,
        data,
      });

      router.push({
        pathname: "/user/profile",
        query: { success: "passwordChangedSuccess" },
      });
    } catch (err) {
      setError("oldPsw", { message: "La vecchia password non corrisponde." });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    showPsw,
    handleShowPswChange,
    onSubmit,
  };
};
