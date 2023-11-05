// Paolo Bianchessi, 28/10/2023
// This is the Navbar Component, used for the navigation in the dashboard section

import Link from "next/link";
import { FaHouse } from "react-icons/fa6";
import ColorModeToggler from "./colorModeToggler";
import User from "./user";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand h1" href="/dashboard">
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-1">
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/post/new">
                Nuovo Annuncio
              </Link>
            </li>
          </ul>
          {"|"}
          <User />
          <ColorModeToggler />
        </div>
      </div>
    </nav>
  );
}
