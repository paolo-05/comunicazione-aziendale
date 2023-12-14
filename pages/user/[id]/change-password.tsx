import Navbar from "@/components/navbar";
import BackButton from "@/components/ui/backButton";
import PasswordForm from "@/components/ui/forms/passwordForm";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function ChangePassword() {
  const router = useRouter();
  const id = router.query.id;

  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [confirmPswError, setConfirmPswError] = useState("");
  const [isConfimPswDirty, setIsConfirmPswDirty] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOldPasswordChange = useCallback((value: string) => {
    setOldPassword(value);
  }, []);
  const handleNewPasswordChange = useCallback((value: string) => {
    setNewPassword(value);
  }, []);

  const handleConfirmPasswordChange = useCallback(
    (value: string) => {
      setConfirmPassword(value);
      if (value === newPassword) {
        setConfirmPswError("");
      } else {
        setConfirmPswError("Le passsword non coincidono.");
      }
    },
    [newPassword]
  );

  const handleSubmit = useCallback(
    (e: any) => {
      if (oldPassword === "" && newPassword === "" && confirmPassword === "") {
        return;
      }
      axios
        .post("/api/user/change-password", {
          token: cookies.token,
          id: id,
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        })
        .then((resp) => {})
        .catch((error) => {});
    },
    [oldPassword, newPassword, confirmPassword, cookies.token, id]
  );

  return (
    <>
      <Head>
        <title>Cambiamento Password</title>
      </Head>
      <main>
        <Navbar position="sticky-top" shouldFetch={true} />
        <div className="container mt-5">
          <div className="card bg-body">
            <div className="card-body">
              <div className="card-title">
                <h1 className="display-1">Cambiamento Password</h1>
              </div>
              <div>
                <PasswordForm
                  id="old"
                  placeholder=""
                  pswError={""}
                  checkRegex={false}
                  onPasswordChange={handleOldPasswordChange}
                />
                <PasswordForm
                  id="new"
                  placeholder=""
                  pswError={""}
                  checkRegex={true}
                  onPasswordChange={handleNewPasswordChange}
                />
                <PasswordForm
                  id="confirm"
                  placeholder=""
                  pswError={confirmPswError}
                  checkRegex={false}
                  onPasswordChange={handleConfirmPasswordChange}
                />
                <div className="mb-3 container px-4 text-center">
                  <div className="row gx-5">
                    <div className="col">
                      <BackButton text="Annulla" />
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        disabled={confirmPswError !== "" ? true : false}
                        className="btn btn-primary btn-lg"
                        onClick={handleSubmit}
                      >
                        Salva
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
