import Layout from "@/components/layout";
import Navbar from "@/components/navbar";
import UserForm from "@/components/userForm";

const RegisterForm = () => {
  return (
    <Layout title="Registra un nuovo utente">
      <Navbar />
      <UserForm />
    </Layout>
  );
};

export default RegisterForm;
