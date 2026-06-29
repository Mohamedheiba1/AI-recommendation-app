import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === formData.email)) {
      alert("Email already exists");
      return;
    }
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: "",
      gender: "",
      movies: "",
      games: "",
      genres: "",
      series: "",
      music: "",
      hobbies: "",
      bio: "",
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("currentUser", JSON.stringify(newUser));
    sessionStorage.setItem("firstLogin", "true");
    alert("Account Created Successfully");
    navigate("/profile");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-page {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #0d0f1e 0%, #1a1040 50%, #0d0f1e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', sans-serif;
          padding: 20px;
        }

        .reg-card {
          width: 100%;
          max-width: 500px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 44px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }

        .reg-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
        }

        .reg-logo-icon {
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

        .reg-logo-text {
          color: white;
          font-weight: 700;
          font-size: 20px;
        }

        .reg-logo-text span { color: #a855f7; }

        .reg-decoration {
          position: absolute;
          top: 20px;
          right: 24px;
          font-size: 80px;
          opacity: 0.1;
          pointer-events: none;
        }

        .reg-title {
          color: white;
          font-weight: 800;
          font-size: 32px;
          margin-bottom: 10px;
        }

        .reg-subtitle {
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .reg-underline {
          width: 44px;
          height: 3px;
          background: linear-gradient(90deg, #7c3aed, #a855f7);
          border-radius: 2px;
          margin-bottom: 28px;
        }

        .reg-label {
          color: #cbd5e1;
          font-size: 13px;
          display: block;
          margin-bottom: 7px;
        }

        .reg-input-wrap {
          position: relative;
          margin-bottom: 16px;
        }

        .reg-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          font-size: 15px;
          pointer-events: none;
        }

        .reg-input {
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

        .reg-input::placeholder { color: #475569; }
        .reg-input:focus { border-color: #7c3aed; }

        .reg-eye {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          cursor: pointer;
          font-size: 15px;
        }

        .reg-btn {
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
          margin-bottom: 0;
          transition: opacity 0.2s;
        }

        .reg-btn:hover { opacity: 0.9; }

        .reg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }

        .reg-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .reg-divider-text { color: #64748b; font-size: 13px; }

        .reg-social-btn {
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

        .reg-social-btn:hover { background: rgba(255,255,255,0.08); }

        .reg-footer {
          text-align: center;
          color: #94a3b8;
          font-size: 14px;
          margin-top: 18px;
        }

        .reg-footer a {
          color: #a855f7;
          text-decoration: none;
          font-weight: 600;
        }

        @media (max-width: 520px) {
          .reg-card { padding: 36px 24px; border-radius: 20px; }
          .reg-title { font-size: 26px; }
        }

        @media (max-width: 360px) {
          .reg-card { padding: 28px 18px; }
          .reg-title { font-size: 22px; }
        }
      `}</style>

      <div className="reg-page">
        <div className="reg-card">
          <div className="reg-logo">
            <div className="reg-logo-icon">▶</div>
            <span className="reg-logo-text">
              Movie<span>AI</span>
            </span>
          </div>

          <div className="reg-decoration">🍿</div>

          <h2 className="reg-title">Create Account</h2>
          <p className="reg-subtitle">
            Join our recommendation platform and discover your next favorite!
          </p>
          <div className="reg-underline" />

          <label className="reg-label">Full Name</label>
          <div className="reg-input-wrap">
            <span className="reg-input-icon">👤</span>
            <input
              className="reg-input"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <label className="reg-label">Email</label>
          <div className="reg-input-wrap">
            <span className="reg-input-icon">✉</span>
            <input
              className="reg-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label className="reg-label">Password</label>
          <div className="reg-input-wrap">
            <span className="reg-input-icon">🔒</span>
            <input
              className="reg-input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ paddingRight: "42px" }}
            />
            <span
              className="reg-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <label className="reg-label">Confirm Password</label>
          <div className="reg-input-wrap" style={{ marginBottom: "26px" }}>
            <span className="reg-input-icon">🔒</span>
            <input
              className="reg-input"
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ paddingRight: "42px" }}
            />
            <span
              className="reg-eye"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "🙈" : "👁"}
            </span>
          </div>

          <button className="reg-btn" onClick={handleSubmit}>
            👤 Register
          </button>

          <div className="reg-divider">
            <div className="reg-divider-line" />
            <span className="reg-divider-text">or</span>
            <div className="reg-divider-line" />
          </div>

          <button className="reg-social-btn">🔵 Continue with Google</button>
          <button className="reg-social-btn">⚫ Continue with GitHub</button>

          <p className="reg-footer">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
