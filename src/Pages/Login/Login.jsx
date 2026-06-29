import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password,
    );

    if (!user) {
      alert("Invalid Email or Password");
      return;
    }

    // حفظ المستخدم الحالي بكل بياناته
    sessionStorage.setItem("currentUser", JSON.stringify(user));

    alert(`Welcome ${user.name}`);

    navigate("/profile");
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg,#141E30,#243B55)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "420px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center fw-bold mb-2">Welcome Back</h2>

        <p className="text-center text-secondary mb-4">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="text-end mb-3">
              <Link to="/forgot-password" className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?
          <Link to="/register" className="ms-2 text-decoration-none">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
