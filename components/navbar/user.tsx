import Loading from "@/components/ui/loading";
import { UserSecure } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  FaArrowRightFromBracket,
  FaUser,
  FaUserPlus,
  FaUsersViewfinder,
} from "react-icons/fa6";

/**
 * This is a dropdown menu used that contains all the links for user managment
 * @param shouldFetch
 */
export default function User({ shouldFetch }: { shouldFetch: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserSecure | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }
    setLoading(true);
    const token = cookies.token;
    if (!token) {
      router.push("/user/login");
      return;
    }
    axios
      .post("/api/user/resolve", {
        token: token,
      })
      .then((response) => {
        const user: UserSecure = response.data.message;
        setUser(user);
        setLoading(false);
      })
      .catch((err) => {
        removeCookie("token");
        router.push("/user/login");

        setLoading(false);
      });
  }, [cookies, removeCookie, router, shouldFetch]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center show"
        type="button"
        id="themeDropdown"
        data-bs-toggle={shouldFetch ? "dropdown" : ""}
        aria-expanded="false"
        disabled={loading && shouldFetch}
      >
        <div className="bi my-1 theme-icon-active">
          {loading && shouldFetch ? (
            <Loading width={30} height={30} />
          ) : (
            <Link href="/user/login">
              <FaUser />
            </Link>
          )}
        </div>
        <span className="d-lg-none ms-2">
          {user ? (
            <div>Logato come {user.name + " " + user.lastName}</div>
          ) : shouldFetch ? (
            <div>Loading... </div>
          ) : (
            <Link href="/user/login">Login</Link>
          )}
        </span>
      </button>
      {shouldFetch ? (
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
      ) : (
        ""
      )}
    </div>
  );
}
