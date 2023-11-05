import { useEffect, useState } from "react";
import {
  FaUser,
  FaUserPlus,
  FaUsersViewfinder,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import { constants } from "@/constants";
import Link from "next/link";
export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.sessionStorage.getItem(constants.appTokenName);
    if (!token) {
      return (window.location.href = "/user/login");
    }
    const fetchUser = async () => {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data.message);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    };
    fetchUser().catch(console.error);
  }, []);

  return (
    <div className="dropdown">
      <button
        className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center show"
        type="button"
        id="themeDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="bi ms-2">
          <FaUser />
        </div>
        <span className="d-lg-none ms-2">
          {user ? (
            <div>Logato come {user.name + " " + user.lastname}</div>
          ) : (
            <div>Loading... </div>
          )}
        </span>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="themeDropdown"
      >
        <li>
          <Link
            href="/user/register"
            type="button"
            className="dropdown-item d-flex align-items-center"
            data-bs-theme-value="light"
            aria-pressed="false"
          >
            <div className="bi me-2 opacity-50 theme-icon">
              <FaUserPlus />
            </div>
            Registra un nuovo gestore per gli annunci
          </Link>
        </li>
        <li>
          <Link
            href="/user/list-all"
            type="button"
            className="dropdown-item d-flex align-items-center"
            data-bs-theme-value="dark"
            aria-pressed="false"
          >
            <div className="bi me-2 opacity-50 theme-icon">
              <FaUsersViewfinder />
            </div>
            Mostra tutti gli utenti registati
          </Link>
        </li>
        <li>
          <Link
            href="/user/logout"
            type="button"
            className="dropdown-item d-flex align-items-center"
            data-bs-theme-value="auto"
            aria-pressed="true"
          >
            <div className="bi me-2 opacity-50 theme-icon">
              <FaArrowRightFromBracket />
            </div>
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
}
