import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import CapsLock from "./capsLock";

/**
 * A dynamic password input form
 * @param id a string that rapresents the element in the DOM
 * @param placeholder for helping the user
 * @param error a number rapresenting the possible errors
 * @param onPasswordChange a function for handling password change
 */
export default function PasswordForm({
  id,
  placeholder,
  error,
  onPasswordChange,
}: {
  id: string;
  placeholder: string;
  error: number | null;
  onPasswordChange: Function;
}) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pswError, setPswError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // function isValidPassword(password) {
  //   return passwordRegex.test(password);
  // }

  useEffect(() => {
    switch (error) {
      case 0:
        setPswError(
          "La Password deve contenere almeno 8 caratteri, con maiuscole, minuscole, numeri e caratteri speciali."
        );
        break;
      case 1:
        setPswError("La vecchia password non corrisponde.");
        break;
      case 2:
        setPswError("Le password non possono essere uguali.");
        break;
      case 3:
        setPswError("Email o password non corrette");
        break;
      default:
        break;
    }

    onPasswordChange(password);
  }, [onPasswordChange, password, error]);

  return (
    <div className="mb-3">
      <label htmlFor={`${id}-password`}>
        {" "}
        {id === "old" ? "Vecchia" : id === "new" ? "Nuova" : ""} Password{" "}
        {"(Richiesto)"}
      </label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control form-control-lg"
          id={`${id}-password`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <div className="text-danger mb-1">{pswError}</div>
        <div className="mt-1">
          <CapsLock />
        </div>
      </div>
    </div>
  );
}
