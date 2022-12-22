import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import covidpic from "../../images/COVID.png";
import OrderComp from "./paymentComp/OrderComp";
import "./payment.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewAddress from "./paymentComp/NewAddress";
import SavedAddress from "./paymentComp/SavedAddress.jsx";
import { faScaleUnbalancedFlip } from "@fortawesome/free-solid-svg-icons";
import razorPayLogo from "./../../images/razorparLogo.png";
import { API } from '../../backend';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DisabledByDefault } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { cartEmpty } from "../../redux/actions/cartAction";
import Loading from "../commonComponents/LoadingScreen/Loading";

const Payment = () => {
 
  const [savedAdd, setSavedAdd] = useState(true);
  const [newAddClick, setNewAddClick] = useState(false);
  const [selectedAddToggle, setSelectedAddToggle] = useState(false);
  const [orderClick, setOrderClick] = useState(false);
  const [paymentClick, setPaymentClick] = useState(false);
  const [deliveryAdd, setDeliveryAdd] = useState(null);
  const state = useSelector((state) => state.cart);
  let userDetail = useSelector((state) => state.user.userDetail);
  const [confirmDelivNo, setConfirmDelivNo] = useState(Number)
  const dispatch = useDispatch()
  const [a,seta] = useState(false);

  const handleChange = () => {};
let defaultIndex;
userDetail && userDetail.address.forEach((e,i)=>{

  if(e.default){
   defaultIndex=i
  }
})
console.log(defaultIndex,deliveryAdd)
  const topView = () => {
    window.scrollTo({ top: 0 });
  };
  topView();
 
  // console.log("deliveryAdd", deliveryAdd);
  console.log("userDetail", userDetail);
  const navigate = useNavigate()
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++
useEffect(() => {
  if(!localStorage.getItem('myuser') ){
    navigate("/")
  }


}, )


let totaldis= false
let withQtydis=0;
let finalAmount= 0;

let cartTotal = 0;
let cartdata=[];
if(state.cart.length!==0){
cartdata = state.cart;
// console.log(cartdata);

cartdata.forEach((elem) => {
  cartTotal += Number(elem.total);
  if(elem.quantity >= 5){
    withQtydis = withQtydis + (Number(elem.total)- (Number(elem.total)/100)*10)  
    finalAmount = Math.ceil(withQtydis)
  }
  else{
    withQtydis= Math.floor(withQtydis + Number(elem.total))
    finalAmount = withQtydis
  }

});
if(withQtydis >= 500){
  totaldis = true
finalAmount = Math.ceil(withQtydis - (withQtydis/100)*10)

} 
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
  const cart =[]
   state.cart.forEach((ele)=>{
  
    let data ={
      "material_obj_id":ele.materialDimension._id,
      "quantity": ele.quantity
    }
    if(ele.poster_details){
 data.poster_obj_id = ele.poster_details._id
    }
    if(ele.pageDetail){
   data.pageId = ele.pageDetail._id
    }
      cart.push(data);
  })
  console.log(cart,"DITTTTTTTTTTTTT")
  const token =JSON.parse(localStorage.getItem('myuser')).token


  let result = await fetch(`${API}orders/create_order`, {
    method: "POST",
    body: JSON.stringify({
    
          "cart_item":[...cart],
    
          "delivery_address":userDetail.address[deliveryAdd] || userDetail.address[defaultIndex] || {},
    
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
  toast.success(`Your order is ${result.message} created`, {
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

// return

  // Getting the order details back
  const { amount, order_id, currency,parentOrderId } = result.data;
  console.log("order id ==================", parentOrderId,amount)

  const options = {
      key: "rzp_test_ci9tXZyyHXxDTT", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: userDetail.name,
      description: "Test Transaction",
      image: { razorPayLogo},
      order_id: parentOrderId,
      handler: async function (response) {
          const data = {
            orderCreationId: parentOrderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              confirmDelivNo: confirmDelivNo,
          };

        
          seta(true)
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
      
            dispatch(cartEmpty())
            seta(false)
            // toast.success(result1.message, {
            //   position: "bottom-left",
            //   autoClose: 1000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   closeButton: false,
            // });
            navigate("/thankyou")
          
           
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
          name: userDetail.name,
          email:userDetail.emailid,
          contact: userDetail.phoneNumber,
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

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return a?<Loading/> : (
    <div className="payment-container">
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
      <h1 className="pay-heading">Payment</h1>
      <div className="pay-line"></div>
      <div className="payment-main">
        <div className="payement-left">
          <div className="address-dropdown dropdownlist">
            <div className="list">
              <p>
                <span className="num">1</span> Delivery Address
              </p>
              <span
                onClick={() => {
                  setSavedAdd(!savedAdd);
                  setNewAddClick(false);
                  setOrderClick(false);
                  setPaymentClick(false);
                  setSelectedAddToggle(!selectedAddToggle)
                }}
              >
                {!savedAdd ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </span>
            </div>
            {savedAdd && (
              <SavedAddress
                setSavedAdd={setSavedAdd}
                setDeliveryAdd={setDeliveryAdd}
                setOrderClick={setOrderClick}
                setSelectedAddToggle={setSelectedAddToggle}
              />
            )}
            {
            selectedAddToggle && !savedAdd && (
              <div className="address-cont">
                {(userDetail && deliveryAdd != null) ? (
                  <div className="delivery-add">
                    <p>
                    {userDetail.address[deliveryAdd] && userDetail.address[deliveryAdd].name}{" , "}
                    {userDetail.address[deliveryAdd] && userDetail.address[deliveryAdd].phone}{" , "}
                    </p>
                    <p>
                     {/* {"Ph-"}{userDetail.phonenumber}{" , "} */}
                      {userDetail.address[deliveryAdd] && userDetail.address[deliveryAdd].Area_Street}
                     
                    </p>
                    <p>
                      {userDetail.address[deliveryAdd] && userDetail.address[deliveryAdd].city}{" , "}
                      {userDetail.address[deliveryAdd] && userDetail.address[deliveryAdd].pincode}{" "}
                      {userDetail.address[deliveryAdd] && userDetail.address[deliveryAdd].lat}{" "}
                      {userDetail.address[deliveryAdd] && userDetail.address[deliveryAdd].lon}
                    </p>
                    <p>
                      
                      {userDetail.address[deliveryAdd] && userDetail.address[deliveryAdd].state}{" , "}
                      {userDetail.address[deliveryAdd] && userDetail.address[deliveryAdd].country}
                    </p>
                  </div>
                ) : userDetail.address.length > 0 && userDetail.address[defaultIndex] && <div className="delivery-add">
                <p>
                {userDetail.address[defaultIndex] && userDetail.address[defaultIndex].name}{" , "}
                {userDetail.address[defaultIndex] && userDetail.address[defaultIndex].phone}{" , "}
                </p>
                <p>
                 {/* {"Ph-"}{userDetail.phonenumber}{" , "} */}
                  {userDetail.address[defaultIndex] && userDetail.address[defaultIndex].Area_Street}
                 
                </p>
                <p>
                  {userDetail.address[defaultIndex] && userDetail.address[defaultIndex].city}{" , "}
                  {userDetail.address[defaultIndex] && userDetail.address[defaultIndex].pincode}{" "}
                  {userDetail.address[defaultIndex] && userDetail.address[defaultIndex].lat}{" "}
                  {userDetail.address[defaultIndex] && userDetail.address[defaultIndex].lon}
                </p>
                <p>
                  
                  {userDetail.address[defaultIndex] && userDetail.address[defaultIndex].state}{" , "}
                  {userDetail.address[defaultIndex] && userDetail.address[defaultIndex].country}
                </p>
              </div>
                }
              </div>
            )}
          </div>
          <div className="add-address-dropdown dropdownlist">
            <div className="list">
              <p>
                <span className="num plus-sign">+</span> Add Address
              </p>
              <span
                onClick={() => {
                  setNewAddClick(!newAddClick);
                  setOrderClick(false);
                  setSavedAdd(false);
                  setPaymentClick(false);
                }}
              >
                {!newAddClick ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </span>
            </div>
            {newAddClick && <NewAddress   setSavedAdd={setSavedAdd} setDeliveryAdd={setDeliveryAdd}
                setOrderClick={setOrderClick}   setSelectedAddToggle={setSelectedAddToggle} setConfirmDelivNo={setConfirmDelivNo} />}
          </div>
          <div className="order-dropdown dropdownlist">
            <div className="list">
              <p>
                <span className="num">2</span> Order Summary
              </p>
              <span
                onClick={() => {
                  setOrderClick(!orderClick);
                  setPaymentClick(false);
                  setNewAddClick(false);
                  setSavedAdd(false);
                }}
              >
                {!orderClick ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </span>
            </div>
            {orderClick && (
              <div className="order-summary">
                {state.cart[0] &&
                  state.cart.map((elem) => {
                    return (
                      <OrderComp
                        key={elem._id}
                        productData={elem}
                        qty={elem.quantity}
                        name={elem.poster_details?elem.poster_details.name:elem.pageDetail?elem.pageDetail.name:"Customized Product"}
                        total={elem.total}
                        price={elem.materialDimension.price}
                        desc={elem.poster_details?elem.poster_details.description:elem.pageDetail.materialDimension.description}
                        img={elem.poster_details?elem.poster_details.imgUrl:elem.pageDetail.imgUrl}
                      />
                    );
                  })}
              </div>
            )}
          </div>

          {/* <div className="payment-dropdown dropdownlist">
            <div className="list">
              <p>
                <span className="num">3</span> Proceed to Payment
              </p>
              <span
                onClick={() => {
                  setPaymentClick(!paymentClick);
                  setOrderClick(false);
                  setNewAddClick(false);
                  setSavedAdd(false);
                }}
              >
                {!paymentClick ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </span>
            </div>
            {paymentClick && (
              <div className="payment-btn-box">
                <button className="payment-btn">Proceed to Payment</button>
              </div>
            )}
          </div> */}
           <div className="payment-btn-box">
                <button onClick={placeOrderHandler} 
            //  disabled={deliveryAdd===null || state.cart <=0}
                className="payment-btn" >Proceed to Payment</button>
              </div>
        </div>
        <div className="payment-detail payement-right">
          <div className="product">
            <img src={covidpic} alt="#img" />
            {/* <p>{state.cart.length} Item{state.cart.length>1?"s":""} (Estimated Delivery 6 days)</p> */}
          </div>
          <div className="price-detail">
            <h1> Price Details ({state.cart.length} Product{state.cart.length>1?"s":""})</h1>
            <div>
              <p>Total MRP</p>
              <p> &#8377; {cartTotal} </p>
            </div>
            <div>
              <p>Discount on MRP</p>
              <p id="mrp"> &#8377; {cartTotal - finalAmount}</p>
            </div>
            <div>
              <p>Coupon Discount</p>
              <p id="coupon"> Apply Coupon </p>
            </div>
            <div>
              <p>Delivery Charge MRP</p>
              <p>FREE </p>
            </div>
            <div className="pay-line"></div>
            <div className="total-ammount">
              <p>Total Amount</p>
              <p> &#8377; {finalAmount} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
