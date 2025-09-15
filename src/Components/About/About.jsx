import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './About.module.css';
import teamImage1 from '../../images/team1.jpg';
import teamImage2 from '../../images/team2.jpg';
import apiImage from '../../images/api.jpg';

export default function About() {
  const [stats, setStats] = useState({ movies: 0, tv: 0 });
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      // Fetch some basic stats to make the page more dynamic
      const [moviesResponse, tvResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=d2f2ad89d2a20285f60146ed358c2628`),
        axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=d2f2ad89d2a20285f60146ed358c2628`)
      ]);

      setStats({
        movies: moviesResponse.data.total_results,
        tv: tvResponse.data.total_results
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className={`container-fluid py-5 ${styles.heroSection}`}>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className={`display-4 fw-bold mb-3 ${styles.heroTitle}`}>About Trending on Screen</h1>
              <p className={`lead ${styles.heroSubtitle}`}>
                Your ultimate destination for discovering the most popular movies and TV shows
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={teamImage2} alt="Our Vision" className={`img-fluid rounded shadow ${styles.aboutImage}`}/>
          </div>
          <div className="col-md-6">
            <h2 className={`fw-bold mb-4 ${styles.sideTitle}`}>Our Mission</h2>
            <p className="text-muted mb-3">
              At Trending on Screen, we're passionate about helping you discover your next favorite film or TV series. 
              We curate the most popular and talked-about content from around the world.
            </p>
            <p className="text-muted">
              Our mission is to make entertainment discovery simple, fun, and reliable. We believe everyone deserves 
              to find content they'll love without endless searching.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-5 bg-light">
        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            <img src={apiImage} alt="TMDB API" className={`img-fluid rounded shadow ${styles.aboutImage}`}/>
          </div>
          <div className="col-md-6 order-md-1">
            <h2 className={`fw-bold mb-4 ${styles.sideTitle}`}>How It Works</h2>
            <p className="text-muted mb-3">
              We use The Movie Database (TMDB) API to bring you real-time trending data. Our algorithms track:
            </p>
            <ul className="text-muted">
              <li>Daily viewing patterns</li>
              <li>Social media buzz</li>
              <li>Critical acclaim</li>
              <li>User ratings and reviews</li>
            </ul>
            <p className="text-muted">
              This ensures you're always seeing what's truly trending right now.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className={styles.statCard}>
              <h3 className={`fw-bold ${styles.statNumber}`}>
                {loading ? '...' : stats.movies.toLocaleString()}+
              </h3>
              <p className="text-muted">Movies Tracked</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className={styles.statCard}>
              <h3 className={`fw-bold ${styles.statNumber}`}>
                {loading ? '...' : stats.tv.toLocaleString()}+
              </h3>
              <p className="text-muted">TV Shows</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className={styles.statCard}>
              <h3 className={`fw-bold ${styles.statNumber}`}>24/7</h3>
              <p className="text-muted">Real-time Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container py-5 bg-light">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={teamImage1} alt="Our Team" className={`img-fluid rounded shadow ${styles.aboutImage}`}/>
          </div>
          <div className="col-md-6">
            <h2 className={`fw-bold mb-4 ${styles.sideTitle}`}>Our Commitment</h2>
            <p className="text-muted mb-3">
              We're a team of movie enthusiasts and tech experts dedicated to creating the best entertainment 
              discovery platform. We're constantly improving our service to bring you:
            </p>
            <ul className="text-muted">
              <li>Accurate trending data</li>
              <li>User-friendly interface</li>
              <li>Fast loading times</li>
              <li>Mobile-responsive design</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold mb-3">Ready to Explore?</h2>
            <p className="text-muted mb-4">Join thousands of users who discover their next favorite movie or TV show every day.</p>
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <Link to="/movies" className="btn btn-warning btn-lg px-md-4 py-md-2 px-3 py-2">Explore Movies</Link>
              <Link to="/tv" className="btn btn-primary btn-lg px-md-4 py-md-2 px-3 py-2">Explore TV Shows</Link>
              <Link to="/home" className="btn btn-outline-secondary btn-lg px-md-4 py-md-2 px-3 py-2">Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}