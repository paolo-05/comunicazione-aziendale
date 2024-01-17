import { UserSecure } from "@/types/types";
import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";

type ItemProps = {
  user: UserSecure;
  session: Session | null;
};

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
        {user.email}
      </th>

      <td className="px-4 py-3">{user.name}</td>
      <td className="px-4 py-3">{user.lastName}</td>
      <td className="px-4 py-3">{user.id}</td>
      <td className="px-4 py-3">{user.role === 0 ? "HR" : "Admin"}</td>
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
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                href={
                  session?.user.id === user.id ? "/user/list-all" : "/user/edit"
                }
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {session?.user.id === user.id ? "Non modificabile" : "Modifica"}
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <Link
              href="#"
              className="block py-2 px-4 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400 dark:hover:text-white"
            >
              {session?.user.id === user.id ? "Non eliminabile" : "Elimina"}
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
};
