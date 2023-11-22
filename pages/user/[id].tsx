import Loading from "@/components/ui/loading";
import Navbar from "@/components/navbar/index";
import UserForm from "@/components/userForm";
import { UserSecure } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const router = useRouter();
  const id = router.query.id;

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserSecure | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const token = cookies.token;
    if (!token) {
      router.push("/user/login");
      return;
    }
    axios
      .post("/api/user/get-by-id", {
        token: token,
        id: id,
      })
      .then((resp) => {
        setLoading(false);
        const user: UserSecure = resp.data.message;
        setUser(user);
      });
  }, [cookies.token, id, router]);

  return (
    <div>
      <Navbar position={"sticky-top"} shouldFetch={true} />
      {loading || !user ? (
        <Loading height={150} width={150} />
      ) : (
        // <UserForm initialUserData={user} />
        <p>
          {user.id}
          <br />
          {user.email}
          <br />
          {user.canModifyUsers}
          <br />
          {user.name}
          <br />
          {user.lastName}
        </p>
      )}
    </div>
  );
}
