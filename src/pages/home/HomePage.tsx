import { Button } from "@/components/ui/button";
import { api } from "@/configs";
import { useEffect } from "react";

const HomePage = () => {
  const handleGetData = () => {
    api.get("/").then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <div>
      <p>HomePage</p>
      <Button>Halo!</Button>
    </div>
  );
};

export default HomePage;
