import Navbar from "@/components/navbar/index";
import DeleteUserButton from "@/components/ui/deleteUserButton";
import { UserSecure } from "@/types";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

const ListAll = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCorrentUser] = useState<UserSecure | null>(null);
  const [users, setUsers] = useState<Array<UserSecure> | null>(null);
  const [cookies] = useCookies(["token"]);

  const fetchUsers = useCallback(() => {
    const token = cookies.token;
    if (!token) {
      router.push("/user/login");
      return;
    }

    axios
      .post("/api/user/resolve", { token: token })
      .then((response: any) => setCorrentUser(response.data.message))
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
  }, [cookies.token, router, setUsers]);

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
          <h1>Mostrando tutti i {users ? users.length : ".."} utenti</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Last Name</th>
                <th colSpan={2}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {!users ? (
                <tr>
                  <td colSpan={5}>Loading...</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index}>
                    <td scope="row">{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>
                      <Link
                        href={
                          user.id !== currentUser?.id
                            ? `/user/${user.id}`
                            : "/user/list-all"
                        }
                        type="button"
                        className={`btn btn-primary ${
                          user.id === currentUser?.id ? "disabled" : ""
                        }`}
                        aria-disabled={user.id === currentUser?.id}
                      >
                        Modifica
                      </Link>
                    </td>
                    <td>
                      <DeleteUserButton
                        id={user.id}
                        token={cookies.token}
                        disabled={user.id === currentUser!.id}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default ListAll;
