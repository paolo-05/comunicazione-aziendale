import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";

type DiscordUserProps = {
  session: Session | null;
};

export default function User({ session }: DiscordUserProps) {
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

  if (!session) {
    return (
      <div className="mt-12 lg:mt-0">
        <Link
          href="/dashboard"
          className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
        >
          <span className="relative text-sm font-semibold text-white">
            Login
          </span>
        </Link>
      </div>
    );
  } else {
    const { user } = session;
    return (
      <div className="mt-12 lg:mt-0">
        <div className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
          <button
            onClick={(e) => toggleDropdown(e)}
            type="button"
            className="relative text-sm font-semibold text-white"
          >
            <span className="ml-2">Loggato come {user?.name}</span>
          </button>
        </div>

        <div
          className={`${
            !isMenuOpen && "hidden"
          } absolute z-50 mt-4 w-56 rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 dark:bg-gray-800 `}
        >
          {session.user.role === 1 && (
            <div className="py-1">
              <Link href="/user/list-all">
                <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 truncate hover:bg-gray-200 dark:hover:bg-gray-700">
                  Gestisci Utenti
                </p>
              </Link>
            </div>
          )}

          <div className="py-1">
            <Link href="/user/change-password">
              <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 truncate hover:bg-gray-200 dark:hover:bg-gray-700">
                Cambia Password
              </p>
            </Link>
          </div>
          <div className="py-1">
            <Link
              href="/auth/signout"
              className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
