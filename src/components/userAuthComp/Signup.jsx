import React, { useEffect } from "react";
import { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../backend";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { signUpSchema } from "../../FormValidSchema/SignupSchema";
import { Link } from "react-router-dom";
import { CommonPopup } from "../commonComponents/popUp/PopUp";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
// images
import registeredPopupImg from "../../images/popups/userRegisteredPopup.svg";
import logo from "./../../images/EhsLogo2.png";
import { getUser, userInfo } from "../../redux/actions/userAction";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const topView = () => {
    window.scrollTo({ top: 0 });
  };
  topView();

  const [popup, setPopup] = useState(false);
  let newUser;
  const dispatch = useDispatch();
  let data = useSelector((state) => state.user);
  const signUp = async (userObject, google) => {
    // console.log(newUser)
    const response = await fetch(`${API}auth/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (data) setres(data);

    if (data.success === 1) {
      if (google) {
        let newUser1 = {
          email: userObject.email,
          password: userObject.sub,
        };

        dispatch(userInfo(newUser1));
        return;
      }
      setPopup(true);
    } else if (data.success === 0) {
      toast.error(data.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      });
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        newUser = {
          userName: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          google: false,
        };

        signUp("", false);
      },
    });
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [res, setres] = useState("");
  const navigate = useNavigate();
  const [valid, setValid] = useState(true);

  const [user, setUser] = useState({});
  useEffect(() => {
    if (data) {
      if (data.loginResponse === 1) {
        //console.log("yes loogees in successfully");
        localStorage.setItem(
          "myuser",
          JSON.stringify({
            token: data.userDetail.session_token,
            id: data.userDetail._id,
            email: email,
          })
        );
        dispatch(getUser());

        setPopup(true);
        // navigate(`/`);
      } else if (data.loginResponse === 0) {
        toast.error(data.responseMessage, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
        });
      }
    }
  }, [data]);

  const handleCallbackResponsez = async (response) => {
    // console.log("token ", response.credential);
    let userObject = jwt_decode(response.credential);
    const res = await fetch(`${API}auth/loginwithgoogle`, {
      method: "POST",
      body: JSON.stringify(userObject),
      headers: { "Content-Type": "application/json" },
    });
    const dataa = await res.json();
    console.log(dataa);
    if (dataa.success === 1 && dataa.message === 1) {
      let newUser = {
        email: userObject.email,
        password: userObject.sub,
      };

      dispatch(userInfo(newUser));
    } else if (dataa.success === 1 && dataa.message === 2) {
      try {
        newUser = {
          userName: userObject.name,
          email: userObject.email,
          password: userObject.sub,
          // phone: userObject.phone,
          google: true,
        };

        signUp(userObject, true);
        setPopup(true);
      } catch (error) {
        console.log(error);
      }
    }

    console.log(userObject, "ai");
    setUser(userObject);
    // document.getElementById("signInDiv").hidden = true;
  };

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "685827706441-6gsel3e5uq4edb9qk9ui9nthf7bevjac.apps.googleusercontent.com",
      callback: handleCallbackResponsez,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      width: 300,
      height: 60,
      longtitle: true,
      textAlign: "center",
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div className="signupContainer">
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className="formContainer">
          <div className="logoContainer">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="heading">Sign up on EHS Prints</div>
          </div>
          <div className="signInwithGoogle" id="signInDiv"></div>
          <div className="divider">
            <div className="divider-line"></div>
            <p>OR</p>
            <div className="divider-line"></div>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="name"
              autoComplete="off"
              name="name"
              id="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <p className="form-error">{errors.name}</p>
            ) : null}
            <input
              name="phone"
              type="text"
              autoComplete="off"
              id="phone"
              placeholder="Phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />{" "}
            {errors.phone && touched.phone ? (
              <p className="form-error">{errors.phone}</p>
            ) : null}
            <input
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />{" "}
            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}
            <input
              type="password"
              autoComplete="off"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}
            <div className="user-present">
              <Link to={"/signin"}>
                <span>Already Registered ?</span>
              </Link>
            </div>
            <input type="submit" value="Sign Up" className="submitBtn" />
            {/* <div id="errorBox">{error}</div> */}
          </form>
        </div>
      </div>
      <CommonPopup
        heading="We Welcome You!!!"
        desc="Thank you for registering with us"
        image={registeredPopupImg}
        setMyPopup={setPopup}
        popup={popup}
        secondBtn={false}
      />
    </>
  );
};

export default SignUp;
