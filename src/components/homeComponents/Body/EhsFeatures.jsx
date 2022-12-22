import React from "react";
import { Link } from "react-router-dom";
import { API } from "./../../../backend";

import "./ehsfeatures.css";

// images

import creditCard from "././../../../images/credit-card.png";
import customerCare from "./../../../images/customer-care.png";
import feedback from "./../../../images/comment.png";

const EhsFeatures = () => {
  const getData = () => {
    fetch(`${API}posters/getPosterById`, {
      method: "GET",
      body: { params: { poster_obj_id: 18 } },
    })
      .then((res) => res.json)
      .then((data) => {
        //console.log(data);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  return (
    <>
      <div className="ehsFeaturesContainer">
        <div className="explore-btn">
          <Link to="/poster">
            <button className="explore explore-btn">Explore</button>
          </Link>
        </div>

        <div className="ehsFeatures">
          <div className="feature">
            <div className="featureImg">
              <img src={creditCard} alt="cretid-card" />
            </div>
            <div className="featureDesc">
              <span className="featureTitle">Payment</span>
              <span className="featureText">Secure System</span>
            </div>
          </div>

          <div className="feature">
            <div className="featureImg">
              <img src={customerCare} alt="cretid-card" />
            </div>
            <div className="featureDesc">
              <span className="featureTitle">24/7 Support</span>
              <span className="featureText">Mon to Fri</span>
            </div>
          </div>

          <div className="feature">
            <div className="featureImg">
              <img src={feedback} alt="cretid-card" />
            </div>
            <div className="featureDesc">
              <span className="featureTitle">100%</span>
              <span className="featureText">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EhsFeatures;
