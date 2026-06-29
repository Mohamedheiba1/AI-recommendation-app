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

  const inputStyle = {
    width: "100%",
    padding: "12px 14px 12px 40px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0d0f1e 0%, #1a1040 50%, #0d0f1e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "40px 36px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: "14px" }}>▶</span>
          </div>
          <span style={{ color: "white", fontWeight: "700", fontSize: "18px" }}>
            Movie<span style={{ color: "#a855f7" }}>AI</span>
          </span>
        </div>

        {/* Popcorn decoration */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "20px",
            fontSize: "64px",
            opacity: 0.15,
          }}
        >
          🍿
        </div>

        <h2
          style={{
            color: "white",
            fontWeight: "800",
            fontSize: "28px",
            margin: "0 0 8px",
          }}
        >
          Create Account
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 8px" }}>
          Join our recommendation platform and discover your next favorite!
        </p>
        <div
          style={{
            width: "40px",
            height: "3px",
            background: "linear-gradient(90deg, #7c3aed, #a855f7)",
            borderRadius: "2px",
            marginBottom: "24px",
          }}
        />

        {/* Full Name */}
        <div style={{ marginBottom: "14px" }}>
          <label
            style={{
              color: "#cbd5e1",
              fontSize: "13px",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Full Name
          </label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
              }}
            >
              👤
            </span>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: "14px" }}>
          <label
            style={{
              color: "#cbd5e1",
              fontSize: "13px",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Email
          </label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
              }}
            >
              ✉
            </span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: "14px" }}>
          <label
            style={{
              color: "#cbd5e1",
              fontSize: "13px",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
              }}
            >
              🔒
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ ...inputStyle, paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
                cursor: "pointer",
              }}
            >
              👁
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              color: "#cbd5e1",
              fontSize: "13px",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Confirm Password
          </label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
              }}
            >
              🔒
            </span>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ ...inputStyle, paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
                cursor: "pointer",
              }}
            >
              👁
            </span>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "13px",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontWeight: "700",
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span>👤</span> Register
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "18px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <span style={{ color: "#64748b", fontSize: "13px" }}>or</span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Social Buttons */}
        {[
          { icon: "🔵", label: "Continue with Google" },
          { icon: "⚫", label: "Continue with GitHub" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            style={{
              width: "100%",
              padding: "11px",
              marginBottom: "10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {icon} {label}
          </button>
        ))}

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "14px",
            marginTop: "16px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#a855f7",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
