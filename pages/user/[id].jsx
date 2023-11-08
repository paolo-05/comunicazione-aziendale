import Layout from "@/components/layout";
import Navbar from "@/components/navbar";
import UserForm from "@/components/userForm";
import { constants } from "@/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const id = router.query.id;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.sessionStorage.getItem(constants.appTokenName);
    const fetchUser = async () => {
      const response = await fetch("/api/get-by-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, id }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data.message);
      } else {
        window.location.href = "/user/list-all";
      }
    };
    fetchUser().catch(console.error);
  }, [id]);

  return (
    <Layout title="Modifica Utente">
      <Navbar />
      <UserForm initialUserData={user} />
    </Layout>
  );
}
