import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import img from '../../images/movie-logo.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar({logindata, setLoginData}) {

  let navigate = useNavigate();

  function Logout(){
    localStorage.removeItem("usertoken");
    setLoginData(null);
    navigate("/");
  }

  return (
    <>
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <div className="container-fluid">
                <Link className={`navbar-brand ${styles.navbarBrand}`} to="/home">
                    <img src={img} alt="Logo" className={styles.logo}/>
                    <span className={styles.brandText}>Trending on Screen</span>
                </Link>
                
                <button className={`navbar-toggler ${styles.toggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

           <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {logindata ? (
            <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navMain}`}>
              <li className="nav-item"><Link className={`nav-link ${styles.navLink}`} to="home"><i className="fas fa-home me-2"></i>Home</Link></li>
              <li className="nav-item"><Link className={`nav-link ${styles.navLink}`} to="about"><i className="fas fa-info-circle me-2"></i>About</Link></li>
              <li className="nav-item"><Link className={`nav-link ${styles.navLink}`} to="movies"><i className="fas fa-film me-2"></i>Movies</Link></li>
              <li className="nav-item"><Link className={`nav-link ${styles.navLink}`} to="tv"><i className="fas fa-tv me-2"></i>TV Shows</Link></li></ul>
                  ) : null}

            <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${styles.navAuth}`}>
               {logindata ? (
               <li className="nav-item"><button onClick={Logout} className={styles.logoutButton}><i className="fas fa-sign-out-alt me-2"></i>Logout</button></li>
               ) : (
                <>
                  <li className="nav-item">   <Link className={styles.authButton} to=""><i className="fas fa-sign-in-alt me-2"></i>Login</Link></li>
                  <li className="nav-item"><Link className={styles.authButtonSecondary} to="register"><i className="fas fa-user-plus me-2"></i>Register</Link></li>
              </>
               )}                    
            </ul>

          </div>
         </div>
        </nav>      
    </>
  );
}
