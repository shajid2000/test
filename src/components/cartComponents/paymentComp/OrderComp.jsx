import React from "react";
import covidpic from "../../../images/COVID.png";

const OrderComp = ({ productData, qty, price, img, desc, name, total }) => {
  return (
    <>
      <div className="item">
        <img src={img} alt="" />
        <div className="product-detail">
          <p className="name">{name}</p>
          <p className="qty">
            Quantity : <span>{qty}</span>
          </p>
          <p className="price">
            Price :<span>{price}</span>
          </p>
          <p className="disc">
            Total :<span>{total}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderComp;
