import Link from "next/link";
import Template from "@/app/template";
import ColorModeToggler from "@/components/colorModeToggler";
import NewNavbar from "@/components/new-navbar";

export default function Index() {
  return (
    <div>
      <div className="theme-toggler">
        <ColorModeToggler />
      </div>
      <NewNavbar />
      <h1>Home page</h1>
      <Link href="/user">Login</Link>
    </div>
  );
}
