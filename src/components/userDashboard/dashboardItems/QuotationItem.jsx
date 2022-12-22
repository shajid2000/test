import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./quotationitem.css";
import { useEffect } from "react";
import razorPayLogo from "./../../../images/razorparLogo.png";
import axios from "axios";
import PdfMaker from "../pdf/PdfMaker";
import { API } from "../../../backend";
import { getQuotationHistory } from "../../../redux/actions/cartAction";
const QuotationItem = () => {
  const dispatch = useDispatch();
  const quotation = useSelector((state) => state.cart.quotation);
  const user = useSelector((state) => state.user.userDetail);
  //console.log(quotation,"from components");
  useEffect(() => {
    dispatch(getQuotationHistory());
  }, []);
  //==================

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
  async function placeOrderHandler(quoteCart) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    //prepare cart
    // console.log(quoteCart, "quoteCart");
    const cart = quoteCart.map((ele) => {
      return {
        poster_obj_id: ele.poster_details,
        material_obj_id: ele.materialDimension,
        quantity: 1,
      };
    });
    // console.log(cart);
    const token = JSON.parse(localStorage.getItem("myuser")).token;
    // console.log(token);
    // creating a new order
    const result = await axios.post(
      `${API}orders/create_order`,
      {
        cart_item: [...cart],
        delivery_address: "",
        user_type: 1,
      },
      {
        headers: { "x-access-token": token },
      }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, order_id, currency } = result.data.data;
    // console.log("order id ==================", order_id);
    const options = {
      key: "rzp_test_ci9tXZyyHXxDTT", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: user.name,
      description: "Test Transaction",
      image: { razorPayLogo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await axios.post(
          `${API}orders/on_success_payment`,
          data
        );
      },
      prefill: {
        name: user.name,
        email: user.emailid,
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

  //==========================invoices=====================
  const [sendData, setSendData] = useState(quotation[0]);
  const [toggle, setToggle] = useState(false);

  const showInvoices = (i) => {
    setSendData(quotation[i]);

    console.log(i);
    setToggle(true);
  };
  console.log("sendData", sendData);
  //==========================invoices=====================

  return quotation ? (
    <>
      <div className="quoteItem">
        <div className="quotation-box">
          <div className="quatation-list">
            <tr className="quotes-items quote-head">
              <td className="td">Quotation Details</td>
              <td className="td">Date</td>
              <th className="quotation-btn-box"></th>
            </tr>
            {quotation &&
              (quotation.length == 0
                ? "No Quotation History"
                : quotation.map((item, index) => {
                    return (
                      <tr key={index} className="quotes-items ">
                        <td className="td">{item._id.substr(0, 15)}...</td>
                        <td className="date-p td">20/02/2021</td>
                        {/* <div className="line"></div> */}
                        <th className="quotation-btn-box">
                          <button
                            className="saved-btn"
                            onClick={() => {
                              showInvoices(index);
                            }}
                          >View Details
                          </button>
                          <button
                            className="saved-btn"
                            onClick={() => {
                              placeOrderHandler(item.cart);
                            }}
                          >
                            Buy Now
                          </button>
                          {toggle && (
                            <PdfMaker
                              sendData={sendData}
                              setToggle={setToggle}
                            />
                          )}
                        </th>
                      </tr>
                    );
                  }))}
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default QuotationItem;
