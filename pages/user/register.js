import Layout from "@/components/layout";
import Navbar from "@/components/navbar";
import { useState } from "react";

const RegisterForm = () => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [power, setPower] = useState(-1);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  function isValidEmail(email) {
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Invalid Email.");
    }
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, power, name, lastName }),
    });

    if (response.status === 201) {
      // Registration successful, you can redirect the user or show a success message
      // For example, redirect to a login page
      window.location.href = "/dashboard";
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  return (
    <Layout title="Registra un nuovo utente">
      <Navbar />
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email: {"(Richiesto)"}
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password: {"(Richiesto)"}
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="power" className="form-label">
              Seleziona i privilegi per questo utente {"(Richiesto)"}
            </label>
            <select
              className="form-select"
              aria-label="Seleziona i privilegi per questo utente"
              id="power"
              value={power}
              onChange={(e) => setPower(e.target.value)}
            >
              <option value={-1}></option>
              <option value="0">
                Può inserire annunci, modificarli, eliminarli
              </option>
              <option value="1">
                Oltre a fare ciò che è descritto sopra, può inserire utenti,
                modificarli ed eliminarli
              </option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome: {"(Richiesto)"}
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Cognome: {"(Richiesto)"}
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            {error !== null ? <span className="error">{error}</span> : ""}
          </div>
          <button type="submit" className="btn btn-primary">
            Registra
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterForm;
