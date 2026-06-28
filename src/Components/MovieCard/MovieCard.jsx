function MovieCard({ movie, reason }) {
  return (
    <div className="card mt-4 shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="card-img-top"
        style={{ height: 500 }}
        alt={movie.title || movie.name}
      />

      <div className="card-body">
        <h2>{movie.title || movie.name}</h2>

        <h5 className="text-warning">{movie.vote_average.toFixed(1)}</h5>

        <h6>{movie.release_date || movie.first_air_date}</h6>

        <p className="mt-3">{movie.overview}</p>

        <hr />

        <h5>Why AI chose this?</h5>

        <p>{reason}</p>
      </div>
    </div>
  );
}

export default MovieCard;
