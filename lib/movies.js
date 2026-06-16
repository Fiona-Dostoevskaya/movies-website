import moviesData from '../movies.json';

export function getAllMovies() {
  return moviesData.movies;
}

export function getMovieById(id) {
  const idx = parseInt(id, 10);
  return moviesData.movies[idx] || null;
}

export function searchMovies(keyword) {
  const kw = keyword.toLowerCase();
  return moviesData.movies.filter((m) => {
    return (
      m.title.toLowerCase().includes(kw) ||
      m.director.name.toLowerCase().includes(kw) ||
      m.genre.some((g) => g.toLowerCase().includes(kw))
    );
  });
}
