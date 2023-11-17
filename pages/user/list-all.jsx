import Layout from "@/components/layout";
import Navbar from "@/components/navbar";
import { constants } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ListAll = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = window.sessionStorage.getItem(constants.appTokenName);
    if (!token) {
      router.push("/user/login");
    }
    const fetchUsers = async () => {
      const response = await fetch("/api/user/list-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      let data = null;
      switch (response.status) {
        case 200:
          data = await response.json();
          setUsers(data.message);
          break;
        case 401:
          router.push("/user/login");
          break;
        default:
          data = await response.json();
          console.log(data.message);
          break;
      }
    };
    fetchUsers().catch(console.error);
  }, [router]);

  const deleteUser = async (id) => {
    const response = await fetch("/api/user/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      router.reload();
    } else {
      const data = await response.json();
      console.error(data.message);
    }
  };

  return (
    <Layout title="Gestione utenti">
      <Navbar />
      <div className="container mt-3">
        <h1>Mostrando tutti i {users.length} utenti</h1>
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
            {users.map((user, index) => (
              <tr key={index}>
                <td scope="row">{user.email}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
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
                    onClick={() => deleteUser(user.id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ListAll;
