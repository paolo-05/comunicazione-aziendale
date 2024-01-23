import { useState } from "react";

type PasswordProps = {
  id: string;
  label: string;
  showText: number;
  checkRegex: boolean;
  onChange: (value: string, error: boolean) => void;
};

export const Password = ({
  id,
  label,
  showText,
  checkRegex,
  onChange,
}: PasswordProps) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-.!@#\$%\^&\*]).{8,}$/;

  const [showRegexErr, setShowRegexErr] = useState(false);

  const handlePasswordChange = (value: string) => {
    if (!passwordRegex.test(value) && checkRegex) {
      setShowRegexErr(true);
    } else {
      setShowRegexErr(false);
    }
    onChange(value, showRegexErr);
  };

  return (
    <>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={showText === 1 ? "text" : "password"}
        name={id}
        id={id}
        placeholder={showText ? "SuperSegretaPassword123" : "••••••••"}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={true}
        onChange={(e) => handlePasswordChange(e.target.value)}
      />
      {showRegexErr && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Attento! </span>La Password deve
          contenere almeno 8 caratteri, con maiuscole, minuscole, numeri e
          caratteri speciali.
        </p>
      )}
    </>
  );
};
