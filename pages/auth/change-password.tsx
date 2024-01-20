import Navbar from "@/components/navbar";
import BackButton from "@/components/ui/backButton";
import PasswordForm from "@/components/forms/passwordForm";
import { UserSecure } from "@/types/types";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function ChangePassword() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  const [admin, setAdmin] = useState<UserSecure | null>(null);

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [confirmPswError, setConfirmPswError] = useState("");

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleOldPasswordChange = useCallback((value: string) => {
    setForm((prevForm) => ({ ...prevForm, oldPassword: value }));
  }, []);
  const handleNewPasswordChange = useCallback((value: string) => {
    setForm((prevForm) => ({ ...prevForm, newPassword: value }));
  }, []);

  const handleConfirmPasswordChange = useCallback(
    (value: string) => {
      setForm((prevForm) => ({ ...prevForm, confirmPassword: value }));
      if (value === form.newPassword) {
        setConfirmPswError("");
      } else {
        setConfirmPswError("Le passsword non coincidono.");
      }
    },
    [form.newPassword]
  );

  const handleSubmit = useCallback(
    (e: any) => {
      if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
        return;
      }
      axios
        .post("/api/user/change-password", {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        })
        .then((resp) => {
          setShowAlert(true);
          setAlertMessage("Password changed successfully!");
        })
        .catch((error) => setOldPasswordError("Password errata."));
    },
    [form]
  );

  useEffect(() => {
    axios
      .post("/api/user/resolve")
      .then((response: any) => {
        const cookie = response.data.cookies.split("=")[1];
       
        setAdmin(response.data.message);
      })
      .catch((error: any) => console.log(error));
  },[]);

  return (
    <>
      <Head>
        <title>Cambiamento Password</title>
      </Head>
      <main className={inter.className}>
        <Navbar session={session} />
        <div className="container mt-5">
          <div className="card bg-body">
            <div className="card-body">
              <div className="card-title">
                <h1 className="display-1">Cambiamento Password</h1>
              </div>
              <div>
                <PasswordForm
                  id="old"
                  placeholder={oldPasswordError}
                  pswError={null}
                  checkRegex={false}
                  onPasswordChange={handleOldPasswordChange}
                />
                <PasswordForm
                  id="new"
                  placeholder=""
                  pswError={null}
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
                        disabled={
                          confirmPswError !== "" || showAlert ? true : false
                        }
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
