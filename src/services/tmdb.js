const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function getMovie(title) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      title
    )}`
  );

  const data = await response.json();

  if (!data.results.length) return null;

  return data.results[0];
}
export async function getSeries(title) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(title)}`
  );

  const data = await res.json();

  return data.results[0];
}