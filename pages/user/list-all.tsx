import Navbar from "@/components/navbar/index";
import Modal from "@/components/ui/modal";
import Delete from "@/components/ui/delete";
import { UserSecure } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const ListAll = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<UserSecure> | null>(null);
  const [cookies, setCookie] = useCookies(["token"]);

  const fetchUsers = useCallback(() => {
    const token = cookies.token;
    if (!token) {
      router.push("/user/login");
      return;
    }

    axios
      .post("/api/user/list-all", {
        token: token,
      })
      .then((response) => {
        const users: Array<UserSecure> = response.data.message;
        setUsers(users);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [cookies.token, router, setUsers]);

  useEffect(() => {
    if (loading) fetchUsers();

    return;
  }, [fetchUsers, loading]);

  return (
    <>
      <Navbar position={"sticky-top"} shouldFetch={true} />
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
                      href={`/user/${user.id}`}
                      type="button"
                      className="btn btn-primary"
                    >
                      Modifica
                    </Link>
                  </td>
                  <td>
                    <Delete id={user.id} token={cookies.token} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListAll;
