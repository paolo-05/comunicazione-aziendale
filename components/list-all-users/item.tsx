import { ItemProps } from "@/types/itemProps";
import { useEffect, useState } from "react";
import DeleteUserButton from "./deleteUserButton";
import ModifyUserButton from "./modifyUserButton";

export const Item = ({ user, session }: ItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleCloseDropdown = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };

    document.addEventListener("click", handleCloseDropdown);

    return () => {
      document.removeEventListener("click", handleCloseDropdown);
    };
  }, [isMenuOpen]);

  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user?.email}
      </th>

      <td className="px-4 py-3">{user?.name}</td>
      <td className="px-4 py-3">{user?.lastName}</td>
      <td className="px-4 py-3">{user?.id}</td>
      <td className="px-4 py-3">{user?.role === 0 ? "HR" : "Admin"}</td>
      <td className="px-4 py-3 flex items-center justify-end">
        <button
          id={""}
          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
          type="button"
          onClick={(e) => toggleDropdown(e)}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "absolute mt-24" : "hidden"
          } z-50 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ModifyUserButton user={user} session={session} />
          <DeleteUserButton user={user} session={session} />
        </div>
      </td>
    </tr>
  );
};
