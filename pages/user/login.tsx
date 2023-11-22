import Navbar from "@/components/navbar/index";
import PasswordForm from "@/components/ui/passwordForm";
import logoBig from "@/public/logo-big.png";
import "@/styles/login.module.css";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  if (cookies.token) {
    router.push("/dashboard");
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = useCallback(
    (e: any) => {
      setLoading(true);
      if (email === "" || password === "") {
        setLoading(false);
        // just don't make a empty request so return
        return;
      }
      e.preventDefault();
      axios
        .post("/api/user/login", {
          email: email,
          password: password,
        })
        .then((response: any) => {
          const cookie = response.data.cookies.split("=")[1];
          setCookie("token", cookie, {
            path: "/",
            // secure: true,
            // sameSite: true,
            maxAge: 3600,
          });
          setError(false);
          router.push("/dashboard");
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    },
    [email, password, router, setCookie]
  );

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={inter.className}>
        <Navbar position="fixed-top" shouldFetch={false} />
        <section className="text-center text-lg-start">
          <div className="position-absolute top-50 start-50 translate-middle">
            <div className="card">
              {/* <div className="row g-0 d-flex align-items-center"> */}
              <div className="row g-0">
                <div className="col-lg-5 d-none d-lg-flex">
                  <Image
                    src={logoBig}
                    alt="Logo Big"
                    className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                    height={800}
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
                      error={error ? 3 : null}
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
        </section>
      </main>
    </>
  );
}
