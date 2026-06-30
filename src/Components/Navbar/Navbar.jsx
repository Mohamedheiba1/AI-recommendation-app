import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const logout = () => {
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav
      style={{ zIndex: 100000 }}
      className="navbar navbar-expand-lg custom-navbar"
    >
      <div className="container">
        <NavLink
          className="navbar-brand d-flex align-items-center gap-2"
          to="/profile"
        >
          <div className="rec-bot-icon">
            <i className="bi bi-robot"></i>
          </div>

          <span>GIRA AI</span>
        </NavLink>

        {/* Mobile Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarMenu"
        >
          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Profile
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/recommendation"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Recommendation
              </NavLink>
            </li>

            {/* <li className="nav-item username">{currentUser?.name}</li> */}

            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <button onClick={logout} className="btn logout-btn w-100">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
