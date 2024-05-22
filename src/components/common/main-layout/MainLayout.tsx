type MainLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <div className="max-w-7xl m-auto p-5 bg-white">{children}</div>;
};

export default MainLayout;
