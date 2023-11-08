import Layout from "@/components/layout";
import Navbar from "@/components/navbar";
import { constants } from "@/constants";
import { useState, useEffect } from "react";
import Link from "next/link";

const ListAll = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const token = window.sessionStorage.getItem(constants.appTokenName);
    const fetchUsers = async () => {
      const response = await fetch("/api/list-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUsers(data.message);
      } else {
        const data = await response.json();
        console.log(data.message);
      }
    };
    fetchUsers().catch(console.error);
  }, []);

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
                  <a
                    href={`/user/${user.id}`}
                    type="button"
                    className="btn btn-danger"
                  >
                    Elimina
                  </a>
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
