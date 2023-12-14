import Link from "next/link";
import { FaUserPlus, FaUsersViewfinder } from "react-icons/fa6";

export default function ReservedLinks() {
  return (
    <>
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
    </>
  );
}
