import { DangerAlert } from "@/components/alerts/index";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken, signIn } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Signin({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const [status, setStatus] = useState<string>("input");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>(
    "Email o password errate"
  );

  const handleSubmit = useCallback(
    (e: any) => {
      setStatus("loading");
      if (email === "" || password === "") {
        setStatus("input");
        // just don't make a empty request so return
        return;
      }
      signIn("credentials", {
        email: email,
        password: password,
      }).then(() => setStatus("input"));
    },

    [email, password]
  );

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.keyCode === 27) {
        setShowAlert(false);
      }
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
        <section className="min-h-screen flex items-center justify-center">
          <div className="px-10 py-8 mx-auto bg-gray-50 dark:bg-gray-900 rounded-md shadow-md">
            <Link
              href="/"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <Image
                src="/faviconFrame.svg"
                height={512}
                width={512}
                className="h-10 w-10 mr-2"
                alt={"Logo"}
              />
              Comunicazione Aziendale
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Entra con le tue Credenziali
                </h1>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      La tua Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      autoComplete="email"
                      required={true}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <DangerAlert
                    show={showAlert}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                  />

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800"
                  >
                    Entra!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
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
