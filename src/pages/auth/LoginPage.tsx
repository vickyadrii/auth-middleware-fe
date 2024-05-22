import { useEffect } from "react";

import LoginForm from "@/features/auth/login/LoginForm";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login Page | Indive Technical Test";
  }, []);

  return <LoginForm />;
};

export default LoginPage;
