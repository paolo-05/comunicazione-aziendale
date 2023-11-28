import Navbar from "@/components/navbar/index";
import UserForm from "@/components/userForm";

const RegisterForm = () => {
  return (
    <>
      <Navbar position={"sticky-top"} shouldFetch={true} />
      <UserForm initialUserData={null} />
    </>
  );
};

export default RegisterForm;
