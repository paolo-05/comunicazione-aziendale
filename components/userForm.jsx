import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const UserForm = ({ initialUserData }) => {
  const router = useRouter();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const nameRegex = /^[A-Za-z]+$/;

  const [id, setId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [power, setPower] = useState(-1);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showPassword);
  };

  const errors = {
    email: "Invalid Email.",
    password:
      "Password must contain at least 8 characters, including lower and upper case letters, numbers, and special symbols.",
    name: "Name can only contain alphabetic characters.",
    lastName: "Last name can only contain alphabetic characters.",
  };

  useEffect(() => {
    if (initialUserData) {
      setId(initialUserData.id || "");
      setEmail(initialUserData.email || "");
      setPower(initialUserData.power || -1);
      setName(initialUserData.name || "");
      setLastName(initialUserData.lastname || "");
    }
  }, [initialUserData]);

  function isValidEmail(email) {
    return emailRegex.test(email);
  }

  // function isValidPassword(password) {
  //   return passwordRegex.test(password);
  // }

  function isValidName(name) {
    return nameRegex.test(name);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!initialUserData) {
      /**
       * Register a new user.
       */
      const response = await fetch("/api/register", {
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
      const response = await fetch("/api/edit", {
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
    <div className="container">
      <h1>{initialUserData ? "Edit User" : "Register"}</h1>
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
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Vecchia Password: {"(Richiesto)"}
              </label>

              <input
                type={showOldPassword ? "text" : "password"}
                className="form-control"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />

              <div id="pswHelp" className="form-text">
                {/* to do: chek if the old psw is correct */}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Nuova Password: {"(Richiesto)"}
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span class="input-group-text" id="basic-addon2">
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
          </>
        ) : (
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

            {/* <div id="pswHelp" className="form-text">
            {isValidPassword(password) || password === "" ? (
              ""
            ) : (
              <span className="error">{errors.password}</span>
            )}
          </div> */}
          </div>
        )}
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
};

export default UserForm;
