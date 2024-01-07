import ReservedLinks from "@/components/navbar/reservedLinks";
import { UserSecure } from "@/types";
import Link from "next/link";
import {
  FaArrowRightFromBracket,
  FaPenToSquare,
  FaUser,
} from "react-icons/fa6";

type UserProps = {
  user: UserSecure | null;
};

/**
 * This is a dropdown menu used that contains all the links for user managment
 * @param user
 */
export default function User({ user }: UserProps) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center show"
        type="button"
        id="themeDropdown"
        data-bs-toggle={user ? "dropdown" : ""}
        aria-expanded="false"
      >
        <div className="bi my-1 theme-icon-active">
          <Link href="/auth/signin">
            <FaUser />
          </Link>
        </div>
        <span className="d-lg-none ms-2">
          {user ? (
            <div>Logato come {user.name + " " + user.lastName}</div>
          ) : user ? (
            <div>Loading... </div>
          ) : (
            <Link href="/auth/signin">Login</Link>
          )}
        </span>
      </button>
      {user ? (
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="themeDropdown"
        >
          {user?.canModifyUsers ? <ReservedLinks /> : ""}
          <li>
            <Link
              href={`/user/${user?.id}/change-password`}
              type="button"
              className="dropdown-item d-flex align-items-center"
              aria-pressed="true"
            >
              <div className="bi me-2 opacity-50 theme-icon">
                <FaPenToSquare />
              </div>
              Cambia Password
            </Link>
          </li>

          <li>
            <Link
              href="/auth/signout"
              type="button"
              className="dropdown-item d-flex align-items-center"
              aria-pressed="true"
            >
              <div className="bi me-2 opacity-50 theme-icon">
                <FaArrowRightFromBracket />
              </div>
              Log out
            </Link>
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
