import EmailForm from "@/components/forms/emailForm";
import PasswordForm from "@/components/forms/passwordForm";
import BackButton from "@/components/ui/backButton";
import Loading from "@/components/ui/loadingSpinningCircle";
import { UserErrors, UserSecure, UserType } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import NameForm from "./nameForm";

type UserFormProps = { initialUserData: UserSecure | null };

function UserForm({ initialUserData }: UserFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["token"]);
  const [oldPassword, setOldPassword] = useState("");

  const [form, setForm] = useState<UserType>({
    id: -1,
    email: "",
    password: "",
    canModifyUsers: false,
    name: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<UserErrors>({
    email: "",
    password: null,
    oldPassword: "",
    name: "",
    lastName: "",
  });

  const handleEmailChange = useCallback((value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      email: value,
    }));
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      password: value,
    }));
  }, []);

  const handleOldPasswordChange = useCallback((value: string) => {
    setOldPassword(value);
  }, []);

  const handleNameChange = useCallback((value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      name: value,
    }));
  }, []);

  const handleLastNameChange = useCallback((value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      lastName: value,
    }));
  }, []);

  const handleSuccess = useCallback(() => {
    router.push("/user/list-all");
  }, [router]);

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
      if (
        form.email === "" &&
        form.password === "" &&
        form.name === "" &&
        form.lastName === ""
      ) {
        handleErrors("I campi non possono essere vuoti");
        return;
      }
      if (!initialUserData) {
        axios
          .post("/api/user/register", {
            token: cookies.token,
            email: form.email,
            password: form.password,
            canModifyUsers: form.canModifyUsers,
            name: form.name,
            lastName: form.lastName,
          })
          .then((response: any) => handleSuccess())
          .catch((error: any) => handleErrors(error.response.data.message));
      } else {
        axios
          .post("/api/user/edit", {
            token: cookies.token,
            id: initialUserData.id,
            email: form.email,
            canModifyUsers: form.canModifyUsers,
            name: form.name,
            lastName: form.lastName,
          })
          .then((response: any) => handleSuccess())
          .catch((error: any) => handleErrors(error.response.data.message));
      }
    },
    [form, initialUserData, handleErrors, cookies.token, handleSuccess]
  );

  const setData = useCallback(() => {
    if (initialUserData && loading) {
      setForm({
        id: initialUserData.id || -1,
        email: initialUserData.email || "",
        password: "",
        canModifyUsers: initialUserData.canModifyUsers || false,
        name: initialUserData.name || "",
        lastName: initialUserData.lastName || "",
      });
    }
    setLoading(false);
  }, [initialUserData, loading]);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    setData();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit, setData]);

  return (
    <div className="container mt-5">
      <div className="card bg-body">
        <div className="card-body">
          {loading ? (
            <Loading height={150} width={150} />
          ) : (
            <>
              <div className="card-title">
                <h1 className="display-1">
                  {initialUserData
                    ? "Modifica un utente"
                    : "Registra un nuovo utente"}
                </h1>
              </div>
              <div>
                <input type="hidden" value={form.id} />
                <EmailForm
                  id="email"
                  initialValue={form.email}
                  placeholder=""
                  emailError={errors.email}
                  handleValueChange={handleEmailChange}
                />
                {initialUserData ? (
                  ""
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
                    value={String(form.canModifyUsers)}
                    onChange={(e) =>
                      setForm((prevForm) => ({
                        ...prevForm,
                        canModifyUsers: Boolean(e.target.value),
                      }))
                    }
                  >
                    <option value={String(false)}>
                      Può inserire annunci, modificarli, eliminarli
                    </option>
                    <option value={String(true)}>
                      Oltre a fare ciò che è descritto sopra, può inserire
                      utenti, modificarli ed eliminarli
                    </option>
                  </select>
                </div>
                <NameForm
                  id="name"
                  initialValue={form.name}
                  placeholder=""
                  nameError={errors.name}
                  handleValueChange={handleNameChange}
                />
                <NameForm
                  id="LastName"
                  initialValue={form.lastName}
                  placeholder=""
                  nameError={errors.lastName}
                  handleValueChange={handleLastNameChange}
                />
                <div className="mb-3 container px-4 text-center">
                  <div className="row gx-5">
                    <div className="col">
                      <BackButton text="Annulla" />
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={handleSubmit}
                      >
                        {initialUserData ? "Aggiorna i dati" : "Registra"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserForm;
