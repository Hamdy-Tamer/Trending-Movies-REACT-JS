import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({logindata, setLoginData}) {
  return <>
  <Navbar logindata = {logindata} setLoginData = {setLoginData}/>
  <Outlet></Outlet>
  <Footer/>
  
  </>
}    