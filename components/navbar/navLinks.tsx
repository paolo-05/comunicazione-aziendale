import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <li>
        <Link href="/" className="block md:px-4 transition hover:text-primary">
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link
          href="/post/new"
          className="block md:px-4 transition hover:text-primary"
        >
          <span>Nuovo Annuncio</span>
        </Link>
      </li>
    </>
  );
}
