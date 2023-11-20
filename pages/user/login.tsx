import ColorModeToggler from "@/components/colorModeToggler";
import Navbar from "@/components/navbar";
import PasswordForm from "@/components/ui/passwordForm";
import logoBig from "@/public/logo-big.png";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function NewLogin() {
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
  useEffect(() => {
    document.addEventListener("keydown", (e: any) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    });
  });

  const handleSubmit = async (e: any) => {
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
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar position="fixed-top" shouldFetch={false} />
      <section className=" text-center text-lg-start">
        <div>
          <div className="card">
            <div className="row g-0 d-flex align-items-center">
              <div className="col-lg-4 d-none d-lg-flex">
                <Image
                  src={logoBig}
                  alt="Logo Big"
                  className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                  height={1080}
                  width={470}
                  placeholder="blur"
                />
              </div>
              <div className="col-lg-8">
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
                      name="email"
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
    </>
  );
}
