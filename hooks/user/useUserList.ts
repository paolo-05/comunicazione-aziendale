import { UserSecure } from "@/types/userTypes";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * This hook fetches the users and handles alert for CRUD operations
 * @returns an array containing the users
 */
export const useUserList = () => {
  const router = useRouter();

  const { success } = router.query;

  const [users, setUsers] = useState<Array<UserSecure> | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    axios
      .get("/api/user/list-all")
      .then((response: any) => {
        const users: Array<UserSecure> = response.data.message;
        setUsers(users);
      })
      .catch((err: any) => {});
  }, []);

  useEffect(() => {
    if (!success) return;

    setShowAlert(true);

    switch (success) {
      case "userCreated":
        setAlertMessage("Utente creato correttamente!");
        break;
      case "userUpdated":
        setAlertMessage("Utente aggiornato correttamente!");
        break;

      default:
        break;
    }
  }, [success]);

  const closeAlert = () => {
    setShowAlert(false);
  };

  return {
    users,
    showAlert,
    alertMessage,
    closeAlert,
  };
};
