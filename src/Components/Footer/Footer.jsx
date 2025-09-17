import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          {/* Main Footer Content */}
          <div className="row">
            
            {/* Brand Column */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className={styles.brandSection}>
                <h5 className={styles.brandTitle}>
                  <i className="fa-solid fa-film me-2"></i>
                  Trending on Screen
                </h5>
                <p className={styles.brandDescription}>
                  Your premier destination for discovering the most popular movies and TV shows. 
                  Stay updated with trending content and find your next favorite entertainment.
                </p>
                <div className={styles.socialMedia}>
                  <a href="#" className={styles.socialLink} title="Facebook Page">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className={styles.socialLink} title="Twitter Page">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className={styles.socialLink} title="Instagram Page">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className={styles.socialLink} title="LinkedIn Page">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className={styles.socialLink} title="YouTube Channel">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className={styles.columnTitle}>Navigation</h6>
              <ul className={styles.footerList}>
                <li><Link to="home" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>Home</Link></li>
                <li><Link to="about" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>About</Link></li>
                <li><Link to="movies" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>Movies</Link></li>
                <li><Link to="tv" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>TV Shows</Link></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h6 className={styles.columnTitle}>Resources</h6>
              <ul className={styles.footerList}>
                <li><a href="#" className={styles.footerLink}>Help Center</a></li>
                <li><a href="#" className={styles.footerLink}>Privacy Policy</a></li>
                <li><a href="#" className={styles.footerLink}>Terms of Service</a></li>
                <li><a href="#" className={styles.footerLink}>Cookie Policy</a></li>
                <li><a href="#" className={styles.footerLink}>Accessibility</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h6 className={styles.columnTitle}>Contact & Support</h6>
              <ul className={styles.footerList}>
                <li className={styles.contactItem}><i className="fas fa-envelope me-2"></i><span className={styles.footerLink}>support@trendingscreen.com</span></li>
                <li className={styles.contactItem}><i className="fas fa-phone me-2"></i><span className={styles.footerLink}>+1 (234) 567-890</span></li>
                <li className={styles.contactItem}><i className="fas fa-map-marker-alt me-2"></i><span>New York, NY 10001</span></li>
                <li className={styles.contactItem}><i className="fas fa-clock me-2"></i><span>Mon-Fri: 9AM-6PM EST</span></li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <hr className={styles.divider} />

          {/* Bottom Section */}
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className={styles.copyright}>
                <p className="mb-0">
                  &copy; {currentYear} Trending on Screen. All rights reserved.
                  <span className={styles.tmdbCredit}>
                    Powered by <strong>TMDB API</strong>
                  </span>
                </p>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className={styles.legalLinks}>
                <a href="#" className={styles.legalLink}>Privacy Policy</a>
                <span className={styles.separator}>•</span>
                <a href="#" className={styles.legalLink}>Terms of Service</a>
                <span className={styles.separator}>•</span>
                <a href="#" className={styles.legalLink}>Cookie Policy</a>
                <span className={styles.separator}>•</span>
                <a href="#" className={styles.legalLink}>GDPR</a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
