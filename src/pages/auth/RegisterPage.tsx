import { useEffect } from "react";

import RegisterForm from "@/features/auth/register/RegisterForm";

const Register = () => {
  useEffect(() => {
    document.title = "Register Page | Indive Technical Test";
  }, []);

  return <RegisterForm />;
};

export default Register;
