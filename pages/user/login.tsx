import ColorModeToggler from "@/components/colorModeToggler";
import logoBig from "@/public/logo-big.png";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function NewLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    axios.post("/api/user/login", {
      formData: {
        email:email,
        password: password
      }
    }).then((resp) => {
      setLoading(false);
      // redirect to dashboard
      router.push('/dashboard');
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <ColorModeToggler />
      <section className=" text-center text-lg-start">
        <form onSubmit={handleSubmit}>
          <div className="card mb-3">
            <div className="row g-0 d-flex align-items-center">
              <div className="col-lg-4 d-none d-lg-flex">
                <Image
                  src={logoBig}
                  alt="Trendy Pants and Shoes"
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
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">
                      Indirizzo Email
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="input-group-text" id="basic-addon2">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                    <div className="form-text">
                      {error !== "" ? (
                        <span className="text-danger">{error}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
