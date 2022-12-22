import React from "react";
import errorPic from "../../images/error.png";
import { Link, useNavigate } from "react-router-dom";
import "./error.css";
const Error = () => {
  const navigate = useNavigate();
  const backToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="error-container">
        <img src={errorPic} alt="Error" id="error-img" />
        <p className="error-heading">Ooops...</p>
        <p className="error">Page Not Found</p>
        <button onClick={backToPreviousPage}>Go Back</button>
      </div>
    </>
  );
};

export default Error;
