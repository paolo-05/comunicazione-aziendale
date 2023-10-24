// components/RegisterForm.js
import { useState } from "react";
import Layout from "@/components/layout";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, lastName }),
      });

      if (response.status === 201) {
        // Registration successful, you can redirect the user or show a success message
        // For example, redirect to a login page
        window.location.href = "/user/login";
      } else {
        const data = await response.json();
        // Handle registration errors here, e.g., show an error message
        console.error("Registration error:", data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Layout title="Registra un nuovo utente">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </Layout>
  );
};

export default RegisterForm;
