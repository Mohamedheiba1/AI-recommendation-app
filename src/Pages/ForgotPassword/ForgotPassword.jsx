import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const checkEmail = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.email === email);

    if (!user) {
      alert("Email not found");
      return;
    }

    setStep(2);
  };

  const updatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
      user.email === email
        ? {
            ...user,
            password: newPassword,
          }
        : user,
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password Updated Successfully");

    navigate("/");
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg,#141E30,#243B55)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "430px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center mb-4">Forgot Password</h2>

        {step === 1 ? (
          <>
            <label className="form-label">Enter your Email</label>

            <input
              type="email"
              className="form-control mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="btn btn-primary w-100" onClick={checkEmail}>
              Continue
            </button>
          </>
        ) : (
          <>
            <label className="form-label">New Password</label>

            <input
              type="password"
              className="form-control mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className="form-label">Confirm Password</label>

            <input
              type="password"
              className="form-control mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="btn btn-success w-100" onClick={updatePassword}>
              Update Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
