import EmailForm from "@/components/ui/forms/emailForm";
import PasswordForm from "@/components/ui/forms/passwordForm";
import { UserErrors, UserSecure, UserType } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import NameForm from "./ui/forms/nameForm";

function UserForm({ initialUserData }: { initialUserData: UserSecure | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<UserType>({
    id: -1,
    email: "",
    password: "",
    canModifyUsers: false,
    name: "",
    lastName: "",
  });

  const [id, setId] = useState(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [power, setPower] = useState(0);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errors, setErrors] = useState<UserErrors>({
    email: "",
    password: "",
    oldPassword: "",
    name: "",
    lastName: "",
  });

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleOldPasswordChange = (value: string) => {
    setOldPassword(value);
  };

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };

  const handleErrors = useCallback(
    (error: string) => {
      if (error.includes("Email")) {
        setErrors({
          ...errors,
          email: "Email già registrata",
        });
        return;
      }
      if (error.includes("campi")) {
        setErrors({
          email: "Campo richiesto.",
          password: "Campo richiesto.",
          oldPassword: "Campo richiesto.",
          name: "Campo richiesto.",
          lastName: "Campo richiesto.",
        });
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    (e: any) => {
      if (email === "" && password === "" && name === "" && lastName === "") {
        handleErrors("I campi non possono essere vuoti");
        return;
      }
      if (!initialUserData) {
        axios
          .post("/api/user/register", {
            email: email,
            password: password,
            canModifyUsers: power,
            name: name,
            lastName: lastName,
          })
          .then((response: any) => {
            console.log(response.data.message);
          })
          .catch((error: any) => {
            console.log(error);
          });
      } else {
        axios
          .post("/api/user/edit", {
            email: email,
            oldPassword: oldPassword,
            password: password,
            canModifyUsers: power,
            name: name,
            lastName: lastName,
          })
          .then((response: any) => {
            console.log(response.data.message);
          })
          .catch((error: any) => {});
      }
    },
    [
      email,
      password,
      name,
      lastName,
      initialUserData,
      handleErrors,
      power,
      oldPassword,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (initialUserData) {
      setId(initialUserData.id || -1);
      setEmail(initialUserData.email || "");
      setPower(initialUserData.canModifyUsers ? 1 : 0 || 0);
      setName(initialUserData.name || "");
      setLastName(initialUserData.lastName || "");
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit, initialUserData]);

  return (
    <div className="container mt-5">
      <div className="card bg-body">
        <div className="card-body">
          <div className="card-title">
            <h1 className="display-1">
              {initialUserData
                ? "Modifica un Utente"
                : "Registra un nuovo Utente"}
            </h1>
          </div>
          <div>
            <input type="hidden" value={id} />
            <EmailForm
              id="email"
              placeholder=""
              emailError={errors.email}
              handleValueChange={handleEmailChange}
            />
            {initialUserData ? (
              <>
                <PasswordForm
                  id="old"
                  onPasswordChange={handleOldPasswordChange}
                  pswError={errors.oldPassword}
                  checkRegex={false}
                  placeholder=""
                />
                <PasswordForm
                  id="new"
                  onPasswordChange={handlePasswordChange}
                  pswError={errors.password}
                  checkRegex={true}
                  placeholder=""
                />
              </>
            ) : (
              <PasswordForm
                id=""
                onPasswordChange={handlePasswordChange}
                pswError={errors.password}
                checkRegex={true}
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
            <NameForm
              id="name"
              placeholder=""
              nameError={errors.name}
              handleValueChange={handleNameChange}
            />
            <NameForm
              id="LastName"
              placeholder=""
              nameError={errors.lastName}
              handleValueChange={handleLastNameChange}
            />
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
              >
                {initialUserData ? "Update" : "Register"}
              </button>
              <div className="form-text">{/* {error} */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
