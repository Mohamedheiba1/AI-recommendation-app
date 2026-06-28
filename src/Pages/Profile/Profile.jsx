import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const currentUser =
      JSON.parse(sessionStorage.getItem("currentUser")) || {};

    setUser(currentUser);
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === user.email ? user : u
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    sessionStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    alert("Profile Updated Successfully");

    setEditMode(false);
  };

  if (!editMode) {
    return (
      <div className="container my-5">
        <div className="card shadow-lg border-0">
          <div className="card-body p-5">

            <div className="text-center">

              <img
                src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=200&name=${user.name}`}
                alt="avatar"
                className="rounded-circle mb-3"
              />

              <h2>{user.name}</h2>

              <p className="text-muted">
                {user.email}
              </p>

            </div>

            <hr />

            <div className="row">
                            <div className="col-md-6 mb-3">
                <h6>Age</h6>
                <p>{user.age || "-"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <h6>Gender</h6>
                <p>{user.gender || "-"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <h6>Favorite Movies</h6>
                <p>{user.movies || "-"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <h6>Favorite Games</h6>
                <p>{user.games || "-"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <h6>Favorite Genres</h6>
                <p>{user.genres || "-"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <h6>Favorite Series</h6>
                <p>{user.series || "-"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <h6>Favorite Music</h6>
                <p>{user.music || "-"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <h6>Hobbies</h6>
                <p>{user.hobbies || "-"}</p>
              </div>

              <div className="col-12 mb-4">
                <h6>About Me</h6>
                <p style={{ color: "black" }}>
                  {user.bio || "-"}
                </p>
              </div>
            </div>

            <div className="d-flex gap-3">

              <button
                className="btn btn-primary flex-fill"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>

              <button
                className="btn btn-success flex-fill"
                onClick={() =>
                  navigate("/recommendation")
                }
              >
                AI Recommendation
              </button>

            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="row">
                    <div className="col-md-6 mb-3">
            <label className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Age
            </label>

            <input
              type="number"
              className="form-control"
              name="age"
              value={user.age}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="mb-3">
          <label className="form-label">
            Gender
          </label>

          <select
            className="form-select"
            name="gender"
            value={user.gender}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Favorite Movies
          </label>

          <input
            type="text"
            className="form-control"
            name="movies"
            value={user.movies}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Favorite Games
          </label>

          <input
            type="text"
            className="form-control"
            name="games"
            value={user.games}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Favorite Genres
          </label>

          <input
            type="text"
            className="form-control"
            name="genres"
            value={user.genres}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Favorite Series
          </label>

          <input
            type="text"
            className="form-control"
            name="series"
            value={user.series}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Favorite Music
          </label>

          <input
            type="text"
            className="form-control"
            name="music"
            value={user.music}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Hobbies
          </label>

          <input
            type="text"
            className="form-control"
            name="hobbies"
            value={user.hobbies}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            About Me
          </label>

          <textarea
            rows="4"
            className="form-control"
            name="bio"
            value={user.bio}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-3">
                  <button
            type="button"
            className="btn btn-secondary flex-fill"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-success flex-fill"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>
  </div>
);
}

export default Profile;