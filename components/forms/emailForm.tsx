import { useEffect, useState } from "react";

export const EmailForm = ({
  id,
  initialValue,
  placeholder,
  error,
  onValueChange,
}: FormProps) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [value, setValue] = useState(initialValue);
  const [emailError, setEmailError] = useState("");

  function isValidEmail(email: string) {
    if (email === "") {
      setEmailError("Campo richiesto.");
      return;
    }
    if (emailRegex.test(email)) {
      setEmailError("");
      return;
    }
    setEmailError("Formato non valido.");
  }

  useEffect(() => {
    if (emailError) setEmailError(emailError);
    onValueChange(value);
  }, [emailError, onValueChange, value]);

  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        id={id}
        type="email"
        name="floating_email"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor={id}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Email address
      </label>
    </div>
  );
};
