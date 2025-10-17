import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Movies from "./Components/Movies/Movies";
import TV from "./Components/TV/TV";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

export default function App() {
  let [logindata, setLoginData] = useState(null);

  function saveLoginData() {
    let encodedToken = localStorage.getItem("usertoken");
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setLoginData(decodedToken);
  } 

  useEffect(() => {
    if (localStorage.getItem("usertoken") !== null) {
      saveLoginData();
    }
  }, []);

  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout logindata={logindata} setLoginData={setLoginData} />,
      children: [
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "movies", element: <Movies /> },
        { path: "tv", element: <TV /> },
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={routers}></RouterProvider>
      <ScrollToTop />
    </>
  );
}
