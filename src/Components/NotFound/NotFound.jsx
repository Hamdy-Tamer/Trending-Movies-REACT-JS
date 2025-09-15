import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            
            {/* Animated Film Icon */}
            <div className={styles.filmIcon}>
              <div className={styles.filmContent}>404</div>
            </div>

            {/* Main Message */}
            <h1 className={styles.title}>Scene Not Found!</h1>
            <p className={styles.subtitle}>
              The page you are looking for is unavailable now. 
            </p>

            {/* Action Buttons */}
            <div className={styles.buttonGroup}>
              <Link to="/" className={`btn btn-warning btn-lg ${styles.homeButton}`}>
                🎬 Back to Main Screen
              </Link>
              <Link to="/movies" className={`btn btn-outline-light btn-lg ${styles.moviesButton}`}>
                🍿 Explore Movies
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}