import CapsLock from "@/components/ui/capsLock";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type PasswordFormProps = {
  id: string;
  placeholder: string;
  pswError: string | null;
  checkRegex: boolean;
  onPasswordChange: Function;
};

/**
 * A dynamic password input form
 * @param id a string that rapresents the element in the DOM
 * @param placeholder for helping the user
 * @param pswError a number rapresenting the possible errors about the password
 * @param onPasswordChange a function for handling password change
 */
export default function PasswordForm({
  id,
  placeholder,
  pswError,
  checkRegex,
  onPasswordChange,
}: PasswordFormProps) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-.!@#\$%\^&\*]).{8,}$/;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function isValidPassword(password: string) {
    if (password === "") {
      setError("Campo richiesto.");
      return;
    }

    if (passwordRegex.test(password) || !checkRegex) {
      setError("");
      return;
    }
    setError(
      "La Password deve contenere almeno 8 caratteri, " +
        "con maiuscole, minuscole, numeri e caratteri speciali."
    );
  }

  useEffect(() => {
    if (pswError !== null) {
      setError(pswError);
    }
    onPasswordChange(password);
  }, [error, onPasswordChange, password, pswError]);

  return (
    <div className="mb-3">
      <label htmlFor={`${id}-password`}>
        {" "}
        {id === "old"
          ? "Vecchia"
          : id === "new"
          ? "Nuova"
          : id === "confirm"
          ? "Conferma"
          : ""}{" "}
        Password
        {" (Richiesto)"}
      </label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          autoComplete="false"
          className={`form-control form-control-lg ${
            error !== "" ? "border border-danger" : ""
          }`}
          id={`${id}-password`}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            // only removed in dev phase
            isValidPassword(e.target.value);
          }}
          placeholder={placeholder}
        />
        <span className="input-group-text" id="basic-addons2">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </span>
      </div>
      <div id="pswHelp" className="form-text">
        <div className="text-danger mb-1">{error}</div>
        <div className="mt-1">
          <CapsLock />
        </div>
      </div>
    </div>
  );
}
