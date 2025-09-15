// Desgin Formik Yup Api Toast

import imgAuth from "../../images/image-authentication.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Register.module.css";

export default function Register() {
  let navigate = useNavigate();

async function AuthApi(value) {
  try {
    let { data } = await axios.post(
      `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
      value
    );
    console.log(data);

    toast.success("You have been registered", { position: "top-center" });
    navigate("/");
  } 
  
  catch (error) {
    
    if (error.response && error.response.data && error.response.data.msg) {
      // Custom backend error message
      toast.error(error.response.data.msg, { position: "top-center" });
    } 
    
    else if (error.response && error.response.status === 400 && error.response.data.message?.includes("email")) {
      // Fallback for duplicate email
      toast.error("This email already has an account", { position: "top-center" });
    } 
    
    else {
      toast.error("Registration failed. Please try again.", {position: "top-center",});
    }
  }
}


  let validationSchema = Yup.object({
    name: Yup.string().min(4, "Name Should be big that 4").max(20, "Name Should be less than 20").required("Name is Required"),
    email: Yup.string().email("Email Invaild").required("Email is Required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/, "Password should start with Capital, include numbers, length 5 to 8").required("password is Required"),
    age: Yup.number().min(18, "Age should be at least 18").max(80, "Age should at most than 80").required("Age is Required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Phone is Invaild").required("Phone is required "),
  });

  let formikAuth = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => AuthApi(value),
  });

  return (
    <>
      <div className={`container ${styles.registerContainer}`}>
        <h1 className={`text-center mb-5 ${styles.title}`}>Join Our Community</h1>
        <div className="text-center lead mb-5">Stay connected with the latest and most popular movies and TV shows, all in one place</div>

        <div className={styles.registerContent}>
          {/* Left Side (Image) */}
          <div className="col-md-6">
              <img src={imgAuth} className={`w-100 mt-5 mb-5 ${styles.authImg}`} alt="Movies"/>
        </div>

          {/* Right Side (Form) */}
          <div className={styles.rightSide}>
            <h3 className={`text-center text-white py-2 mb-3 ${styles.formTitle}`}>Register</h3>

            <form onSubmit={formikAuth.handleSubmit} className={styles.formBox}>

              <div className="form-group mb-3">
                <label htmlFor="Name" className={`mb-2 h4 ${styles.label}`}>Name</label>
                <input type="text" id="Name" name="name" placeholder="Enter Name"
                  value={formikAuth.values.name}
                  onChange={formikAuth.handleChange}
                  className={`form-control ${styles.input}`}/>
                {formikAuth.errors.name && formikAuth.touched.name ? (<div className="alert alert-danger">{formikAuth.errors.name}</div>) : ("")}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="Email" className={`mb-2 h4 ${styles.label}`}>Email</label>
                <input type="email" id="Email" name="email" laceholder="Enter Email"
                  value={formikAuth.values.email}
                  onChange={formikAuth.handleChange}
                  className={`form-control ${styles.input}`}/>
                {formikAuth.errors.email && formikAuth.touched.email ? (
                  <div className="alert alert-danger">{formikAuth.errors.email}</div>) : ("")}
              </div>

              <div className="form-group">
                <label htmlFor="Password" className={`mb-2 h4 ${styles.label}`}>Password</label>
                <input type="password" id="Password" name="password" placeholder="Enter Password"
                  value={formikAuth.values.password}
                  onChange={formikAuth.handleChange}
                  className={`form-control ${styles.input}`}/>
                  {formikAuth.errors.password && formikAuth.touched.password ? (<div className="alert alert-danger">{formikAuth.errors.password}</div>) : ("")}
              </div>

              <div className="form-group">
                <label htmlFor="Age" className={`mb-2 h4 ${styles.label}`}>Age</label>
                <input
                  type="number" id="Age" name="age" placeholder="Enter Age"
                  value={formikAuth.values.age}
                  onChange={formikAuth.handleChange}
                  className={`form-control ${styles.input}`}/>
                {formikAuth.errors.age && formikAuth.touched.age ? (<div className="alert alert-danger">{formikAuth.errors.age}</div>) : ("")}
              </div>

              <div className="form-group">
                <label htmlFor="Phone" className={`mb-2 h4 ${styles.label}`}>Phone</label>
                <input type="tel" id="Phone" name="phone"
                  value={formikAuth.values.phone}
                  onChange={formikAuth.handleChange}
                  placeholder="Enter Phone"
                  className={`form-control ${styles.input}`}/>
                {formikAuth.errors.phone && formikAuth.touched.phone ? (
                  <div className="alert alert-danger">{formikAuth.errors.phone}</div>) : ("")}
              </div>

              <div className="d-flex justify-content-center mt-3">
                <button type="submit" className={`p-2 px-4 rounded text-white ${styles.submitBtn}`}>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

