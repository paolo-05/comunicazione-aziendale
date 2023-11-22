import Navbar from "@/components/navbar/index";
import Modal from "@/components/ui/modal";
import { UserSecure } from "@/types";
import axios from "axios";
import { error } from "console";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const ListAll = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<UserSecure> | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

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
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [cookies.token, router, setUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = (id: number) => {
    setLoading(true);
    axios
      .post("/api/user/delete", {
        id: id,
      })
      .then((response) => {})
      .catch((error) => {});
    setLoading(false);
  };

  return (
    <div>
      <Modal
        id="deleteUser"
        title="Attenzione!"
        description="L'eliminazione di un utente è un'azione irreversibile."
        discardText="Annulla."
        saveText="Ho capito. Voglio proseguire."
      />
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
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#delete"
                      type="button"
                      className="btn btn-danger"
                      disabled={loading}
                    >
                      Elimina
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAll;
