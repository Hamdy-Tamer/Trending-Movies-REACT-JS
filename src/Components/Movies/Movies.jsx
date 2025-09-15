import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './Movies.module.css';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchGenres() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=d2f2ad89d2a20285f60146ed358c2628`
      );
      const genreMap = {};
      data.genres.forEach(genre => {
        genreMap[genre.id] = genre.name;
      });
      setGenres(genreMap);
    } catch (err) {
      console.error("Failed to fetch genres:", err);
    }
  }

  async function fetchTrendingMovies() {
    try {
      setLoading(true);
      setError(null);
      await fetchGenres();
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=d2f2ad89d2a20285f60146ed358c2628`
      );
      setMovies(data.results);
      console.log(data.results);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError("Failed to load trending movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className={styles.loadingSpinner}></div>
        <p className="mt-3 text-muted">Loading trending movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className={styles.errorIcon}>❌</div>
        <p className="text-danger mt-3">{error}</p>
        <button className="btn btn-primary mt-3" onClick={fetchTrendingMovies}>Try Again</button>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className={styles.heroSubtitle}>
                <h1 className={`display-4 fw-bold mb-3 ${styles.heroTitle}`}>Trending Movies</h1>
                <p className={`lead mb-4 ${styles.heroSubtitle}`}>
                  Discover today's most popular movies. Stay updated with the latest trending films 
                  and find your next favorite watch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid Section */}
      <section className="container py-5">
        <div className="row">
          {movies.map((movie) => (
            <div className="col-xl-3 col-lg-4 col-md-6 mb-4" key={movie.id}>
              <div className={`card h-100 shadow-sm ${styles.movieCard}`}>
                {/* Movie Poster with Fallback */}
                {movie.poster_path ? (<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className={`card-img-top ${styles.moviePoster}`} alt={movie.title}/>) : (
                  <div className={styles.posterPlaceholder}>
                    <span>No Image</span>
                  </div>
                )}
                
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{movie.title}</h5>
                  
                  {/* Movie Details with FontAwesome Icons */}
                  <div className="mt-2 mb-3">
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {/* Year */}
                      <span className="badge bg-primary">
                        <i className="fas fa-calendar-alt me-1"></i>
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                      </span>
                      
                      {/* Rating */}
                      <span className="badge bg-success">
                        <i className="fas fa-star me-1"></i>
                        {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                      </span>
                      
                      {/* Vote Count */}
                      <span className="badge bg-info text-dark">
                        <i className="fas fa-users me-1"></i>
                        {movie.vote_count ? movie.vote_count : 'N/A'}
                      </span>
                      
                      {/* Popularity */}
                      <span className="badge bg-warning text-dark">
                        <i className="fas fa-fire me-1"></i>
                        {movie.popularity ? movie.popularity.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Movie Genres/Categories */}
                  {movie.genre_ids && movie.genre_ids.length > 0 && (
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-1">
                        <i className="fas fa-tags text-secondary me-2"></i>
                        <span className="text-muted">Genres:</span>
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {movie.genre_ids.map(genreId => (
                          <span key={genreId} className="badge bg-secondary mb-1">
                            {genres[genreId] || 'Unknown'}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="card-text flex-grow-1">
                    {movie.overview ? (
                      movie.overview.length > 120 
                        ? `${movie.overview.substring(0, 120)}...` 
                        : movie.overview
                    ) : (
                      <span className="text-muted">No description available</span>
                    )}
                  </p>
                  
                  {/* Action Button */}
                  <div className="mt-auto">
                    <button 
                      className="btn btn-outline-primary w-100" 
                      onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank')}>
                      <i className="fas fa-external-link-alt me-2"></i>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}