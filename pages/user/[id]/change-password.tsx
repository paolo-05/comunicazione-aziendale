import Navbar from "@/components/navbar";
import BackButton from "@/components/ui/backButton";
import PasswordForm from "@/components/ui/forms/passwordForm";
import { UserSecure } from "@/types";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function ChangePassword() {
  const router = useRouter();
  const id = router.query.id;
  const [cookies] = useCookies(["token"]);
  const [admin, setAdmin] = useState<UserSecure | null>(null);
  const [confirmPswError, setConfirmPswError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
      if (
        form.oldPassword === "" &&
        form.newPassword === "" &&
        form.confirmPassword === ""
      ) {
        return;
      }
      axios
        .post("/api/user/change-password", {
          token: cookies.token,
          id: id,
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        })
        .then((resp) => {})
        .catch((error) => {});
    },
    [form, cookies.token, id]
  );

  useEffect(() => {
    if (!cookies.token) {
      router.push("/user/login");
      return;
    }
    axios
      .post("/api/user/resolve", { token: cookies.token })
      .then((response: any) => setAdmin(response.data.message))
      .catch((error: any) => console.log(error));
  }, [cookies.token, router]);

  return (
    <>
      <Head>
        <title>Cambiamento Password</title>
      </Head>
      <main className={inter.className}>
        <Navbar position="sticky-top" user={admin} />
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
