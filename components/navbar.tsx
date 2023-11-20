// Paolo Bianchessi, 28/10/2023
// This is the Navbar Component, used for the navigation in the dashboard section

import ColorModeToggler from "@/components/colorModeToggler";
import NavLinks from "@/components/navbar/navLinks";
import User from "@/components/user";
import Link from "next/link";

export default function Navbar({
  position,
  shouldFetch,
}: {
  position: string;
  shouldFetch: boolean;
}) {
  return (
    <nav className={`navbar navbar-expand-lg ${position} bg-body-tertiary`}>
      <div className="container-fluid">
        <Link
          className="navbar-brand h1"
          href="/dashboard"
          style={{ color: "var(--main-color)" }}
        >
          Il Tuo Software Per La Comunicazone Aziendale
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {shouldFetch ? <NavLinks /> : ""}
          <ul className="nav navbar-nav flex-row flex-wrap ms-md-auto">
            <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
              <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
              <hr className="d-lg-none my-2 text-white-50" />
            </li>
            <hr className="d-lg-none my-2 text-white-50" />
            <User shouldFetch={shouldFetch} />
            <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
              <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
              <hr className="d-lg-none my-2 text-white-50" />
            </li>
            <ColorModeToggler />
          </ul>
        </div>
      </div>
    </nav>
  );
}
