import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const InfoItem = ({ iconClass, colorClass, label, value }) => (
  <div className="profile-info-item">
    <div className={`info-icon-box ${colorClass}`}>
      <i className={iconClass}></i>
    </div>
    <div>
      <div className="info-label">{label}</div>
      <div className="info-value">{value || "-"}</div>
    </div>
  </div>
);

function Profile() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    movies: "",
    games: "",
    genres: "",
    series: "",
    music: "",
    hobbies: "",
    bio: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
    setUser(currentUser);
    const firstLogin = sessionStorage.getItem("firstLogin");
    if (firstLogin === "true") {
      setEditMode(true);
      sessionStorage.removeItem("firstLogin");
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(user).some(
      (value) => String(value).trim() === "",
    );

    if (isEmpty) {
      showMessage("Please fill in all fields", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) => (u.email === user.email ? user : u));

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    sessionStorage.setItem("currentUser", JSON.stringify(user));

    showMessage("Profile Updated Successfully", "success");

    setTimeout(() => {
      setEditMode(false);
    }, 1000); // أو 2000 لو حابب
  };

  /* ───── VIEW MODE ───── */
  if (!editMode) {
    return (
      <div className="profile-page">
        {/* Banner — full width */}
        <div style={{ marginTop: -20 }} className="profile-banner"></div>

        {/* Content wrapper */}
        <div className="profile-content-wrapper">
          {/* Avatar + name — overlaps banner */}
          <div className="profile-header">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">{getInitials(user.name)}</div>
              {/* <div className="avatar-edit-btn">
                <i className="bi bi-pencil-fill"></i>
              </div> */}
            </div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-email">{user.email}</div>
          </div>

          {/* Info card */}
          <div className="profile-card">
            {/* Info grid */}
            <div className="profile-info-grid">
              <InfoItem
                iconClass="bi bi-person"
                colorClass="icon-blue"
                label="Age"
                value={user.age}
              />
              <InfoItem
                iconClass="bi bi-people"
                colorClass="icon-purple"
                label="Gender"
                value={user.gender}
              />
              <InfoItem
                iconClass="bi bi-film"
                colorClass="icon-pink"
                label="Favorite Movies"
                value={user.movies}
              />
              <InfoItem
                iconClass="bi bi-controller"
                colorClass="icon-teal"
                label="Favorite Games"
                value={user.games}
              />
              <InfoItem
                iconClass="bi bi-tag"
                colorClass="icon-orange"
                label="Favorite Genres"
                value={user.genres}
              />
              <InfoItem
                iconClass="bi bi-tv"
                colorClass="icon-indigo"
                label="Favorite Series"
                value={user.series}
              />
              <InfoItem
                iconClass="bi bi-music-note"
                colorClass="icon-red"
                label="Favorite Music"
                value={user.music}
              />
              <InfoItem
                iconClass="bi bi-heart"
                colorClass="icon-green"
                label="Hobbies"
                value={user.hobbies}
              />
            </div>

            {/* About Me — full row */}
            <div className="profile-info-about">
              <div className="info-icon-box icon-blue">
                <i className="bi bi-person-lines-fill"></i>
              </div>
              <div>
                <div className="info-label">About Me</div>
                <div className="info-value">{user.bio || "-"}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="profile-actions">
              <button
                className="btn-edit-profile"
                onClick={() => setEditMode(true)}
              >
                <i className="bi bi-pencil"></i> Edit Profile
              </button>
              <button
                className="btn-ai-recommendation"
                onClick={() => navigate("/recommendation")}
              >
                <i className="bi bi-stars"></i> AI Recommendation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───── EDIT MODE ───── */
  return (
    <div className="profile-page">
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <div className="profile-content-wrapper">
        <div className="edit-card">
          <h2 className="text-center">Edit Profile</h2>

          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="edit-grid-2">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={user.age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="edit-grid-3">
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Favorite Movies</label>
                <input
                  type="text"
                  className="form-control"
                  name="movies"
                  value={user.movies}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Favorite Games</label>
                <input
                  type="text"
                  className="form-control"
                  name="games"
                  value={user.games}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Favorite Genres</label>
                <input
                  type="text"
                  className="form-control"
                  name="genres"
                  value={user.genres}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Favorite Series</label>
                <input
                  type="text"
                  className="form-control"
                  name="series"
                  value={user.series}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Favorite Music</label>
                <input
                  type="text"
                  className="form-control"
                  name="music"
                  value={user.music}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hobbies</label>
                <input
                  type="text"
                  className="form-control"
                  name="hobbies"
                  value={user.hobbies}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">About Me</label>
              <textarea
                rows="4"
                className="form-control"
                name="bio"
                value={user.bio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
