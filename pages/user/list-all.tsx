import ListAllUsers from "@/components/list-all-users";
import Navbar from "@/components/navbar/index";
import { UserSecure } from "@/types";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function ListAll() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCorrentUser] = useState<UserSecure | null>(null);
  const [users, setUsers] = useState<Array<UserSecure> | null>(null);
  const [cookies, setCookie] = useCookies(["token"]);

  const fetchUsers = useCallback(() => {
    const token = cookies.token;
    if (!token) {
      router.push("/auth/signin");
      return;
    }

    axios
      .post("/api/user/resolve", { token: token })
      .then((response: any) => {
        const cookie = response.data.cookies.split("=")[1];
        setCookie("token", cookie, {
          path: "/",
          // secure: true,
          // sameSite: true,
          maxAge: 3600,
        });

        setCorrentUser(response.data.message);
      })
      .catch((err: any) => console.log(err));

    axios
      .post("/api/user/list-all", {
        token: token,
      })
      .then((response: any) => {
        const users: Array<UserSecure> = response.data.message;
        setUsers(users);
        setLoading(false);
      })
      .catch((err: any) => console.log(err));
  }, [cookies.token, router, setCookie]);

  useEffect(() => {
    if (loading) fetchUsers();

    return;
  }, [fetchUsers, loading]);

  return (
    <>
      <Head>
        <title>Visualizzando tutti gli utenti</title>
      </Head>
      <main className={inter.className}>
        <Navbar position={"sticky-top"} user={currentUser} />
        <div className="container mt-3">
          <div className="card">
            <div className="card-header text-end">
              <Link className="btn btn-primary" href="/user/register">
                Registra un nuovo utente
              </Link>
            </div>
            <div className="card-body">
              <div className="card-title">
                <h1>Mostrando tutti i {users ? users.length : ".."} utenti</h1>
              </div>
              <ListAllUsers
                users={users}
                currentUser={currentUser}
                token={cookies.token}
              />
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </main>
    </>
  );
}
