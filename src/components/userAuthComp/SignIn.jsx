import React, { useState, useEffect } from "react";
import "./signin.css";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { API } from "../../backend";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/cartAction";
import { CommonPopup } from "../commonComponents/popUp/PopUp";
import jwt_decode from "jwt-decode";
import loginPopupImg from "../../images/popups/loginPopup.svg";
// components
import { userInfo, getUser } from "../../redux/actions/userAction";
// images
import { Link } from "react-router-dom";
import logo from "./../../images/EhsLogo2.png";

const SignIn = () => {
  const topView = () => {
    window.scrollTo({ top: 0 });
  };
  topView();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let newUser;

  const [popup, setPopup] = useState(false);
  let data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   dispatch(getUser());
  // })
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      navigate("/");
    }
  }, []);
  const Login = async (e) => {
    e.preventDefault();
    let newUser = {
      email: email,
      password: password,
    };
    try {
      dispatch(userInfo(newUser));
    } catch (err) {
      //console.log(err);
    }
  };

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
        // navigate(`/thankyou?res=${data.loginResponse}`);
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
      setPopup(true);
    } else if (dataa.success === 1 && dataa.message === 2) {
      try {
        newUser = {
          userName: userObject.name,
          email: userObject.email,
          password: userObject.sub,
          // phone: userObject.phone,
          google: true,
        };

        // signUp(userObject,true);
      } catch (error) {
        console.log(error);
      }
    }

    console.log(userObject, "ai");
    // setUser(userObject);
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
      scope: "profile email",
      width: 300,
      height: 50,
      longtitle: true,
      theme: "dark",
      // 'onsuccess': onSuccess,
      // 'onfailure': onFailure
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div className="signinContainer">
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
        <div className="formContainer signInform-box">
          <div className="logoContainer">
            <div className="logo">
              <img src={logo} alt="Ehs-logo" />
            </div>
            <div className="heading">Sign In on EHS Prints</div>
          </div>
          <div className="signInwithGoogle" id="signInDiv"></div>
          <div className="divider">
            <div className="divider-line"></div>
            <p>OR</p>
            <div className="divider-line"></div>
          </div>
          <form className="form" onSubmit={Login}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="user-present">
              <Link to={"/signup"}>
                <span>New User?</span>
              </Link>
            </div>
            <input type="submit" value="Sign In" className="submitBtn" />
            <div id="errorBox"></div>
          </form>
        </div>
      </div>
      <CommonPopup
        heading="Great!"
        image={loginPopupImg}
        desc="You have successfully logged In."
        secondBtn={true}
        // setMyPopup={setPopup}
        popup={popup}
      />
    </>
  );
};

export default SignIn;
