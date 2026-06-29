import { Link, useNavigate } from "react-router-dom";
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
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/profile"
        >
          <i className="bi bi-lightning-charge-fill logo-icon"></i>
          <span>MovieAI</span>
        </Link>

        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Profile
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/recommendation"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Recommendation
            </Link>
          </li>

          <li className="nav-item mx-4 username">{currentUser?.name}</li>

          <li className="nav-item">
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
