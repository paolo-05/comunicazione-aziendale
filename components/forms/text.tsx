import { useState } from "react";

type TextProps = {
  id: string;
  label: string;
  placeholder: string;
  initialValue: string | null;
  checkRegex: boolean;
  onChange: (value: string) => void;
};

export const Text = ({
  id,
  label,
  placeholder,
  initialValue,
  checkRegex,
  onChange,
}: TextProps) => {
  const plainTextRegex = /^[A-Za-z]+$/;
  const [value, setValue] = useState(initialValue);
  const [showRegexErr, setShowRegexErr] = useState(false);

  const handleValueChange = (value: string) => {
    if (!plainTextRegex.test(value) && checkRegex) {
      setShowRegexErr(true);
    } else {
      setShowRegexErr(false);
    }
    onChange(value);
    setValue(value);
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
        type="text"
        name={id}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder={placeholder}
        required={true}
        value={initialValue || ""}
        onChange={(e) => handleValueChange(e.target.value)}
      />
      {showRegexErr && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Attento! </span>Formato non valido.
        </p>
      )}
    </>
  );
};
