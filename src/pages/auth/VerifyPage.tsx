import Verify from "@/features/auth/verify/Verify";
import { useEffect } from "react";

const VerifyPage = () => {
  useEffect(() => {
    document.title = "Verify Page | Indive Technical Test";
  }, []);

  return <Verify />;
};

export default VerifyPage;
