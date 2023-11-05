import Layout from "@/components/layout";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";

const ListAll = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // to do
  });
  return (
    <Layout title="Gestione utenti">
      <Navbar />
    </Layout>
  );
};

export default ListAll;
