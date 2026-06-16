'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllMovies, searchMovies } from '@/lib/movies';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const allMovies = useMemo(() => getAllMovies(), []);

  const results = useMemo(() => {
    if (!query.trim()) return allMovies;
    return searchMovies(query.trim());
  }, [query, allMovies]);

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1 className="site-title">
            <span>C</span>lassic <span>F</span>ilms
          </h1>
          <div className="search-form">
            <input
              className="search-input"
              type="text"
              placeholder="搜索片名、导演或类型……"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')}>
                清除
              </button>
            )}
          </div>
        </div>
      </header>

      <main>
        <p className="movie-count">
          {query.trim()
            ? `找到 ${results.length} 部电影`
            : `共 ${allMovies.length} 部经典电影`}
        </p>

        {results.length === 0 ? (
          <div className="empty-state">
            <p>未找到与「{query.trim()}」相关的电影</p>
          </div>
        ) : (
          <div className="movie-grid">
            {results.map((movie) => {
              const idx = allMovies.indexOf(movie);
              return (
              <Link
                key={movie.title}
                href={`/movies/${idx}`}
              >
                <div className="movie-card">
                  <div className="movie-card-header">
                    <span className="movie-title">{movie.title}</span>
                    <span className="movie-rating">{movie.rating}</span>
                  </div>
                  <div className="movie-meta">
                    <span>{movie.year}</span>
                    <span>{movie.duration} 分钟</span>
                    <span>{movie.region?.join(' / ')}</span>
                  </div>
                  <div className="movie-genres">
                    {movie.genre.map((g) => (
                      <span key={g} className="genre-tag">{g}</span>
                    ))}
                  </div>
                  <div className="movie-director">{movie.director.name}</div>
                </div>
              </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
