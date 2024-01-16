import PasswordForm from "@/components/forms/passwordForm";
import Navbar from "@/components/navbar/index";
import OffcanvasAlert from "@/components/ui/alert";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import logo from "@/public/Logo.png";
import styles from "@/styles/Login.module.css";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import { getCsrfToken, signIn } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Signin({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handlePasswordChange = (value: string) => setPassword(value);

  const handleAlertClose = () => setShowAlert(false);

  const handleSubmit = useCallback(
    (e: any) => {
      setLoading(true);
      if (email === "" || password === "") {
        setLoading(false);
        // just don't make a empty request so return
        return;
      }
      signIn("credentials", {
        email: email,
        password: password,
      });
    },

    [email, password]
  );

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () =>
      // Cleanup the event listener when the component unmounts
      document.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmit]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");

    if (error === "CredentialsSignin") {
      setShowAlert(true);
      setAlertMessage("Email o password errate.");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={inter.className}>
        <Navbar position="fixed-top" session={null} />
        <OffcanvasAlert
          alertType={"danger"}
          show={showAlert}
          message={alertMessage}
          onClose={handleAlertClose}
        />
        <div
          className={`container text-center text-lg-start ${styles.centered}`}
        >
          <div className="card">
            <div className="row g-0">
              <div className="col-lg-5 d-none d-lg-flex">
                <Image
                  src={logo}
                  alt="Logo Big"
                  className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                  height={620}
                  placeholder="blur"
                />
              </div>
              <div
                className="col-lg-7 col-12"
                style={{ backgroundColor: "var(--background-color)" }}
              >
                <div className="card-title py-5 px-md-5">
                  <h1 className="display-1">Login</h1>
                  <p className="text-body-secondary">
                    Inserisci email e password
                  </p>
                </div>
                <div className="card-body py-5 px-md-5">
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="email">
                      Indirizzo Email (Richiesto)
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      id="email"
                      autoComplete="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <PasswordForm
                    id=""
                    onPasswordChange={handlePasswordChange}
                    pswError={error ? "Email o Password Errate." : null}
                    checkRegex={false}
                    placeholder="Password"
                  />
                  <div className="form-outline mb-4">
                    <button
                      type="button"
                      className="btn btn-primary btn-block mb-4"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      Login
                    </button>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  if (session) {
    return { redirect: { destination: "/dashboard" } };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
