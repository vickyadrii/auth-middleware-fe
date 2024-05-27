import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// All pages
import MainLayout from "@/components/common/main-layout/MainLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import VerifyPage from "@/pages/auth/VerifyPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

const MainRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default MainRoutes;
