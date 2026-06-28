import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;