import { Outlet } from "react-router-dom";
import Navbar from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";


const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
