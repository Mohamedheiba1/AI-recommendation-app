import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    alert(`Welcome ${user.name}`);
    navigate("/profile");
  };

  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">
            <div style={{ paddingTop: 15 }}>
              <div style={{ width: 45, height: 45 }} className="rec-bot-icon">
                <i className="bi bi-robot"></i>
              </div>
            </div>
            <span className="login-logo-text">
              GIRA <span>AI</span>
            </span>
          </div>

          <div className="login-decoration">🎬</div>

          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">
            Login to continue discovering amazing movies, games and more.
          </p>
          <div className="login-underline" />

          <label className="login-label">Email</label>
          <div className="login-input-wrap">
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label className="login-label">Password</label>
          <div className="login-input-wrap">
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ paddingRight: "42px" }}
            />
            <span
              className="login-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁" : "👁"}
            </span>
          </div>

          <div className="login-forgot">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button className="login-btn" onClick={handleSubmit}>
            <span>→</span> Login
          </button>

          <p className="login-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
