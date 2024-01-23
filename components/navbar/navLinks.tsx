import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <li>
        <Link
          href="/post/new"
          className="block md:px-4 transition hover:text-primary-700"
        >
          <span>Nuovo Annuncio</span>
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard"
          className="block md:px-4 transition hover:text-primary-700"
        >
          <span>Vai alla Dashboard</span>
        </Link>
      </li>
    </>
  );
}
