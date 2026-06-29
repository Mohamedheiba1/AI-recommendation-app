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
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <NavLink
          className="navbar-brand d-flex align-items-center gap-2"
          to="/profile"
        >
          <div style={{width:45,height:45,paddingTop:5}} className="rec-bot-icon">
              <i  className="bi bi-robot"></i>
          </div>
          <span>GIRA AI</span>
        </NavLink>

        <ul className="navbar-nav ms-auto align-items-center">
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

          <li className="nav-item mx-2 username">{currentUser?.name}</li>

          <li className="nav-item ms-2">
            <button onClick={logout} className="btn logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
