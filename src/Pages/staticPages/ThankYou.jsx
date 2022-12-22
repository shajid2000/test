import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

import './thankyou.css';

// images 
import thanks from './../../images/confetti.png';

const ThankYou = () => {
    const navigate = useNavigate();
    const [u, setU] = useState(undefined)
    const [searchParams, setSearchParams] = useSearchParams();
 
// const [res, setQuery] = useState(searchParams.get('res'));

// //console.log(query)
//     useEffect(() => {
//         if(searchParams.get('res')){
//     setTimeout(function(){
//       navigate(`/`) 
//     setU() 
//     },3000)
// }
//     }, [])


    
    return (
        <>
         { searchParams.get('res') ? 
        //  Login Confirmation=================
         <div className="thankYou">
         <img src={thanks} alt="thankyou" />

         <span className="thankHeading">THANK YOU ! You Are Successfully Logged In</span>

         <span className="thankText">Redirecting to the homepage......</span>

      </div>
// Order Successfull==================
         : <div className="thankYou">
            <img src={thanks} alt="thankyou" />

            <span className="thankHeading">THANK YOU ! Your Order Confirmed</span>

            <span className="thankText">Yay! your order is confirmed, you will receive a order confirmation through Email / SMS</span>

            <div className="btn-container"><button onClick={()=>{navigate("/")}} className="continueShopping-btn">continue shopping</button> <button onClick={()=>{navigate("/userdashboard/2")}} className="goToOrders-btn">go to orders</button></div>
         </div>
}



        </>
         
    )
};

export default ThankYou;