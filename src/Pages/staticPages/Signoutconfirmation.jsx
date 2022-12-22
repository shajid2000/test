import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

// components 

import './thankyou.css';

// images 
import thanks from './../../images/confetti.png';

const Signoutconfirmation = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
        if(!localStorage.getItem('myuser')){
    setTimeout(function(){
      navigate(`/`) 
 
    },3000)
}
    }, [])
    
    return (
        <>
        {/* //  Logout Confirmation================= */}
         <div className="thankYou">
         <img src={thanks} alt="thankyou" />

         <span className="thankHeading">THANK YOU ! You Are Successfully Logged Out</span>

         <span className="thankText">Redirecting to the homepage......</span>

      </div>
        </>
         
    )
};

export default Signoutconfirmation;