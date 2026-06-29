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

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => (u.email === user.email ? user : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    alert("Profile Updated Successfully");
    setEditMode(false);
  };

  /* ───── VIEW MODE ───── */
  if (!editMode) {
    return (
      <div className="profile-page">
        <div className="profile-banner"></div>
        <div className="profile-content-wrapper">
          <div className="profile-header">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">{getInitials(user.name)}</div>
              <div className="avatar-edit-btn">
                <i className="bi bi-pencil-fill"></i>
              </div>
            </div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-email">{user.email}</div>
          </div>

          <div className="profile-card">
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

            <div className="profile-info-about">
              <div className="info-icon-box icon-blue">
                <i className="bi bi-person-lines-fill"></i>
              </div>
              <div>
                <div className="info-label">About Me</div>
                <div className="info-value">{user.bio || "-"}</div>
              </div>
            </div>

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
      {/* نفس البانر والهيدر بس بدون avatar edit btn */}
      <div className="profile-banner"></div>

      <div className="profile-content-wrapper">
        {/* Avatar header */}
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">{getInitials(user.name)}</div>
          </div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-email">{user.email}</div>
        </div>

        {/* Edit card — نفس شكل profile-card */}
        <div className="profile-card edit-card">
          <div className="edit-card-header">
            <i className="bi bi-pencil-square edit-card-icon"></i>
            <h2 className="edit-card-title">Edit Profile</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Row 1: Name + Age */}
            <div className="edit-section">
              <div className="edit-field-group edit-cols-2">
                <div className="edit-field">
                  <div className="edit-field-icon-box icon-blue">
                    <i className="bi bi-person"></i>
                  </div>
                  <div className="edit-field-body">
                    <label className="edit-label">Name</label>
                    <input
                      type="text"
                      className="edit-input"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="edit-field">
                  <div className="edit-field-icon-box icon-purple">
                    <i className="bi bi-123"></i>
                  </div>
                  <div className="edit-field-body">
                    <label className="edit-label">Age</label>
                    <input
                      type="number"
                      className="edit-input"
                      name="age"
                      value={user.age}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Gender + Movies + Games */}
            <div className="edit-section">
              <div className="edit-field-group edit-cols-3">
                <div className="edit-field">
                  <div className="edit-field-icon-box icon-teal">
                    <i className="bi bi-people"></i>
                  </div>
                  <div className="edit-field-body">
                    <label className="edit-label">Gender</label>
                    <select
                      className="edit-input edit-select"
                      name="gender"
                      value={user.gender}
                      onChange={handleChange}
                    >
                      <option value="">Choose...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="edit-field">
                  <div className="edit-field-icon-box icon-pink">
                    <i className="bi bi-film"></i>
                  </div>
                  <div className="edit-field-body">
                    <label className="edit-label">Favorite Movies</label>
                    <input
                      type="text"
                      className="edit-input"
                      name="movies"
                      value={user.movies}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="edit-field">
                  <div className="edit-field-icon-box icon-orange">
                    <i className="bi bi-controller"></i>
                  </div>
                  <div className="edit-field-body">
                    <label className="edit-label">Favorite Games</label>
                    <input
                      type="text"
                      className="edit-input"
                      name="games"
                      value={user.games}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Genres + Series + Music */}
            <div className="edit-section">
              <div className="edit-field-group edit-cols-3">
                <div className="edit-field">
                  <div className="edit-field-icon-box icon-orange">
                    <i className="bi bi-tag"></i>
                  </div>
                  <div className="edit-field-body">
                    <label className="edit-label">Favorite Genres</label>
                    <input
                      type="text"
                      className="edit-input"
                      name="genres"
                      value={user.genres}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="edit-field">
                  <div className="edit-field-icon-box icon-indigo">
                    <i className="bi bi-tv"></i>
                  </div>
                  <div className="edit-field-body">
                    <label className="edit-label">Favorite Series</label>
                    <input
                      type="text"
                      className="edit-input"
                      name="series"
                      value={user.series}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="edit-field">
                  <div className="edit-field-icon-box icon-red">
                    <i className="bi bi-music-note"></i>
                  </div>
                  <div className="edit-field-body">
                    <label className="edit-label">Favorite Music</label>
                    <input
                      type="text"
                      className="edit-input"
                      name="music"
                      value={user.music}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: Hobbies */}
            <div className="edit-section">
              <div className="edit-field-group edit-cols-2">
                <div className="edit-field">
                  <div className="edit-field-icon-box icon-green">
                    <i className="bi bi-heart"></i>
                  </div>
                  <div className="edit-field-body">
                    <label className="edit-label">Hobbies</label>
                    <input
                      type="text"
                      className="edit-input"
                      name="hobbies"
                      value={user.hobbies}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* About Me — full width */}
            <div className="edit-about-section">
              <div className="edit-field-icon-box icon-blue">
                <i className="bi bi-person-lines-fill"></i>
              </div>
              <div className="edit-field-body">
                <label className="edit-label">About Me</label>
                <textarea
                  rows="4"
                  className="edit-input edit-textarea"
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="profile-actions">
              <button
                type="button"
                className="btn-edit-profile btn-cancel-style"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-ai-recommendation">
                <i className="bi bi-check-lg"></i> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
