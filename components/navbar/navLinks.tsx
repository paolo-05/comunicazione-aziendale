import Link from "next/link";

export default function NavLinks() {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-1">
      <li className="nav-item">
        <Link className="nav-link py-2 px-0 px-lg-2" href="/dashboard">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link py-2 px-0 px-lg-2" href="/post/new">
          Nuovo Annuncio
        </Link>
      </li>
    </ul>
  );
}
