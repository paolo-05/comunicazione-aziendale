import { DangerAlert } from "@/components/alerts";
import { UserForm } from "@/components/forms/";
import Header from "@/components/navbar/";
import Container from "@/components/ui/container";
import { UserSecure } from "@/types/types";
import { UserFormType } from "@/types/userFormType";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  const [user, setUser] = useState<UserSecure | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e: any, form: UserFormType) => {
    e.preventDefault();

    if (
      form.email === "" ||
      form.name === "" ||
      form.lastName === "" ||
      form.role === -1
    ) {
      router.push({
        pathname: "/user/edit",
        query: { id, error: "missingArguments" },
      });
      return;
    }

    // if (form.password !== form.confirmPassword) {
    //   router.push({
    //     pathname: "/user/register",
    //     query: { id, error: "passwordsDontMatch" },
    //   });
    //   return;
    // }

    axios
      .post("/api/user/edit", {
        id: form.id,
        email: form.email,
        role: form.role,
        name: form.name,
        lastName: form.lastName,
      })
      .then((res) =>
        router.push({
          pathname: "/user/list-all",
          query: { success: "userUpdated" },
        })
      )
      .catch((err) =>
        // router.push({
        //   pathname: "/user/edit",
        //   query: { id, error: "existingEmail" },
        // })
        console.log(err)
      );
  };

  useEffect(() => {
    if (id === undefined) return;

    if (id === session?.user.id) {
      router.push("/dashboard");
    }

    axios
      .post("/api/user/get-by-id", { userId: id })
      .then((res) => setUser(res.data.message))
      .catch((err) => console.log(err));
  }, [id, router, session?.user.id]);

  useEffect(() => {
    if (session?.user.role === 0) {
      router.push("/dashboard");
    }
  }, [router, session?.user.role]);

  return (
    <>
      <Head>
        <title>Modificando un utente</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <div className="min-h-screen flex items-center justify-center">
          <Container>
            <section className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg shadow dark:border-gray-700">
              <div className="py-8 px-10 mx-auto">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Aggiorna un utente
                </h2>
                <DangerAlert
                  show={showAlert}
                  message={alertMessage}
                  onClose={() => {
                    setShowAlert(false);
                  }}
                />
                <UserForm initialUserData={user} handleSubmit={handleSubmit} />
              </div>
            </section>
          </Container>
        </div>
      </main>
    </>
  );
}
