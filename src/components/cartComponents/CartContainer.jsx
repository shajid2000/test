import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./cartcontainer.css";
// component
import CartItem from "./CartItem";
// images
import razorPayLogo from "./../../images/razorparLogo.png";
import axios from 'axios';
import { API } from '../../backend';
import { redirect } from "react-router-dom";
import { FullscreenTwoTone } from "@mui/icons-material";
import { getUser } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import { getQuote } from "../../redux/actions/cartAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const CartContainer = () => {

  const [displayCoupon, setDisplayCoupon] = useState(false);
  const state = useSelector((state) => state.cart);
  const dispatch =useDispatch();
  const user =useSelector(state=>state.user.userDetail);
  const navigate = useNavigate();
  // //console.log(state,"state");

  // //console.log(user,"user");

  let totaldis= false
  let withQtydis=0;
  let finalAmount= 0;

  useEffect(()=>{
    dispatch(getUser());
    
  },[])
  let cartTotal = 0;
  let cartdata=[];
  if(state.cart.length!==0){
  cartdata = state.cart;
  // console.log(cartdata);
 
  cartdata.forEach((elem) => {
    cartTotal += Number(elem.total);
    if(elem.quantity >= 5){
      withQtydis = withQtydis + (Number(elem.total)- (Number(elem.total)/100)*10)  
    }
    else{
      withQtydis= Math.floor(withQtydis + Number(elem.total))
      finalAmount = withQtydis
      finalAmount = Math.ceil(withQtydis)
    }

  });
  if(withQtydis >= 500){
    totaldis = true
finalAmount = Math.ceil(withQtydis - (withQtydis/100)*10)

  } 
  }

  async function getQuoteHandler(){
   const myuser = JSON.parse(localStorage.getItem('myuser'))
   let token =myuser.token;
  //  //console.log(token , myuser);
   $.ajax({
    type: "GET",
    url: `${API}quotes/get_quotation`,
    xhrFields: {
     // specify response type as "blob" to handle objects
     
     responseType: "blob",
    },
    headers:{
      "x-access-token": `${token}`,
    },
    success: function (data) {
    //console.log("here")
     // creating a hidden <a> tag
     var a = document.createElement("a");
  
     // creating a reference to the file
     var url = window.URL.createObjectURL(data);
  
     // setting anchor tag's href attribute to the blob's URL
     a.href = url;
  
     // setting anchor tag's download attribute to the filename
     a.download = "Invoice.pdf";
     document.body.append(a);
  
     a.click();
  
  
     a.remove();
     
     window.URL.revokeObjectURL(url);
    },
    error: function (result) {
     //console.log(result)
    },
   });
//   axios({
//     method: 'GET',
//     url: `${API}quotes/get_quotation`,
//     xhrFields: {
//       responseType:  'array buffer' ,
//      },
    
//     headers : {
//       "x-access-token": `${myuser.token}`,
//       'Accept': 'application/pdf'
//     }
//   })
//   .then( response =>{
//     ////console.log(response.data);
//     var binaryData = [];
//  binaryData.push(response.data);
//  const blobObj = new Blob(binaryData, {type: "application/pdf"});

//  var url = window.URL.createObjectURL(response); 
  
//     window.open(url);
//   })
//   .catch(err=>{
//     //console.log(err);
//   })
}

const OrderNow = ()=>{
    if(state.cart <=0){
    toast.warn("Your cart is empty!", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    });
    return
  }
