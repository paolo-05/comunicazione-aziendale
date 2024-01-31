import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * This hook is responsible for handling the user's profile
 * @returns `showAlert` a boolean to know if the alert should be visibile
 * @returns `alertMessage` a string containing the body of the alert
 * @returns `closeAlert` a callback function for closing the alert
 */
export const useProfile = () => {
  const router = useRouter();
  const { success } = router.query;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!success) return;

    setShowAlert(true);

    switch (success) {
      case "passwordChangedSuccess":
        setAlertMessage("Password cambiata correttamente!");
        break;

      default:
        break;
    }
  }, [success]);

  const closeAlert = () => {
    setShowAlert(false);
  };

  return {
    showAlert,
    alertMessage,
    closeAlert,
  };
};
