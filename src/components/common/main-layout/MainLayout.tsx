import { Toaster } from "@/components/ui/toaster";

type MainLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-7xl m-auto p-5 bg-white">
      {children}
      <Toaster />
    </div>
  );
};

export default MainLayout;
