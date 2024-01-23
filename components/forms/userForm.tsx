import { UserSecure } from "@/types/types";
import { DangerAlert } from "@/components/alerts/";
import { useEffect, useState } from "react";
import { Password } from ".";
import { Text } from ".";
import { UserFormType } from "@/types/userFormType";

type UserFormProps = {
  initialUserData?: UserSecure | null;
  handleSubmit: (e: any, form: UserFormType) => void;
};

export const UserForm = ({ initialUserData, handleSubmit }: UserFormProps) => {
  const [showPsw, setShowPsw] = useState(0);
  const [form, setForm] = useState({
    id: -1,
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastName: "",
    role: -1,
  });

  const handleShowPswChange = () => {
    setShowPsw(showPsw ^ 1);
  };

  const handleEmailChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, email: value }));
  };

  const handlePswChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, password: value }));
  };

  const handleConfirmPswChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, confirmPassword: value }));
  };

  const handleNameChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, name: value }));
  };

  const handleLastNameChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, lastName: value }));
  };

  const handleRoleChange = (value: any) => {
    setForm((prevForm) => ({ ...prevForm, role: value }));
  };

  useEffect(() => {
    if (!initialUserData) return;

    setForm((prevForm) => ({ ...prevForm, id: initialUserData.id }));

    handleEmailChange(initialUserData.email);
    handleNameChange(initialUserData.name);
    handleLastNameChange(initialUserData.lastName);
    handleRoleChange(initialUserData.role);
  }, [initialUserData]);

  return (
    <form onSubmit={(e) => handleSubmit(e, form)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email (richiesto)
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="john.doe@example.com"
            required={true}
            onChange={(e) => handleEmailChange(e.target.value)}
            value={form.email}
          />
        </div>

        {!initialUserData && (
          <>
            <div className="sm:col-span-2">
              <Password
                id={"password"}
                label={"Password (richiesto)"}
                showText={showPsw}
                checkRegex={true}
                onChange={handlePswChange}
              />
            </div>
            <div className="sm:col-span-2">
              <Password
                id={"confirm-password"}
                label={"Conferma Password (richiesto)"}
                showText={showPsw}
                checkRegex={false}
                onChange={handleConfirmPswChange}
              />
              <div className="flex items-start my-2">
                <div className="flex items-center h-5">
                  <input
                    id="show-psw"
                    aria-describedby="show-psw"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required={false}
                    value={showPsw}
                    onChange={handleShowPswChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="show-psw"
                    className="font-light text-gray-500 dark:text-gray-300 underline"
                  >
                    Mostra password
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="w-full">
          <Text
            id="name"
            label="Nome (richiesto)"
            placeholder="John"
            initialValue={form.name}
            checkRegex={true}
            onChange={handleNameChange}
          />
        </div>
        <div className="w-full">
          <Text
            id="lastName"
            label="Cognome (richiesto)"
            placeholder="Doe"
            initialValue={form.lastName}
            checkRegex={true}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Roulo
          </label>
          <select
            id="category"
            onChange={(e) => handleRoleChange(e.target.value)}
            value={form.role}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          >
            <option value={-1}>Seleziona il ruolo</option>
            <option value={0}>HR</option>
            <option value={1}>Admin</option>
          </select>

          <div className="my-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Spiegazione: </span>
            <ul>
              <li>
                <span className="text-bold">HR</span>: può
                insirire/modificare/eliminare eventi
              </li>
              <li>
                <span className="text-bold">Admin</span>: può
                insirire/modificare/eliminare utenti e può fare ciò che fa un
                utente HR
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {initialUserData ? "Aggiorna" : "Registra"}
      </button>
    </form>
  );
};
