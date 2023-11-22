import Loading from "@/components/ui/loading";
import Navbar from "@/components/navbar/index";
import UserForm from "@/components/userForm";
import { UserType } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const id = router.query.id;

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = window.sessionStorage.getItem(process.env.APP_TOKEN_NAME!);
    if (!token) {
      router.push("/user/login");
      return;
    }
    axios
      .post("/api/user/get-by-id", {
        formData: {
          token: token,
          id: id,
        },
      })
      .then((resp) => {
        setLoading(false);
        const user: UserType = resp.data;
        setUser(user);
      });
  }, [id, router]);

  return (
    <div>
      <Navbar position={"sticky-top"} shouldFetch={false} />
      {loading ? (
        <Loading height={150} width={150} />
      ) : (
        <UserForm initialUserData={user} />
      )}
    </div>
  );
}
