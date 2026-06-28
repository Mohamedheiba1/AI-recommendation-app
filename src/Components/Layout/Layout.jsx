import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
}

export default Layout;