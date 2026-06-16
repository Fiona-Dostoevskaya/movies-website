import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllMovies, getMovieById } from '@/lib/movies';

export async function generateStaticParams() {
  const movies = getAllMovies();
  return movies.map((_, i) => ({ id: String(i) }));
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="container">
      <div className="detail-page">
        <Link href="/" className="back-link">← 返回列表</Link>

        <div className="detail-header">
          <h1 className="detail-title">{movie.title}</h1>

          <div className="detail-meta">
            <span className="detail-rating">{movie.rating}</span>
            <span className="detail-info">{movie.year}</span>
            <span className="detail-info">{movie.duration} 分钟</span>
            <span className="detail-info">
              {Array.isArray(movie.region) ? movie.region.join(' / ') : movie.region}
            </span>
          </div>

          <div className="detail-genres">
            {movie.genre.map((g) => (
              <span key={g} className="detail-genre-tag">{g}</span>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h2>导演</h2>
          <p className="detail-director">
            {movie.director.name}
            <span className="detail-info" style={{ marginLeft: 8 }}>
              ({movie.director.region})
            </span>
          </p>
        </div>

        <div className="detail-section">
          <h2>剧情简介</h2>
          <p className="detail-summary">{movie.summary}</p>
        </div>
      </div>
    </div>
  );
}
