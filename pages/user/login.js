import { useState } from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

import logoBig from "@/public/logo-big.png";
import Layout from "@/components/layout";
import "./../global.css";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      window.sessionStorage.setItem("token", data.message);
      window.location.href = "/dashboard";
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout title="Login">
      <div className="container">
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <span>Utilizza la tua e-mail e la tua password</span>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <span className="error">{error}</span>
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <Image src={logoBig} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
