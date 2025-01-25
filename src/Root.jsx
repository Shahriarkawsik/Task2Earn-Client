import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Header/Navbar";
import Footer from "./Components/Footer";

const Root = () => {
  const { pathname } = useLocation();
  return (
    <div>
      {(pathname !== "/register" && pathname !== "/login") && <Navbar />}

      <div className="min-h-screen">
        <Outlet />
      </div>
      {(pathname !== "/register" && pathname !== "/login") && <Footer />}
    </div>
  );
};

export default Root;
