// import UserForm from "@/components/forms/userForm";
import { Password, Text } from "@/components/forms";
import Navbar from "@/components/navbar/";
import Container from "@/components/ui/container";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  const [showPsw, setShowPsw] = useState(0);
  const [form, setForm] = useState({
    id: 0,
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastName: "",
    role: -1,
  });

  const handleShowPswChange = () => {
    setShowPsw(showPsw ^ 1);
    console.log(showPsw);
  };

  const handleEmailChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, email: value }));
  };

  const handlePswChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, password: value }));
  };

  const handleConfirmPswChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, confirmPassword: value }));
  };

  const handleNameChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, name: value }));
  };

  const handleLastNameChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, lastName: value }));
  };

  const handleRoleChange = (value: any) => {
    setForm((prevForm) => ({ ...prevForm, role: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      form.email === "" ||
      form.name === "" ||
      form.lastName === "" ||
      form.role === -1 ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      return;
    }

    if (form.password !== form.confirmPassword) {
      router.push({
        pathname: "/user/register",
        query: { error: "passwordsDontMatch" },
      });
      return;
    }

    axios.post("/api/user/register", {
      email: form.email,
      // to do
    });
  };

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
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="john.doe@example.com"
                        required={true}
                        onChange={(e) => handleEmailChange(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Password
                        id={"password"}
                        label={"Password (richiesto)"}
                        showText={showPsw}
                        checkRegex={true}
                        onChange={handlePswChange}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Password
                        id={"confirm-password"}
                        label={"Conferma Password (richiesto)"}
                        showText={showPsw}
                        checkRegex={false}
                        onChange={handleConfirmPswChange}
                      />
                      <div className="flex items-start mt-2">
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
                    </div>
                    <div className="w-full">
                      <Text
                        id="name"
                        label="Nome (richiesto)"
                        placeholder="John"
                        initialValue={null}
                        checkRegex={true}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="w-full">
                      <Text
                        id="lastName"
                        label="Cognome (richiesto)"
                        placeholder="Doe"
                        initialValue={null}
                        checkRegex={true}
                        onChange={handleLastNameChange}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Roulo
                      </label>
                      <select
                        id="category"
                        onChange={(e) => handleRoleChange(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value={-1}>Seleziona il roulo</option>
                        <option value={0}>HR</option>
                        <option value={1}>Admin</option>
                      </select>

                      <div className="my-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Spiegazione: </span>
                        <ul>
                          <li>
                            <span className="text-bold">HR</span>: può
                            insirire/modificare/eliminare eventi
                          </li>
                          <li>
                            <span className="text-bold">Admin</span>: può
                            insirire/modificare/eliminare utenti e può fare ciò
                            che fa un utente HR
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Registra
                  </button>
                </form>
              </div>
            </section>
          </Container>
        </div>
      </main>
    </>
  );
}
