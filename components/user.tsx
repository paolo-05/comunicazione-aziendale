import { UserType } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaArrowRightFromBracket,
  FaUser,
  FaUserPlus,
  FaUsersViewfinder,
} from "react-icons/fa6";
import Loading from "./loading";

export default function User() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = window.sessionStorage.getItem(process.env.APP_TOKEN_NAME!);
    if (!token) {
      router.push("/user/login");
      return;
    }
    axios.post("/api/user/resolve", {
      formData: {
        token: token
      }
    }).then((resp) => {
      setLoading(false);
      const user: UserType = resp.data;
      setUser(user);
    });
  }, [router]);

  
  return (
    loading ? (<Loading/>):(
    <div className="dropdown">
      <button
        className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center show"
        type="button"
        id="themeDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="bi my-1 theme-icon-active">
          <FaUser />
        </div>
        <span className="d-lg-none ms-2">
          {user ? (
            <div>Logato come {user.name + " " + user.lastName}</div>
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
    </div>)
  );
}
