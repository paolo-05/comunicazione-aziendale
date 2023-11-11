import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function PasswordForm({ id, onPasswordChange, error }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pswError, setPswError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      <div id="pswHelp" className="form-text" style={{ color: "red" }}>
        {pswError}
      </div>
    </div>
  );
}
