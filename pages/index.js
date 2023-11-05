import Layout from "@/components/layout";
import Link from "next/link";

export default function Index() {
  return (
    <Layout title="HomePage">
      <h1>Home page</h1>
      <Link href="/user/login">Login</Link>
    </Layout>
  );
}
