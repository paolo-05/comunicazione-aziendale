import { DangerAlert } from "@/components/alerts";
import { UserForm } from "@/components/forms/";
import Navbar from "@/components/navbar/";
import Container from "@/components/ui/container";
import { UserFormType } from "@/types/userFormType";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  const router = useRouter();
  const { error } = router.query;

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e: any, form: UserFormType) => {
    e.preventDefault();

    if (
      form.email === "" ||
      form.name === "" ||
      form.lastName === "" ||
      form.role === -1 ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      router.push({
        pathname: "/user/register",
        query: { error: "missingArguments" },
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      router.push({
        pathname: "/user/register",
        query: { error: "passwordsDontMatch" },
      });
      return;
    }

    axios
      .post("/api/user/register", {
        email: form.email,
        password: form.password,
        role: form.role,
        name: form.name,
        lastName: form.lastName,
      })
      .then((res) =>
        router.push({
          pathname: "/user/list-all",
          query: { success: "userCreated" },
        })
      )
      .catch((err) =>
        router.push({
          pathname: "/user/register",
          query: { error: "existingEmail" },
        })
      );
  };

  useEffect(() => {
    if (!error) return;

    setShowAlert(true);

    switch (error) {
      case "passwordsDontMatch":
        setAlertMessage("Le password non corrispondo.");
        break;
      case "missingArguments":
        setAlertMessage("Completa i campi poi invia.");
        break;
      case "existingEmail":
        setAlertMessage("Esiste già un utente registrato con questa mail.");
      default:
        break;
    }
  }, [error]);

  useEffect(() => {
    if (session?.user.role === 0) {
      router.push("/dashboard");
    }
  }, [router, session?.user.role]);

  return (
    <>
      <Head>
        <title>Registra un nuovo utente</title>
      </Head>
      <main className={inter.className}>
        <Navbar session={session} />
        <div className="min-h-screen flex items-center justify-center">
          <Container>
            <section className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg shadow dark:border-gray-700">
              <div className="py-8 px-10 mx-auto">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Registra un nuovo utente
                </h2>
                <DangerAlert
                  show={showAlert}
                  message={alertMessage}
                  onClose={() => {
                    setShowAlert(false);
                  }}
                />
                <UserForm initialUserData={null} handleSubmit={handleSubmit} />
              </div>
            </section>
          </Container>
        </div>
      </main>
    </>
  );
}
