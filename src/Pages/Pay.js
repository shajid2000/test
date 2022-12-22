import React from 'react'
import axios from "axios"
import logo from "../logo.svg"
const Pay = () => {
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

async function displayRazorpay() {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const result = await axios.post("http://localhost:8000/orders/create_order",{
        "cart_item":[{
          "poster_obj_id":"625463b79969ca51102bf591",
          "material_obj_id":"624e97089969ca51102bf585",
          "quantity":4,
          "TotalHeight":"12"
  
      }],
      "delivery_address":"",
      "user_type":1,
      "TotalHeight":"12"
      },
      {
       headers:{ "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNlNzI5YmRiOWIyOTY5YmNmODVlN2EiLCJpYXQiOjE2NjUyMjY3MzYsImV4cCI6MTY2ODgyNjczNn0.iecckcm5ZzHc8otuB713y0XVA1TfTKseTMnpKflNQlU",
       }
      });

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data.data;

    const options = {
        key: "rzp_test_ci9tXZyyHXxDTT", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Soumya Corp.",
        description: "Test Transaction",
        image: { logo },
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post("http://localhost:8000/orders/receiveSummary", data);

            alert(result.data.msg);
        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}



  return (
    <div>
      <p>Buy React now!</p>
                <button className="App-link" onClick={displayRazorpay}>
                    Pay ₹500
                </button>
    </div>
  )
}

export default Pay
