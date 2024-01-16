import { useEffect, useState } from "react";

type EmailFormProps = {
  id: string;
  initialValue: string;
  placeholder: string;
  emailError: string | null;
  handleValueChange: Function;
};

export default function EmailForm({
  id,
  initialValue,
  placeholder,
  emailError,
  handleValueChange,
}: EmailFormProps) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  function isValidEmail(email: string) {
    if (email === "") {
      setError("Campo richiesto.");
      return;
    }
    if (emailRegex.test(email)) {
      setError("");
      return;
    }
    setError("Formato non valido.");
  }

  useEffect(() => {
    if (emailError) setError(emailError);
    handleValueChange(value);
  }, [emailError, handleValueChange, value]);

  return (
    <div className="mb-5">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Email: {"(Richiesto)"}
      </label>
      <input
        type="email"
        autoComplete="false"
        className={`form-control form-control-lg ${
          error !== "" ? "border border-danger" : ""
        }`}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          isValidEmail(e.target.value);
        }}
      />
      <div id="emailHelp" className="form-text text-danger">
        {error}
      </div>
    </div>
  );
}
