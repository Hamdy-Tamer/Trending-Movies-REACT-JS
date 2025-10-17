import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout({logindata, setLoginData}) {
  const location = useLocation();
  
  // Hide footer on login and register pages
  const hideFooter = location.pathname === '/login' || 
                    location.pathname === '/register' || 
                    location.pathname === '/';

  return (
    <>
      <Navbar logindata={logindata} setLoginData={setLoginData}/>
      <Outlet/>
      {/* Show footer only if not on login/register pages AND user is logged in */}
      {!hideFooter && logindata && <Footer/>}
    </>
  );
}