navigate("/pay")

}

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
  async function placeOrderHandler(){
    
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  //prepare cart 
  const cart = state.cart.map((ele)=>{
      return {
        "poster_obj_id":ele.poster_details._id,
        "material_obj_id":ele.materialDimension._id,
        "quantity": ele.quantity
      }
  })
  const token =JSON.parse(localStorage.getItem('myuser')).token
  //console.log(token);
  // creating a new order
  // const result = await axios.post(`${API}orders/create_order`,{
    
  //     "cart_item":[...cart],

  //     "delivery_address":user.address[0],

  //     "user_type":1
      
  
  // }
  //   ,
  //   {
  //    headers:{ "x-access-token":token,
  //   }
  //   });

  // if (!result) {
  //     alert("Server error. Are you online?");
  //     return;
  // }

  let result = await fetch(`${API}orders/create_order`, {
    method: "POST",
    body: JSON.stringify({
    
          "cart_item":[...cart],
    
          "delivery_address":user.address[0] || {},
    
          "user_type":1
          
      
      }),
    headers: { "Content-Type": "application/json",
    "x-access-token":token },
  });
  result = await result.json();
    if (!result) {
      alert("Server error. Are you online?");
      return;
  }
 console.log("result",result)

 if (result.status === 200) {
  toast.success(`Your order is ${result.message} placed`, {
    position: "bottom-left",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
  });


} else{
  toast.error(result.message, {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
  });
  return;
}

  // Getting the order details back
  const { amount, order_id, currency,parentOrderId } = result.data;
  console.log("order id ==================", parentOrderId,amount)

  const options = {
      key: "rzp_test_ci9tXZyyHXxDTT", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: user.name,
      description: "Test Transaction",
      image: { razorPayLogo},
      order_id: parentOrderId,
      handler: async function (response) {
          const data = {
            orderCreationId: parentOrderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
          };

          // const result = await axios.post(`${API}orders/on_success_payment`, data);
          let result1 = await fetch(`${API}orders/on_success_payment`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json"
          },
          });
          result1 = await result1.json();

          console.log(result1,"successfil order ............................");
          if (result1.status === 200) {
            toast.success(result1.message, {
              position: "bottom-left",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              closeButton: false,
            });
          
          
          } else{
            toast.error(result1.message, {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              closeButton: false,
            });
            return;
          }

      },
      prefill: {
          name: user.name,
          email:user.emailid,
          contact: user.phoneNumber,
      },
      notes: {
          address: "no address",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
    }
 
  //console.log(cartTotal);


  return (
    <>
      <div  className="cartContainer">
      <ToastContainer
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div id="rzp-button1"></div>
   
      
        <div className="cartHeading">
          My Cart{" "}
          <span className="itemCOunt">
          
            ({cartdata.length} Item{cartdata.length > 1 ? "s" : ""})
          </span>
        </div>
        <div className="bottomBorder"></div>

        <div className="cartProducts">
          <div className="cartLeft">
            {/* <CartItem /> */}
            {state.cart[0] &&  state.cart.map((elem) => {
              return <CartItem key ={elem._id} productData={elem} />;
            })}
          </div>

          <div className="cartRight">
            <div className="orderSummary">
            {user&& <>
            <button className="quote-btn" onClick={getQuoteHandler}>Request a Quote</button>
              <div className="quoteDescription">
                Get a quote for the items in cart with <br /> their prices at
                your email address
              </div>
              </>}
              <div className="summaryHeading">
                Price Details ({cartdata.length} Product
                {cartdata.length > 1 ? "s" : ""})
              </div>
              <div className="mrp">
                <span className="orderText">Total MRP</span>
                <span className="orderAmount">₹ {cartTotal}</span>
              </div>
              <div className="discount">
                <span className="orderText">Discount on MRP</span>
                <span className="orderAmount">₹ {cartTotal - finalAmount}</span>
              </div>
              <div className="coupon">
                <span className="orderText">Coupon Discount</span>
                <span
                  className="orderAmount"
                  onClick={() => setDisplayCoupon(!displayCoupon)}
                >
                  Apply Coupon
                </span>
              </div>
              <input
                type="text"
                className={displayCoupon ? "applyCoupon" : "hideApplyCoupon"}
                placeholder="Apply Coupon"
              />
              <div className="delivery">
                <span className="orderText">Delivery Charge</span>
                <span className="orderAmount">FREE</span>
              </div>
              <div className="deliveryBorder"></div>
              <div className="total">
                <span className="orderText">Total Amount</span>
                <span className="orderAmount">
                  {/* ₹ {cartTotal > 10 ? cartTotal - 10 : 0} */}
                  {finalAmount}
                </span>
              </div>
              {user?<button onClick={OrderNow} className="placeOrder-btn">
                PLACE ORDER
              </button>:
              <button className="placeOrder-btn" onClick={()=>{navigate('/signin')}}>
              Login To PLACE ORDER
            </button>}
              <div className="powerBy">
                <span className="powered">Powered</span>
                <img
                  src={razorPayLogo}
                  alt="RazorPay Logo"
                  className="razorPay"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContainer;
