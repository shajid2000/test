import React from "react";
import "./EHSPrints.css";
import tag1 from "../../../images/tag1.png";
import tag2 from "../../../images/tag2.png";
import tag3 from "../../../images/tag3.png";

import Counter from "../Counter";

const EHSPrints = () => {
  return (
    <>
      <section className="Ehs-prints" >
        <h1 className="promiseTitle">The EHS Prints Promise</h1>
        <div className="promiseContainer">
          <div className="block">
            <img src={tag1} alt="" />
            <span className="bl-heading">Effusive Designs</span>
            <span className="bl-text">
              We provide you a huge variety of highly impactful Visual
              communications designed by skilled artists all around the Globe!
            </span>
          </div>
          <div className="block">
            <img src={tag2} alt="" />
            <span className="bl-heading">High Quality Prints</span>
            <span className="bl-text">
              Prints from all our category are printed digitally on best quality
              durable materials providing effective communication!
            </span>
          </div>
          <div className="block">
            <img src={tag3} alt="" />
            <span className="bl-heading">Door Step Service</span>
            <span className="bl-text">
              We provide all your orders at your doorstep in least possible time
              in safest packaging with help of best logistics firms.
            </span>
          </div>
        </div>
      </section>
      <section className="logistics">
        <div className="visitorContainer ">
          <div className="visitor  ">
            <Counter end={4500} />{" "}
            <span className="visitorHead ">VISITORS</span>
          </div>
          <span className="dot"></span>
          <div className="visitor ">
            <Counter end={1100} />{" "}
            <span className="visitorHead">CUSTOMERS</span>
          </div>
          <span className="dot"></span>
          <div className="visitor ">
            <Counter end={250} /> <span className="visitorHead">DESIGNERS</span>
          </div>
        </div>
      </section>

      <div className="bestSellerHeading">Our Bestsellers</div>
    </>
  );
};

export default EHSPrints;
