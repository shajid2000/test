import React from "react";
import "./Relatedcard.css";
const RelatedCard = (props) => {
  return (
    <div className="crd">
      <img src={props.photo} />
      <div className="itemname">
        <p>{props.name}</p>
      </div>
      <div className="propertiescrd">
        <p>From ₹{props.price}</p>
        <p>4⭐</p>
      </div>
    </div>
  );
};
export default RelatedCard;
