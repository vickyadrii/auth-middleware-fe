import Profile from "@/features/profile/Profile";
import { useEffect } from "react";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "Verify Page | Indive Technical Test";
  }, []);

  return <Profile />;
};

export default ProfilePage;
