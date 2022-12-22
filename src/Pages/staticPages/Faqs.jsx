import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./faqs.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  signUpAndAccount,
  orderAndPayment,
  shippingAndDelivery,
  returnAndExchange,
} from "./faqsApi";
const Faqs = () => {
  const topView = () => {
    window.scrollTo({ top: 0 });
  };
  topView();

  const [quesAns, setQuesAns] = useState(signUpAndAccount);
  const [active, setActive] = useState("signUp");
  const setFaq = (data, activeColor) => {
    setQuesAns(data);
    setActive(activeColor);
  };
  const [click, setClick] = useState(false);
  //console.log("Faqs2", quesAns);
  return (
    <div className="faq">
      <h1 className="h1">FAQ</h1>
      <div className="faq-container">
        <section className="que-types">
          <ul className="faq-ul">
            <h1 className="heading">Type of Issues</h1>

            <li
              onClick={() => {
                setFaq(signUpAndAccount, "signUp");
              }}
            >
              <Link className={active === "signUp" ? "myactive" : ""}>
                Sign Up And Account
              </Link>
            </li>
            <li
              onClick={() => {
                setFaq(orderAndPayment, "orders");
              }}
            >
              <Link className={active === "orders" ? "myactive" : ""}>
                Orders And Payments
              </Link>
            </li>
            <li
              onClick={() => {
                setFaq(shippingAndDelivery, "shipping");
              }}
            >
              <Link className={active === "shipping" ? "myactive" : ""}>
                Shipping And Delivery
              </Link>
            </li>
            <li
              onClick={() => {
                setFaq(returnAndExchange, "returns");
              }}
            >
              <Link className={active === "returns" ? "myactive" : ""}>
                Returns And Exchange
              </Link>
            </li>
          </ul>
        </section>
        <section className="que-ans">
          {quesAns.map((item, index) => {
            return <EachAccordion que={item.que} ans={item.ans} />;
          })}
        </section>
      </div>
    </div>
  );
};

export default Faqs;
const EachAccordion = ({ que, ans, index }) => {
  const myAns = ans.split("|");
  // console.log(myAns);
  const [click, setClick] = useState(false);
  useEffect(() => {
    setClick(false);
  }, [que]);
  return (
    <>
      <div className="each-que-ans">
        <p>{que}</p>
        <span
          onClick={() => {
            setClick(!click);
          }}
        >
          {!click ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </span>
      </div>
      {click && (
        <div className="ans">
          {myAns.map((item, i) => {
            return <p>{item}</p>;
          })}
        </div>
      )}
    </>
  );
};
