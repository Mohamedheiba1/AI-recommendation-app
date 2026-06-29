import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (user) => user.email === formData.email
    );

    if (userExists) {
      alert("Email already exists");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,

      // بيانات البروفايل
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

    const newUser2 = {
  name: formData.name,
  email: formData.email,
  password: formData.password,
};

users.push(newUser2);

localStorage.setItem("users", JSON.stringify(users));

// تسجيل دخول تلقائي
sessionStorage.setItem(
  "currentUser",
  JSON.stringify(newUser2)
);

// أول مرة
sessionStorage.setItem("firstLogin", "true");

alert("Account Created Successfully");

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
          width: "450px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center fw-bold mb-2">
          Create Account
        </h2>

        <p className="text-center text-secondary mb-4">
          Join our recommendation platform
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

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
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?
          <Link
            to="/"
            className="ms-2 text-decoration-none"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;