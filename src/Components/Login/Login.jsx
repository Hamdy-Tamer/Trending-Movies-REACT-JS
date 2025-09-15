// Desgin Formik Yup Api Toast

import imgAuth from "../../images/image-authentication.png";
import {useFormik} from "formik";
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from "./Login.module.css";  

export default function Login({saveLoginData}) {

let navigate = useNavigate();

async function AuthApi(values) {
  try {
    let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,values);

    // Success
    toast.success("Login successful!", { position: "top-center" });
    console.log(data);
    localStorage.setItem("usertoken", data.token);
    saveLoginData(); // Issue 1
    navigate("/home");

  } 
  
  catch (error) 
  {
    if (error.response) {
      // Case 1: Backend gives a proper error message
      if (error.response.data.msg) {
        toast.error(error.response.data.msg, { position: "top-center" });
      }
      // Case 2: User not found / hasn't registered
      else if (error.response.status === 404 ||error.response.data.message?.toLowerCase().includes("not found")) {
        toast.error("You haven't been registered", { position: "top-center" });
      }
      // Case 3: Wrong password
      else if (error.response.status === 400 &&error.response.data.message?.toLowerCase().includes("password")) {
        toast.error("Incorrect password", { position: "top-center" });
      }
      // Fallback
      else {
        toast.error("Login failed. Please try again.", { position: "top-center" });
      }
    } 
    
    else {
      toast.error("Network error. Try again later.", { position: "top-center" });
    }
  }
}


let validationSchema = Yup.object({
     email:Yup.string().email("Invaild Email Address").required("Email is Required"),
     password:Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,"Password should start with Capital, include numbers, length 5 to 8").required("Password is Required"),
})

let formikAuth = useFormik({
initialValues:{
    email:"",
    password:"",
},
validationSchema:validationSchema,
onSubmit:(value)=>AuthApi(value)

    })

return <>
  <div className={`container mb-5 ${styles.loginContainer}`}>
    <div className="row">

        <div className="col-md-6">
          <img src={imgAuth} className={`w-100 mt-5 mb-5 ${styles.authImg}`} alt="Movies"/>
        </div>

        
        <div className="col-md-6">
            <h1 className={`text-center py-2 mb-3 mt-5 ${styles.loginTitle}`}>Login</h1>

            <form onSubmit={formikAuth.handleSubmit} className={styles.loginForm}>

                <div className="form-group mb-3">
                    <label htmlFor="Email" className={`mb-2 h4 title ${styles.label}`}>Email</label>
                    <input type="email" id='Email'  
                    value={formikAuth.values.email}
                    onChange={formikAuth.handleChange}
                    name="email" placeholder='Enter Email' className={`form-control borderimg ${styles.input}`}/>
                    {formikAuth.errors.email && formikAuth.touched.email ? <div className={`alert alert-danger ${styles.error}`}>{formikAuth.errors.email}</div>:""}
                </div>

                <div className="form-group">
                    <label htmlFor="Password" className={`mb-2 h4 title ${styles.label}`}>Password</label>
                    <input type="password" id='Password' 
                    value={formikAuth.values.password}
                    onChange={formikAuth.handleChange}
                    name="password" placeholder='Enter Password' className={`form-control borderimg ${styles.input}`}  />
                    {formikAuth.errors.password && formikAuth.touched.password ? <div className={`alert alert-danger ${styles.error}`}>{formikAuth.errors.password}</div>:""}
                </div>

                <div className=" d-flex justify-content-center mt-3">
                    <button type="submit" className={`border border-none p-2 px-4 rounded rounded-2 text-white bg ${styles.btn}`}><i className="bi bi-box-arrow-in-right me-2"></i>Login</button>
                </div>

            </form>
        </div>
    </div>
  </div>
  
</>
}
