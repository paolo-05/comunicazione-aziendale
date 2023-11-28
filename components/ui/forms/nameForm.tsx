import { useEffect, useState } from "react";

export default function NameForm({
  id,
  placeholder,
  nameError,
  handleValueChange,
}: {
  id: string;
  placeholder: string;
  nameError: string | null;
  handleValueChange: Function;
}) {
  const nameRegex = /^[A-Za-z]+$/;
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function isValidName(name: string) {
    if (name === "") {
      setError("Campo richiesto.");
      return;
    }
    if (nameRegex.test(name)) {
      setError("");
      return;
    }
    setError("Formato non valido");
  }

  useEffect(() => {
    if (nameError) setError(nameError);

    handleValueChange(value);
  }, [handleValueChange, nameError, value]);

  return (
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        {id === "name" ? "Nome" : "Cognome"}: {"(Richiesto)"}
      </label>
      <input
        type="text"
        className={`form-control form-control-lg ${
          error !== "" ? "border border-danger" : ""
        }`}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          isValidName(e.target.value);
        }}
      />
      <div id="nameHelp" className="form-text text-danger">
        {error}
      </div>
    </div>
  );
}
