import { DangerAlert } from "@/components/alerts";
import { Password } from "@/components/forms";
import Navbar from "@/components/navbar";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ChangePassword() {
  const router = useRouter();
  const { error } = router.query;

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  const [form, setForm] = useState({
    oldPsw: "",
    newPsw: "",
    confirmPsw: "",
  });
  const [showPsw, setShowPsw] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleShowPswChange = () => {
    setShowPsw(showPsw ^ 1);
    console.log(showPsw);
  };

  const handleOldPswChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, oldPsw: value }));
  };

  const handleNewPswChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, newPsw: value }));
  };

  const handleConfirmPswChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, confirmPsw: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (form.oldPsw === "" || form.newPsw === "" || form.confirmPsw === "") {
      router.push({
        pathname: "/auth/change-password",
        query: { error: "missingArguments" },
      });
      return;
    }

    if (form.confirmPsw != form.newPsw) {
      router.push({
        pathname: "/auth/change-password",
        query: { error: "passwordsDontMatch" },
      });
      return;
    }

    axios
      .post("/api/user/change-password", {
        oldPassword: form.oldPsw,
        newPassword: form.newPsw,
        confirmPassword: form.confirmPsw,
      })
      .then((resp) =>
        router.push({
          pathname: "/user/profile",
          query: { success: "passwordChangedSuccess" },
        })
      )
      .catch((err) =>
        router.push({
          pathname: "/auth/change-password",
          query: { error: "oldPasswordDontMatch" },
        })
      );
  };

  useEffect(() => {
    if (!error) return;

    setShowAlert(true);

    switch (error) {
      case "passwordsDontMatch":
        setAlertMessage("Le nuove password non corrispondo.");
        break;
      case "oldPasswordDontMatch":
        setAlertMessage("La vecchia password non corrisponde.");
        break;
      case "missingArguments":
        setAlertMessage("Completa i campi poi invia.");
        break;
      default:
        break;
    }
  }, [error]);

  return (
    <>
      <Head>
        <title>Cambiamento Password</title>
      </Head>
      <main className={inter.className}>
        <Navbar session={session} />
        <div className="min-h-screen flex items-center justify-center">
          <section className="mt-36">
            <div className="flex flex-col items-center justify-center px-6 py-8">
              <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Cambia Password
                </h2>
                <form
                  className="mt-4 space-y-4 lg:mt-5 md:space-y-5 md:w-96 xs:w-52"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      La tua Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={session?.user.email}
                      disabled
                    />
                  </div>
                  <Password
                    id="old-password"
                    label="Vecchia Password (richiesto)"
                    showText={showPsw}
                    checkRegex={false}
                    onChange={handleOldPswChange}
                  />
                  <Password
                    id="new-password"
                    label="Nuova Password  (richiesto)"
                    showText={showPsw}
                    checkRegex={true}
                    onChange={handleNewPswChange}
                  />
                  <Password
                    id="confirm-password"
                    label="Conferma Password  (richiesto)"
                    showText={showPsw}
                    checkRegex={false}
                    onChange={handleConfirmPswChange}
                  />
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="show-psw"
                        aria-describedby="show-psw"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required={false}
                        value={showPsw}
                        onChange={handleShowPswChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="show-psw"
                        className="font-light text-gray-500 dark:text-gray-300 underline"
                      >
                        Mostra password
                      </label>
                    </div>
                  </div>
                  <DangerAlert
                    show={showAlert}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                  />
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Cambia Password!
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
