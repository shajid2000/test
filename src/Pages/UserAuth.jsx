import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// components

import SignUp from "../components/userAuthComp/Signup";

const UserAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <SignUp />
    </>
  );
};

export default UserAuth;
