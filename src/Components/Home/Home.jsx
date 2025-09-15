import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTrendingContent() {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch both movies and TV shows
      const [moviesResponse, tvResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=d2f2ad89d2a20285f60146ed358c2628`),
        axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=d2f2ad89d2a20285f60146ed358c2628`)
      ]);

      setTrendingMovies(moviesResponse.data.results.slice(0, 4));
      setTrendingTV(tvResponse.data.results.slice(0, 4));
      
    } catch (err) {
      console.error("Failed to fetch content:", err);
      setError("Failed to load content. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTrendingContent();
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className={styles.loadingSpinner}></div>
        <p className="mt-3 text-muted">Loading trending content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className={styles.errorIcon}>❌</div>
        <p className="text-danger mt-3">{error}</p>
        <button 
          className="btn btn-primary mt-3"
          onClick={fetchTrendingContent}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className={`container-fluid py-5 ${styles.heroSection}`}>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className={`display-4 fw-bold mb-3 ${styles.heroTitle}`}>Welcome to Trending on Screen</h1>
              <p className={`lead mb-4 ${styles.heroSubtitle}`}>
                Discover today's most popular movies and TV shows. 
                Find your next favorite watch from the latest trending content.
              </p>
              <div className="d-flex flex-column gap-3 justify-content-center">
                <Link to="/movies" className="btn btn-warning btn-lg">Explore Movies</Link>
                <Link to="/tv" className="btn btn-primary btn-lg">Explore All TV Shows</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Movies Section */}
      <section className="container py-5">
        <div className="row align-items-center mb-4">
          <div className="col">
            <h2 className={`fw-bold ${styles.sideTitle}`}>Trending Movies</h2>
            <p className="text-muted">Today's most popular movies</p>
          </div>
          <div className="col-auto">
            <Link to="/movies" className="btn btn-outline-primary">View All Movies</Link>
          </div>
        </div>
        
        <div className="row">
          {trendingMovies.map((movie) => (
            <div className="col-xl-3 col-lg-4 col-md-6 mb-4" key={movie.id}>
              <div className={`card h-100 shadow-sm ${styles.contentCard}`}>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/placeholder-movie.jpg'} className={styles.posterImage} alt={movie.title}/>
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </span>
                    <span className="badge bg-success">
                      ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                    <button className="btn btn-warning w-100 mt-3" onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank')}>
                      <i className="fas fa-external-link-alt me-2"></i>
                      View Details
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

{/*============================================================================================================================================================================================*/}

      {/* Trending TV Shows Section */}
      <section className="container py-5">
        <div className="row align-items-center mb-4">
          <div className="col">
             <h2 className={`fw-bold ${styles.sideTitle}`}>Trending TV Shows</h2>
            <p className="text-muted">Today's most popular TV series</p>
          </div>
          <div className="col-auto">
            <Link to="/tv" className="btn btn-outline-primary">View All TV Shows</Link>
          </div>
        </div>
        
        <div className="row">
          {trendingTV.map((show) => (
            <div className="col-xl-3 col-lg-4 col-md-6 mb-4" key={show.id}>
              <div className={`card h-100 shadow-sm ${styles.contentCard}`}>
                <img src={show.poster_path ? `https://image.tmdb.org/t/p/w500/${show.poster_path}` : '/placeholder-tv.jpg'} className={styles.posterImage} alt={show.name}/>
                <div className="card-body">
                  <h5 className="card-title">{show.name}</h5>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary">
                      {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
                    </span>
                    <span className="badge bg-success">
                      ⭐ {show.vote_average ? show.vote_average.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                  <button className="btn btn-warning w-100 mt-3" onClick={() => window.open(`https://www.themoviedb.org/tv/${show.id}`, '_blank')}>
                    <i className="fas fa-external-link-alt me-2"></i>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold mb-3">Ready to Explore More?</h2>
            <p className="text-muted mb-4">
              Discover thousands of movies and TV shows. Find your next binge-worthy content today!
            </p>
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <Link to="/movies" className="btn btn-warning btn-lg">Browse All Movies</Link>
              <Link to="/tv" className="btn btn-primary btn-lg">Browse All TV Shows</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}