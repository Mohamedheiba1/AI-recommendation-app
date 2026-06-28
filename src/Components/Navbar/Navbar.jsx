import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const logout = () => {
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          MovieAI
        </Link>

        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/recommendation">
              Recommendation
            </Link>
          </li>

          <li className="nav-item mx-3 text-white">{currentUser?.name}</li>

          <li className="nav-item">
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
