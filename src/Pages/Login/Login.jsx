import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-page {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #0d0f1e 0%, #1a1040 50%, #0d0f1e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', sans-serif;
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 480px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 44px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }

        .login-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 36px;
        }

        .login-logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: white;
        }

        .login-logo-text {
          color: white;
          font-weight: 700;
          font-size: 20px;
        }

        .login-logo-text span {
          color: #a855f7;
        }

        .login-decoration {
          position: absolute;
          top: 20px;
          right: 24px;
          font-size: 80px;
          opacity: 0.1;
          pointer-events: none;
        }

        .login-title {
          color: white;
          font-weight: 800;
          font-size: 32px;
          margin-bottom: 10px;
        }

        .login-subtitle {
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .login-underline {
          width: 44px;
          height: 3px;
          background: linear-gradient(90deg, #7c3aed, #a855f7);
          border-radius: 2px;
          margin-bottom: 32px;
        }

        .login-label {
          color: #cbd5e1;
          font-size: 13px;
          display: block;
          margin-bottom: 7px;
        }

        .login-input-wrap {
          position: relative;
          margin-bottom: 18px;
        }

        .login-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          font-size: 15px;
          pointer-events: none;
        }

        .login-input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: border 0.2s;
        }

        .login-input::placeholder { color: #475569; }
        .login-input:focus { border-color: #7c3aed; }

        .login-eye {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          cursor: pointer;
          font-size: 15px;
        }

        .login-forgot {
          text-align: right;
          margin-bottom: 26px;
        }

        .login-forgot a {
          color: #a855f7;
          font-size: 13px;
          text-decoration: none;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s;
        }

        .login-btn:hover { opacity: 0.9; }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 22px 0;
        }

        .login-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .login-divider-text {
          color: #64748b;
          font-size: 13px;
        }

        .login-social-btn {
          width: 100%;
          padding: 12px;
          margin-bottom: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
        }

        .login-social-btn:hover { background: rgba(255,255,255,0.08); }

        .login-footer {
          text-align: center;
          color: #94a3b8;
          font-size: 14px;
          margin-top: 18px;
        }

        .login-footer a {
          color: #a855f7;
          text-decoration: none;
          font-weight: 600;
        }

        @media (max-width: 520px) {
          .login-card { padding: 36px 24px; border-radius: 20px; }
          .login-title { font-size: 26px; }
        }

        @media (max-width: 360px) {
          .login-card { padding: 28px 18px; }
          .login-title { font-size: 22px; }
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">▶</div>
            <span className="login-logo-text">
              Movie<span>AI</span>
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
            <span className="login-input-icon">✉</span>
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
            <span className="login-input-icon">🔒</span>
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
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <div className="login-forgot">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button className="login-btn" onClick={handleSubmit}>
            <span>→</span> Login
          </button>

          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">or</span>
            <div className="login-divider-line" />
          </div>

          <button className="login-social-btn">🔵 Continue with Google</button>
          <button className="login-social-btn">⚫ Continue with GitHub</button>

          <p className="login-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
