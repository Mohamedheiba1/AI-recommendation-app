import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

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

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 10000); // تختفي بعد 10 ثواني
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showMessage("Passwords do not match", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === formData.email)) {
      showMessage("Email already exists", "error");
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

    showMessage("Account Created Successfully", "success");

    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  return (
    <>
    {message && (
  <div className={`message ${messageType}`}>
    {message}
  </div>
)}
      <div className="reg-page">
        <div className="reg-card">
          <div className="reg-logo">
            <div style={{ paddingTop: 15 }}>
              <div className="rec-bot-icon">
                <i className="bi bi-robot"></i>
              </div>
            </div>
            <span className="reg-logo-text">
              GIRA <span>AI</span>
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
              {showPassword ? "👁" : "👁"}
            </span>
          </div>

          <label className="reg-label">Confirm Password</label>
          <div className="reg-input-wrap" style={{ marginBottom: "26px" }}>
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
              {showConfirm ? "👁" : "👁"}
            </span>
          </div>

          <button className="reg-btn" onClick={handleSubmit}>
            Register
          </button>

          <p className="reg-footer">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
