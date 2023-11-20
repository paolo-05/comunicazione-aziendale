import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PasswordForm from "@/components/ui/passwordForm";
import { UserType } from "@/types";

function UserForm({ initialUserData }: { initialUserData: UserType | null }) {
  const router = useRouter();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const nameRegex = /^[A-Za-z]+$/;

  const [id, setId] = useState(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [power, setPower] = useState(0);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const handleOldPasswordChange = (value: string) => {
    setOldPassword(value);
  };
  const errors = {
    email: "Invalid Email.",
    name: "Name can only contain alphabetic characters.",
    lastName: "Last name can only contain alphabetic characters.",
  };

  useEffect(() => {
    if (initialUserData) {
      setId(initialUserData.id || -1);
      setEmail(initialUserData.email || "");
      setPower(initialUserData.canModifyUsers ? 1 : 0 || 0);
      setName(initialUserData.name || "");
      setLastName(initialUserData.lastName || "");
    }
  }, [initialUserData]);

  function isValidEmail(email: string) {
    return emailRegex.test(email);
  }

  function isValidName(name: string) {
    return nameRegex.test(name);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!initialUserData) {
      /**
       * Register a new user.
       */
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, power, name, lastName }),
      });

      if (response.status === 201) {
        router.push("/user/list-all");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } else {
      /**
       * Edit a user.
       */
      const response = await fetch("/api/user/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          email,
          oldPassword,
          password,
          power,
          name,
          lastName,
        }),
      });
      if (response.status === 201) {
        router.push("/user/list-all");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="display-1">
        {initialUserData ? "Edit User" : "Register"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-3 mb-3">
          <label htmlFor="email" className="form-label">
            Email: {"(Richiesto)"}
          </label>
          <input
            type="email"
            className="form-control form-control-lg"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            {isValidEmail(email) || email === "" ? (
              ""
            ) : (
              <span className="error">{errors.email}</span>
            )}
          </div>
        </div>
        {initialUserData ? (
          <>
            <PasswordForm
              id="old"
              onPasswordChange={handleOldPasswordChange}
              error={null}
              placeholder=""
            />
            <PasswordForm
              id="new"
              onPasswordChange={handlePasswordChange}
              error={null}
              placeholder=""
            />
          </>
        ) : (
          <PasswordForm
            id=""
            onPasswordChange={handlePasswordChange}
            error={null}
            placeholder=""
          />
        )}
        <div className="mb-3">
          <label htmlFor="power" className="form-label">
            Seleziona il ruolo per questo utente {"(Richiesto)"}
          </label>
          <select
            className="form-select"
            aria-label="Seleziona i privilegi per questo utente"
            id="power"
            value={power}
            onChange={(e) => setPower(Number(e.target.value))}
          >
            <option value={0}>
              Può inserire annunci, modificarli, eliminarli
            </option>
            <option value={1}>
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
          <div id="nameHelp" className="form-text">
            {isValidName(name) || name === "" ? (
              ""
            ) : (
              <span className="error">{errors.name}</span>
            )}
          </div>
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
          <div id="lastnameHelp" className="form-text">
            {isValidName(lastName) || lastName === "" ? (
              ""
            ) : (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            {initialUserData ? "Update" : "Register"}
          </button>
          <div className="form-text">
            {error !== "" ? <span className="error">{error}</span> : ""}
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
